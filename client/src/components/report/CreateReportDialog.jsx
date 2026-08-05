/**
 * @module components/report/CreateReportDialog
 */

import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormHelperText from "@mui/material/FormHelperText";
import Close from "@mui/icons-material/Close";
import Storefront from "@mui/icons-material/Storefront";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord";
import Pause from "@mui/icons-material/Pause";
import Stop from "@mui/icons-material/Stop";
import Add from "@mui/icons-material/Add";
import { toast } from "react-toastify";

import MuiButton from "../reusable/MuiButton.jsx";
import MuiDatePicker from "../reusable/MuiDatePicker.jsx";
import MuiDialog from "../reusable/MuiDialog.jsx";
import MuiTimePicker from "../reusable/MuiTimePicker.jsx";
import BranchSelectorDialog from "./BranchSelectorDialog.jsx";
import AudioClipRow from "../reusable/AudioClipRow.jsx";
import { useAudioRecorder } from "../../hooks/useAudioRecorder.js";
import {
  formatEthiopianDateLong,
  gregorianToEthiopian,
} from "../../utils/ethiopianDate.js";
import { AUDIO_MAX_DURATION_SEC, AUDIO_MAX_SIZE_BYTES } from "../../utils/constants.js";
import {
  useCreateReportMutation,
  useDeleteReportMutation,
  useTranscribeReportMutation,
  useUploadAudioClipsMutation,
} from "../../redux/features/reportSlice.js";
import {
  clearAudioDraft,
  loadAudioDraft,
  saveAudioDraft,
} from "../../utils/audioDraftStore.js";

/** @type {string} Twelve-hour time format matching `Report.clockIn`/`clockOut` (`## Data Modeling` §4.1). */
const TIME_FORMAT = "hh:mm A";

/** @type {number} Max clip size in MB — display form of `AUDIO_MAX_SIZE_BYTES` (§6.1 warning). */
const AUDIO_MAX_SIZE_MB = Math.floor(AUDIO_MAX_SIZE_BYTES / 1048576);

/** @type {string} Submit step: report document creation. */
const SUBMIT_STEP_REPORT = "report";
/** @type {string} Submit step: audio clip upload. */
const SUBMIT_STEP_AUDIO = "audio";
/** @type {string} Submit step: transcription. */
const SUBMIT_STEP_TRANSCRIBE = "transcribe";

/** @type {Object<string, string>} Indeterminate overlay label per submit step (`## Audio Recording STT` §6.2). */
const SUBMIT_STEP_LABELS = Object.freeze({
  [SUBMIT_STEP_REPORT]: "Creating report...",
  [SUBMIT_STEP_AUDIO]: "Uploading audio...",
  [SUBMIT_STEP_TRANSCRIBE]: "Transcribing...",
});

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
 * Phase 4 create dialog: date, branches with per-branch clockIn/clockOut
 * time pickers (responsive rows, `## UI/UX Spec` §11), global
 * clockIn/clockOut, and the §5.1 audio recorder section. Submit runs the
 * split three-step flow (user decision): `POST /reports` (JSON) →
 * `POST /api/v1/audio` (multipart `clips`) → `POST /reports/:id/transcribe`,
 * with an indeterminate LinearProgress overlay per step (§6.2, user
 * decision). A 502 transcription failure keeps the dialog open with
 * "Transcription failed, retry?" and a Retry button re-running the last
 * step (`## Transcription Review` §2.1); while `transcribeFailed` the Submit
 * button is disabled so the flow cannot re-upload the same clips (Phase 4
 * corrections — duplicate-audio prevention). The recorder exposes Record /
 * Pause / Stop semantics with conditional tooltips, shows previously
 * recorded clips while recording the next one, and keeps a fullwidth
 * live waveform from the countdown end (pause freezes it). When the
 * transcribe/audio step fails with a server/application error, the
 * audio-less report doc is rolled back (best-effort delete) while the
 * recordings themselves are preserved in the IndexedDB-backed audio draft
 * store (Phase 4 corrections, user decision, REQ-140 exception) — restored
 * on the next dialog open, cleared on a successful upload. Network errors
 * of unknown outcome never delete the report. Cancel is available while
 * transcribing so a slow/hung STT provider never traps the session (the
 * report stays `audio_attached` in the list for a later retry); the dialog
 * otherwise closes only via Cancel or a successful submit.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.open - Dialog visibility.
 * @param {() => void} props.onClose - Close handler.
 * @returns {JSX.Element} The create report dialog.
 */
