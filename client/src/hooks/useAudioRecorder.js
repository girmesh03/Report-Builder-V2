/**
 * @module hooks/useAudioRecorder
 */

import { useCallback, useEffect, useRef, useState } from "react";

import {
  AUDIO_COUNTDOWN_SECONDS,
  AUDIO_MAX_DURATION_SEC,
  AUDIO_WAVEFORM_BARS,
  AUDIO_WAVEFORM_BAR_WIDTH_RATIO,
  AUDIO_WAVEFORM_CANVAS_HEIGHT,
  AUDIO_WAVEFORM_COLOR,
  AUDIO_WAVEFORM_FALLBACK_WIDTH,
  AUDIO_WAVEFORM_FFT_SIZE,
  RECORDER_MIME_PRIORITY,
} from "../utils/constants.js";

/** @type {string} No clips and nothing active. */
const RECORDER_STATE_IDLE = "idle";
/** @type {string} Pre-roll 3-2-1 countdown before capture starts. */
const RECORDER_STATE_COUNTDOWN = "countdown";
/** @type {string} Live capture with waveform. */
const RECORDER_STATE_RECORDING = "recording";
/** @type {string} Capture suspended. */
const RECORDER_STATE_PAUSED = "paused";
/** @type {string} At least one clip recorded, playback/review. */
const RECORDER_STATE_REVIEW = "review";

/**
 * MediaRecorder state/actions hook (`## Audio Recording STT` §5.1,
 * REQ-139..141): a five-state machine — idle/countdown/recording/paused/
 * review. The MIME type is the first supported entry of
 * `RECORDER_MIME_PRIORITY` (REQ-141). Blobs live in component state only,
 * never Redux/localStorage (REQ-140); object URLs are revoked when a clip
 * is deleted or the hook resets/unmounts. The waveform renders live FFT
 * bars (AnalyserNode) into the canvas attached via `waveformRef`; capture
 * auto-stops at `AUDIO_MAX_DURATION_SEC` (15 min). Mic-permission failures
 * surface through `error` for the consumer to toast.
 *
 * @returns {Object} The recorder API.
 * @returns {string} .recordingState - One of idle/countdown/recording/paused/review.
 * @returns {Array<{ id: string, blob: Blob, url: string, duration: number, mimeType: string, createdAt: number }>} .clips - Recorded clips (component state only).
 * @returns {number} .countdown - Remaining countdown seconds during the countdown state.
 * @returns {number} .liveDuration - Elapsed recording seconds (live ticker).
 * @returns {string} .error - Mic-permission or MediaRecorder error message ('' when none).
 * @returns {import("react").RefCallback<HTMLCanvasElement>} .waveformRef - Attach callback for the waveform canvas.
 * @returns {() => Promise<void>} .startRecording - Begin countdown then capture (new clip).
 * @returns {() => void} .pauseRecording - Pause capture.
 * @returns {() => void} .resumeRecording - Resume capture.
 * @returns {() => void} .stopRecording - Finalize the current clip into `clips`.
 * @returns {(id: string) => void} .deleteClip - Remove a clip; back to idle when none remain.
 * @returns {(clips: Array<{ id: string, blob: Blob, duration: number, mimeType: string, createdAt?: number }>) => void} .seedClips - Restore persisted clips (REQ-140 exception): hydrates object URLs and enters review state.
 * @returns {() => void} .reset - Discard everything (cancel mid-recording, close cleanup).
 */
