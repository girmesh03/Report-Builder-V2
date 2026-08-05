/**
 * @module components/reusable/AudioClipRow
 */

import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Pause from "@mui/icons-material/Pause";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Delete from "@mui/icons-material/Delete";

/**
 * Formats seconds as `MM:SS`.
 *
 * @param {number} seconds - Total seconds.
 * @returns {string} The `MM:SS` label.
 */
function formatDuration(seconds) {
  const total = Math.max(0, Math.floor(seconds));
  const minutes = String(Math.floor(total / 60)).padStart(2, "0");
  const rest = String(total % 60).padStart(2, "0");
  return `${minutes}:${rest}`;
}

/**
 * Playable audio clip row (`## Audio Recording STT` §5.1): play/pause toggle,
 * draggable seek Slider, `[MM:SS / MM:SS]` label, and an optional delete
 * button. Playback runs on an HTMLAudioElement fed by `clip.url` (component
 * state only, REQ-140) — shared between the create-dialog recorder review
 * list and the report-details audio list (`## UI/UX Spec` §11). The delete
 * button is only rendered when `onDelete` is provided; the report-details
 * list omits it.
 *
 * @param {Object} props - Component props.
 * @param {{ id: string, url: string, duration: number }} props.clip - The audio clip to play.
 * @param {(id: string) => void} [props.onDelete] - Optional delete handler.
 * @returns {JSX.Element} The audio clip row.
 */
function AudioClipRow({ clip, onDelete }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
      <audio
        ref={audioRef}
        src={clip.url}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(event) => setPosition(event.currentTarget.currentTime)}
      />
      <IconButton
        aria-label={isPlaying ? "Pause clip" : "Play clip"}
        size="small"
        onClick={handleTogglePlay}
      >
        {isPlaying ? <Pause fontSize="small" /> : <PlayArrow fontSize="small" />}
      </IconButton>
      <Slider
        size="small"
        value={Math.min(position, clip.duration)}
        max={Math.max(clip.duration, 0.01)}
        step={0.1}
        onChange={(_event, value) => {
          const audio = audioRef.current;
          if (audio) {
            audio.currentTime = value;
          }
          setPosition(value);
        }}
        aria-label="Clip position"
        sx={{ flexGrow: 1, mx: 1 }}
      />
      <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
        {formatDuration(position)} / {formatDuration(clip.duration)}
      </Typography>
      {onDelete ? (
        <IconButton aria-label="Delete clip" size="small" onClick={() => onDelete(clip.id)}>
          <Delete fontSize="small" />
        </IconButton>
      ) : null}
    </Box>
  );
}

AudioClipRow.displayName = "AudioClipRow";

export default AudioClipRow;