function CreateReportDialog({ open, onClose }) {
  const [createReport] = useCreateReportMutation();
  const [uploadAudioClips] = useUploadAudioClipsMutation();
  const [transcribeReport] = useTranscribeReportMutation();
  const [deleteReport] = useDeleteReportMutation();
  const userId = useSelector((state) => state.auth.user?._id);
  const {
    recordingState,
    clips,
    countdown,
    liveDuration,
    error: recorderError,
    waveformRef,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    deleteClip,
    seedClips,
    reset: resetRecorder,
  } = useAudioRecorder();
  const [branches, setBranches] = useState([]);
  const [branchErrors, setBranchErrors] = useState([]);
  const [branchSelectionError, setBranchSelectionError] = useState("");
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [submitStep, setSubmitStep] = useState(null);
  const [transcribeFailed, setTranscribeFailed] = useState(false);
  const [createdReportId, setCreatedReportId] = useState(null);
  const [draftLoaded, setDraftLoaded] = useState(false);
  const [audioUploaded, setAudioUploaded] = useState(false);
  const fallbackNotifiedRef = useRef(false);
  const closedRef = useRef(false);
  const clipsRef = useRef(clips);
  const { control, handleSubmit, reset, setError, getValues } = useForm({
    mode: "onBlur",
    defaultValues: { date: null, clockIn: null, clockOut: null },
  });

  useEffect(() => {
    clipsRef.current = clips;
  }, [clips]);

  useEffect(() => {
    if (recorderError) {
      toast.error(recorderError);
    }
  }, [recorderError]);

  useEffect(() => {
    if (!open || !userId) return;
    closedRef.current = false;
    let cancelled = false;
    loadAudioDraft(userId).then((draft) => {
      if (cancelled) return;
      const restored = draft?.clips ?? [];
      if (restored.length > 0 && clipsRef.current.length === 0) {
        seedClips(restored);
        toast.info(`Restored ${restored.length} saved recording${restored.length === 1 ? "" : "s"}`);
      }
      setDraftLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, [open, seedClips, userId]);

  useEffect(() => {
    if (!open || !draftLoaded || !userId) return;
    let cancelled = false;
    const write =
      clips.length === 0 ? clearAudioDraft(userId) : saveAudioDraft(userId, clips);
    write.then((durable) => {
      if (cancelled || durable !== false) return;
      if (!fallbackNotifiedRef.current) {
        fallbackNotifiedRef.current = true;
        toast.info("Recordings will be kept for this session only");
      }
    });
    return () => {
      cancelled = true;
    };
  }, [clips, draftLoaded, open, userId]);

  const handleClose = (wasCancelled = false) => {
    closedRef.current = true;
    setAudioUploaded(false);
    if (wasCancelled && submitStep === SUBMIT_STEP_TRANSCRIBE) {
      toast.info("Report saved with audio — transcription pending. Open the report to retry.");
    }
    resetRecorder();
    reset({ date: null, clockIn: null, clockOut: null });
    setBranches([]);
    setBranchErrors([]);
    setBranchSelectionError("");
    setSubmitStep(null);
    setTranscribeFailed(false);
    setCreatedReportId(null);
    setDraftLoaded(false);
    onClose();
  };

  const handleBranchTimeChange = (index, field, value) => {
    setBranches((previous) =>
      previous.map((branch, branchIndex) =>
        branchIndex === index ? { ...branch, [field]: value } : branch,
      ),
    );
    setBranchErrors((previous) =>
      previous.map((errors, branchIndex) =>
        branchIndex === index ? { ...errors, [field]: undefined } : errors,
      ),
    );
  };

  const handleRetryTranscribe = async () => {
    if (!createdReportId) return;
    setSubmitStep(SUBMIT_STEP_TRANSCRIBE);
    try {
      await transcribeReport(createdReportId).unwrap();
      if (closedRef.current) {
        toast.success("Transcription finished — check the Reports list.");
        return;
      }
      toast.success("Report created");
      handleClose();
    } catch (error) {
      setSubmitStep(null);
      if (closedRef.current) return;
      if (error.status === 502) {
        setTranscribeFailed(true);
        toast.error("Transcription failed again. The report stays available for retry.");
      } else {
        toast.error(error.data?.message || "Failed to create report");
      }
    }
  };

  const handleInvalidSubmit = (errors) => {
    const firstError = Object.values(errors)[0];
    toast.error(firstError?.message ?? "Complete all required fields");
  };

  const handleSubmitReport = (event) => {
    handleSubmit(async (values) => {
      if (branches.length === 0) {
        setBranchSelectionError("Select at least one branch");
        return;
      }
      setBranchSelectionError("");
      if (clips.length === 0) {
        toast.error("Record at least one audio clip");
        return;
      }
      if (clips.some((clip) => clip.blob.size > AUDIO_MAX_SIZE_BYTES)) {
        toast.error(`A clip exceeds ${AUDIO_MAX_SIZE_MB} MB. Re-record the oversized clip.`);
        return;
      }
      if (!values.date) {
        toast.error("Date is required");
        return;
      }
      if (!values.clockIn) {
        toast.error("Start time is required");
        return;
      }
      if (!values.clockOut) {
        toast.error("End time is required");
        return;
      }
      if (!values.clockOut.isAfter(values.clockIn)) {
        toast.error("End time must be after start time");
        return;
      }
      const singleBranch = branches.length === 1;
      const nextBranchErrors = branches.map((branch) => {
        if (singleBranch) {
          return {};
        }
        const errors = {};
        if (!branch.clockIn) {
          errors.clockIn = "Start time is required";
        }
        if (!branch.clockOut) {
          errors.clockOut = "End time is required";
        }
        if (branch.clockIn && branch.clockOut && !branch.clockOut.isAfter(branch.clockIn)) {
          errors.clockOut = "End time must be after start time";
        }
        return errors;
      });
      if (nextBranchErrors.some((errors) => Object.keys(errors).length > 0)) {
        setBranchErrors(nextBranchErrors);
        return;
      }
      setBranchErrors([]);
      const ethiopianDate = gregorianToEthiopian(
        values.date.year(),
        values.date.month() + 1,
        values.date.date(),
      );
      const payload = {
        date: formatEthiopianDateLong(ethiopianDate),
        branches: branches.map((branch) =>
          singleBranch
            ? {
                branchId: branch.branchId,
                clockIn: values.clockIn.format(TIME_FORMAT),
                clockOut: values.clockOut.format(TIME_FORMAT),
              }
            : {
                branchId: branch.branchId,
                clockIn: branch.clockIn.format(TIME_FORMAT),
                clockOut: branch.clockOut.format(TIME_FORMAT),
              },
        ),
        clockIn: values.clockIn.format(TIME_FORMAT),
        clockOut: values.clockOut.format(TIME_FORMAT),
      };
      setTranscribeFailed(false);
      let reportId = createdReportId;
      try {
        if (!reportId) {
          setSubmitStep(SUBMIT_STEP_REPORT);
          reportId = (await createReport(payload).unwrap())._id;
          setCreatedReportId(reportId);
        }
        if (!audioUploaded) {
          setSubmitStep(SUBMIT_STEP_AUDIO);
          await uploadAudioClips({ reportId, clips }).unwrap();
          setAudioUploaded(true);
        }
        if (userId) {
          clearAudioDraft(userId);
        }
        setSubmitStep(SUBMIT_STEP_TRANSCRIBE);
        await transcribeReport(reportId).unwrap();
        if (closedRef.current) {
          toast.success("Transcription finished — check the Reports list.");
          return;
        }
        toast.success("Report created");
        handleClose();
      } catch (error) {
        setSubmitStep(null);
        if (closedRef.current) return;
        if (error.status === 502 && reportId) {
          setTranscribeFailed(true);
          return;
        }
        if (reportId && !audioUploaded) {
          if (typeof error.status === "number") {
            try {
              await deleteReport(reportId).unwrap();
            } catch {
              // Best-effort rollback; a failed delete leaves a draft in the list.
            }
            setCreatedReportId(null);
            const errors = error.data?.data?.errors;
            const detail = errors?.[0]?.message ?? error.data?.message ?? "Audio upload failed";
            toast.error(`${detail} — your recordings are preserved.`);
          } else {
            toast.error(
              "Upload result unknown — check the Reports list before retrying. Your recordings are preserved.",
            );
          }
          return;
        }
        const errors = error.data?.data?.errors;
        if (errors) {
          errors.forEach((item) =>
            setError(item.field ?? "root", {
              type: "server",
              message: item.message,
            }),
          );
        } else {
          toast.error(error.data?.message || "Failed to create report");
        }
      }
    }, handleInvalidSubmit)(event);
  };

  return (
    <MuiDialog
      open={open}
      // MUI v9 removed `disableEscapeKeyDown`; the no-op onClose already
      // blocks Escape and backdrop close (Modal calls onClose with
      // "escapeKeyDown"/"backdropClick", which this handler ignores), so the
      // dialog closes only via Cancel or a successful submit (## UI/UX Spec
      // §11).
      onClose={() => undefined}
      title="Create New Report"
      maxWidth="sm"
      fullScreen={false}
      sx={{
        "& .MuiPaper-root": { m: 1, py: 1 },
        "& .MuiDialogContent-root": { position: "relative" },
      }}
      actions={
        <>
          <MuiButton
            variant="outlined"
            onClick={() => handleClose(true)}
            disabled={
              submitStep !== null && submitStep !== SUBMIT_STEP_TRANSCRIBE
            }
            sx={{ flexShrink: 0 }}
          >
            Cancel
          </MuiButton>
          <MuiButton
            type="submit"
            variant="contained"
            loading={submitStep !== null}
            disabled={transcribeFailed}
            form="create-report-form"
            sx={{ flexShrink: 0 }}
          >
            Submit
          </MuiButton>
        </>
      }
    >
      <form id="create-report-form" onSubmit={handleSubmitReport} noValidate>
        {transcribeFailed ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              px: 1,
              py: 1,
            }}
          >
            <Typography variant="body2" color="warning.main">
              Transcription failed, retry?
            </Typography>
            <MuiButton variant="contained" onClick={handleRetryTranscribe} sx={{ flexShrink: 0 }}>
              Retry
            </MuiButton>
          </Box>
        ) : null}
        <Grid container spacing={2} sx={{ px: 1, py: 2 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            {/* Controller required: the DatePicker delivers a custom onChange value (`## React Hook Form Standards` §3). */}
            <Controller
              name="date"
              control={control}
              rules={{ required: "Date is required" }}
              render={({ field, fieldState }) => (
                <MuiDatePicker
                  {...field}
                  label="Date"
                  fullWidth
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <MuiButton
              variant="outlined"
              fullWidth
              startIcon={<Storefront />}
              onClick={() => setSelectorOpen(true)}
              sx={{ flexShrink: 0 }}
            >
              Select Branches
            </MuiButton>
            {branchSelectionError ? (
              <FormHelperText error sx={{ mx: 0.5, mt: 0.5 }}>
                {branchSelectionError}
              </FormHelperText>
            ) : null}
          </Grid>
          {branches.map((branch, index) => (
            <Grid key={branch.branchId} size={12}>
              <Grid container spacing={1} sx={{ alignItems: "center" }}>
                <Grid
                  size={{ xs: 12, sm: 4 }}
                  sx={{ display: "flex", alignItems: "center", minWidth: 0 }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {branch.name}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <MuiTimePicker
                    label="Clock In"
                    value={branch.clockIn}
                    onChange={(value) => handleBranchTimeChange(index, "clockIn", value)}
                    error={Boolean(branchErrors[index]?.clockIn)}
                    helperText={branchErrors[index]?.clockIn}
                  />
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <MuiTimePicker
                    label="Clock Out"
                    value={branch.clockOut}
                    onChange={(value) => handleBranchTimeChange(index, "clockOut", value)}
                    error={Boolean(branchErrors[index]?.clockOut)}
                    helperText={branchErrors[index]?.clockOut}
                  />
                </Grid>
                <Grid
                  size={{ xs: 12, sm: 2 }}
                  sx={{ display: "flex", justifyContent: { xs: "flex-end", sm: "center" } }}
                >
                  <IconButton
                    aria-label={`Remove ${branch.name}`}
                    size="small"
                    onClick={() => {
                      setBranches((previous) =>
                        previous.filter((item) => item.branchId !== branch.branchId),
                      );
                      setBranchSelectionError("");
                    }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          ))}
          {branches.length > 0 ? (
            <Grid size={12}>
              <Divider />
            </Grid>
          ) : null}
          <Grid size={{ xs: 12, md: 6 }}>
            {/* Controller required: the TimePicker delivers a custom onChange value (`## React Hook Form Standards` §3). */}
            <Controller
              name="clockIn"
              control={control}
              rules={{ required: "Start time is required" }}
              render={({ field, fieldState }) => (
                <MuiTimePicker
                  {...field}
                  label="Clock In"
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {/* Controller required: the TimePicker delivers a custom onChange value (`## React Hook Form Standards` §3). */}
            <Controller
              name="clockOut"
              control={control}
              rules={{
                required: "End time is required",
                validate: (value) => {
                  const clockIn = getValues("clockIn");
                  return (
                    !value ||
                    !clockIn ||
                    value.isAfter(clockIn) ||
                    "End time must be after start time"
                  );
                },
              }}
              render={({ field, fieldState }) => (
                <MuiTimePicker
                  {...field}
                  label="Clock Out"
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid size={12}>
            <Divider />
          </Grid>
          <Grid size={12}>
            <Typography variant="subtitle1" gutterBottom>
              Audio Narration
            </Typography>
            <Box
              sx={{
                position: "relative",
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                p: 1.5,
                minHeight: 64,
              }}
            >
              {recordingState === "idle" ? (
                <MuiButton
                  variant="outlined"
                  startIcon={<FiberManualRecord sx={{ color: "error.main" }} />}
                  onClick={startRecording}
                  sx={{ flexShrink: 0 }}
                >
                  Start Recording
                </MuiButton>
              ) : null}
              {recordingState === "countdown" ? (
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    bgcolor: "rgba(0, 0, 0, 0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 1,
                    zIndex: 1,
                  }}
                >
                  <Typography variant="h2" sx={{ color: "common.white" }}>
                    {countdown}
                  </Typography>
                </Box>
              ) : null}
              {recordingState === "recording" ||
              recordingState === "paused" ? (
                <Box>
                  {clips.map((clip) => (
                    <AudioClipRow key={clip.id} clip={clip} onDelete={deleteClip} />
                  ))}
                  <canvas
                    ref={waveformRef}
                    style={{ width: "100%", height: 64, display: "block", borderRadius: 1 }}
                  />
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                      {formatDuration(liveDuration)} /{" "}
                      {formatDuration(AUDIO_MAX_DURATION_SEC)}
                    </Typography>
                    {recordingState === "recording" ? (
                      <Tooltip title="Pause">
                        <IconButton aria-label="Pause recording" onClick={pauseRecording}>
                          <Pause />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Record">
                        <IconButton aria-label="Resume recording" onClick={resumeRecording}>
                          <FiberManualRecord sx={{ color: "error.main" }} />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Stop">
                      <IconButton aria-label="Stop recording" onClick={stopRecording}>
                        <Stop />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              ) : null}
              {recordingState === "review" ? (
                <Box>
                  {clips.map((clip) => (
                    <AudioClipRow key={clip.id} clip={clip} onDelete={deleteClip} />
                  ))}
                  <MuiButton
                    variant="text"
                    startIcon={<Add />}
                    onClick={startRecording}
                    sx={{ flexShrink: 0 }}
                  >
                    Add Another Recording
                  </MuiButton>
                </Box>
              ) : null}
            </Box>
          </Grid>
        </Grid>
      </form>
      {submitStep !== null ? (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 1300,
            bgcolor: "rgba(255, 255, 255, 0.85)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
          }}
        >
          <LinearProgress sx={{ width: 200 }} />
          <Typography variant="body2">{SUBMIT_STEP_LABELS[submitStep]}</Typography>
        </Box>
      ) : null}
      <BranchSelectorDialog
        open={selectorOpen}
        selected={branches}
        onApply={(nextBranches) => {
          setBranches((previous) =>
            nextBranches.map((next) => ({
              ...next,
              clockIn: previous.find((branch) => branch.branchId === next.branchId)?.clockIn ?? null,
              clockOut: previous.find((branch) => branch.branchId === next.branchId)?.clockOut ?? null,
            })),
          );
          setBranchSelectionError("");
          setSelectorOpen(false);
        }}
        onClose={() => setSelectorOpen(false)}
      />
    </MuiDialog>
  );
}

CreateReportDialog.displayName = "CreateReportDialog";

export default CreateReportDialog;