export function useAudioRecorder() {
  const [recordingState, setRecordingState] = useState(RECORDER_STATE_IDLE);
  const [clips, setClips] = useState([]);
  const [countdown, setCountdown] = useState(AUDIO_COUNTDOWN_SECONDS);
  const [liveDuration, setLiveDuration] = useState(0);
  const [error, setError] = useState("");

  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationFrameRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const countdownTimerRef = useRef(null);
  const tickerTimerRef = useRef(null);
  const elapsedRef = useRef({ accumulated: 0, startedAt: 0, paused: true });
  const discardRef = useRef(false);
  // Monotonic recording tag (F-4-11): `startRecording` increments it and
  // `beginRecording` snapshots it; `onstop` of an older recorder whose tag
  // no longer matches is a stale stop (e.g. a cancel-discard racing a brand
  // new recording) and must not run `cleanupMedia`/discard logic that would
  // kill the new capture's stream.
  const recordingSessionRef = useRef(0);

  const mimeTypeRef = useRef(null);
  if (mimeTypeRef.current === null) {
    mimeTypeRef.current = window.MediaRecorder
      ? RECORDER_MIME_PRIORITY.find((type) => type === "" || MediaRecorder.isTypeSupported(type)) ?? ""
      : "";
  }

  const stopWaveform = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    const data = dataArrayRef.current;
    if (!canvas || !analyser || !data) return;
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    const draw = () => {
      const context = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;
      analyser.getByteFrequencyData(data);
      context.clearRect(0, 0, width, height);
      const barWidth = width / AUDIO_WAVEFORM_BARS;
      for (let index = 0; index < AUDIO_WAVEFORM_BARS; index += 1) {
        const value = data[Math.floor((index * data.length) / AUDIO_WAVEFORM_BARS)] / 255;
        const barHeight = value * height;
        context.fillStyle = AUDIO_WAVEFORM_COLOR;
        context.fillRect(
          index * barWidth,
          height - barHeight,
          barWidth * AUDIO_WAVEFORM_BAR_WIDTH_RATIO,
          barHeight,
        );
      }
      animationFrameRef.current = requestAnimationFrame(draw);
    };
    draw();
  }, []);

  const resizeWaveform = useCallback((canvas) => {
    const dpr = window.devicePixelRatio ?? 1;
    const width = Math.round((canvas.clientWidth || AUDIO_WAVEFORM_FALLBACK_WIDTH) * dpr);
    const height = Math.round((canvas.clientHeight || AUDIO_WAVEFORM_CANVAS_HEIGHT) * dpr);
    if (width > 0 && (canvas.width !== width || canvas.height !== height)) {
      canvas.width = width;
      canvas.height = height;
    }
  }, []);

  const startWaveform = useCallback(
    (stream) => {
      const AudioContextCtor = window.AudioContext ?? window.webkitAudioContext;
      if (!AudioContextCtor) return;
      const audioContext = new AudioContextCtor();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = AUDIO_WAVEFORM_FFT_SIZE;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      drawWaveform();
    },
    [drawWaveform],
  );

  const cleanupMedia = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    audioContextRef.current?.close().catch(() => {});
    audioContextRef.current = null;
    analyserRef.current = null;
    dataArrayRef.current = null;
    stopWaveform();
  }, [stopWaveform]);

  const clearTimers = useCallback(() => {
    if (countdownTimerRef.current !== null) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    if (tickerTimerRef.current !== null) {
      clearInterval(tickerTimerRef.current);
      tickerTimerRef.current = null;
    }
  }, []);

  /** @returns {number} Total elapsed capture time in ms, paused state included. */
  const currentElapsed = useCallback(() => {
    const { accumulated, startedAt, paused } = elapsedRef.current;
    return paused ? accumulated : accumulated + (Date.now() - startedAt);
  }, []);

  const stopRecording = useCallback(() => {
    clearTimers();
    const recorder = mediaRecorderRef.current;
    if (recorder && (recorder.state === "recording" || recorder.state === "paused")) {
      discardRef.current = false;
      recorder.stop();
    }
  }, [clearTimers]);

  const beginRecording = useCallback(
    (stream) => {
      const sessionId = recordingSessionRef.current;
      const mimeType = mimeTypeRef.current;
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      chunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        if (sessionId !== recordingSessionRef.current) {
          return;
        }
        if (discardRef.current) {
          discardRef.current = false;
          cleanupMedia();
          setRecordingState(RECORDER_STATE_IDLE);
          setLiveDuration(0);
          return;
        }
        const totalMs = currentElapsed();
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || mimeType });
        const clip = {
          id: crypto.randomUUID(),
          blob,
          url: URL.createObjectURL(blob),
          duration: Number((totalMs / 1000).toFixed(1)),
          mimeType: recorder.mimeType || mimeType,
          createdAt: Date.now(),
        };
        setClips((previous) => [...previous, clip]);
        setRecordingState(RECORDER_STATE_REVIEW);
        cleanupMedia();
        setLiveDuration(0);
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
    },
    [cleanupMedia, currentElapsed],
  );

  const startRecording = useCallback(async () => {
    recordingSessionRef.current += 1;
    discardRef.current = false;
    setError("");
    setCountdown(AUDIO_COUNTDOWN_SECONDS);
    setRecordingState(RECORDER_STATE_COUNTDOWN);
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      startWaveform(stream);
    } catch {
      setRecordingState(RECORDER_STATE_IDLE);
      setError("Microphone access denied. Allow microphone access and try again.");
      return;
    }
    let remaining = AUDIO_COUNTDOWN_SECONDS;
    countdownTimerRef.current = setInterval(() => {
      remaining -= 1;
      if (remaining > 0) {
        setCountdown(remaining);
        return;
      }
      clearTimers();
      setRecordingState(RECORDER_STATE_RECORDING);
      setLiveDuration(0);
      elapsedRef.current = { accumulated: 0, startedAt: Date.now(), paused: false };
      beginRecording(streamRef.current);
      tickerTimerRef.current = setInterval(() => {
        setLiveDuration(Number((currentElapsed() / 1000).toFixed(1)));
        if (currentElapsed() >= AUDIO_MAX_DURATION_SEC * 1000) {
          stopRecording();
        }
      }, 1000);
    }, 1000);
  }, [beginRecording, clearTimers, currentElapsed, startWaveform, stopRecording]);

  const pauseRecording = useCallback(() => {
    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state !== "recording") return;
    recorder.pause();
    elapsedRef.current = {
      accumulated: currentElapsed(),
      startedAt: 0,
      paused: true,
    };
    setRecordingState(RECORDER_STATE_PAUSED);
    stopWaveform();
  }, [currentElapsed, stopWaveform]);

  const resumeRecording = useCallback(() => {
    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state !== "paused") return;
    recorder.resume();
    elapsedRef.current = { accumulated: elapsedRef.current.accumulated, startedAt: Date.now(), paused: false };
    setRecordingState(RECORDER_STATE_RECORDING);
    drawWaveform();
  }, [drawWaveform]);

  const deleteClip = useCallback((id) => {
    const remaining = clips.filter((clip) => clip.id !== id).length;
    setClips((previous) => previous.filter((clip) => clip.id !== id));
    setRecordingState((previousState) =>
      previousState === RECORDER_STATE_REVIEW && remaining === 0 ? RECORDER_STATE_IDLE : previousState,
    );
  }, [clips]);

  const seedClips = useCallback((seededClips) => {
    const hydrated = seededClips.map((clip) => ({
      id: clip.id,
      blob: clip.blob,
      url: URL.createObjectURL(clip.blob),
      duration: clip.duration,
      mimeType: clip.mimeType,
      createdAt: clip.createdAt ?? Date.now(),
    }));
    setClips(hydrated);
    setRecordingState(hydrated.length > 0 ? RECORDER_STATE_REVIEW : RECORDER_STATE_IDLE);
    setLiveDuration(0);
    setError("");
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    discardRef.current = true;
    resizeObserverRef.current?.disconnect();
    resizeObserverRef.current = null;
    const recorder = mediaRecorderRef.current;
    if (recorder && (recorder.state === "recording" || recorder.state === "paused")) {
      recorder.stop();
    }
    cleanupMedia();
    mediaRecorderRef.current = null;
    setClips([]);
    setRecordingState(RECORDER_STATE_IDLE);
    setLiveDuration(0);
    setCountdown(AUDIO_COUNTDOWN_SECONDS);
    setError("");
  }, [cleanupMedia, clearTimers]);

  const attachWaveform = useCallback(
    (canvas) => {
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      if (canvas) {
        resizeWaveform(canvas);
        canvasRef.current = canvas;
        const observer = new ResizeObserver(() => {
          resizeWaveform(canvas);
        });
        observer.observe(canvas);
        resizeObserverRef.current = observer;
        if (analyserRef.current && dataArrayRef.current) {
          drawWaveform();
        }
      } else {
        canvasRef.current = null;
      }
    },
    [drawWaveform, resizeWaveform],
  );

  useEffect(
    () => () => {
      clearTimers();
      discardRef.current = true;
      if (mediaRecorderRef.current?.state === "recording" || mediaRecorderRef.current?.state === "paused") {
        mediaRecorderRef.current.stop();
      }
      cleanupMedia();
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
    },
    [cleanupMedia, clearTimers],
  );

  const previousUrlsRef = useRef([]);
  useEffect(() => {
    const staleUrls = previousUrlsRef.current.filter((url) => !clips.some((clip) => clip.url === url));
    staleUrls.forEach((url) => URL.revokeObjectURL(url));
    previousUrlsRef.current = clips.map((clip) => clip.url);
  }, [clips]);

  return {
    recordingState,
    clips,
    countdown,
    liveDuration,
    error,
    waveformRef: attachWaveform,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    deleteClip,
    seedClips,
    reset,
  };
}
