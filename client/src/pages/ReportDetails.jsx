/**
 * @module pages/ReportDetails
 */

import { useState } from 'react';
import dayjs from 'dayjs';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Delete from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

import AudioClipRow from '../components/reusable/AudioClipRow.jsx';
import LoadingSpinner from '../components/reusable/LoadingSpinner.jsx';
import MuiButton from '../components/reusable/MuiButton.jsx';
import MuiConfirmDialog from '../components/reusable/MuiConfirmDialog.jsx';
import MuiPageHeader from '../components/reusable/MuiPageHeader.jsx';
import MuiStatusBadge from '../components/reusable/MuiStatusBadge.jsx';
import MuiTextField from '../components/reusable/MuiTextField.jsx';
import { API_CONFIG } from '../utils/constants.js';
import {
  useDeleteReportMutation,
  useGetReportQuery,
  useTranscribeReportMutation,
} from '../redux/features/reportSlice.js';
import { useUpdateTranscriptionMutation } from '../redux/features/transcriptionSlice.js';

/**
 * Report details page (`## UI/UX Spec` §11, route `reports/:id/details`):
 * header with MuiStatusBadge, details (date, branches, times), playable
 * audio clips (shared `AudioClipRow` with play/pause + seek on the §6.4
 * stream endpoint — the create-dialog experience minus delete), the
 * editable transcription with Save (`PATCH /transcriptions/:id`) and a
 * Re-transcribe button re-running STT on the stored audio
 * (`## Transcription Review` §2), and the generated report with its
 * `generatedHistory[]` versions (T-3-03b/S-3-05b). The Generate action
 * (status `reviewed`) arrives with Phase 5; Archive/Restore with the §35
 * lifecycle in Phase 8 — the Phase 4 UI never offers them. The initial-load
 * spinner gates on `isLoading`, not `isFetching`, so background refetches
 * (e.g. from an updated mutation cache) never momentarily blank the page
 * (F-4-16).
 *
 * @returns {JSX.Element} The report details page.
 */
function ReportDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteReport, { isLoading: isDeleting }] = useDeleteReportMutation();
  const { data: report, isLoading, isError } = useGetReportQuery(id);
  const [updateTranscription, { isLoading: isSaving }] = useUpdateTranscriptionMutation();
  const [transcribeReport, { isLoading: isTranscribing }] = useTranscribeReportMutation();
  const transcription = report?.transcription ?? null;
  const [draft, setDraft] = useState('');
  const transcriptionKey = transcription
    ? `${transcription._id}|${transcription.latest}|${transcription.raw}`
    : null;
  const [prevTranscriptionKey, setPrevTranscriptionKey] = useState(null);
  // Derived-state reset: a new transcription (fresh report load or a
  // re-transcription overwrite) re-seeds the editable draft without
  // clobbering in-progress edits (`react.dev/learn/you-might-not-need-an-effect`).
  if (transcriptionKey !== null && transcriptionKey !== prevTranscriptionKey) {
    setPrevTranscriptionKey(transcriptionKey);
    setDraft(transcription.latest || transcription.raw || '');
  }

  const handleDelete = async () => {
    try {
      await deleteReport(id).unwrap();
      toast.success('Report deleted');
      navigate('/reports');
    } catch (error) {
      toast.error(error.data?.message || 'Failed to delete report');
    }
  };

  const handleSaveTranscription = async () => {
    if (!transcription) return;
    try {
      await updateTranscription({ id: transcription._id, reviewed: draft }).unwrap();
      toast.success('Transcription saved');
    } catch (error) {
      toast.error(error.data?.message || 'Failed to save transcription');
    }
  };

  const handleReTranscribe = async () => {
    try {
      await transcribeReport(report._id).unwrap();
      toast.success('Transcription updated');
    } catch (error) {
      toast.error(error.data?.message || 'Failed to re-transcribe');
    }
  };

  if (isLoading) {
    return <LoadingSpinner minHeight="400px" />;
  }

  if (isError || !report) {
    return (
      <>
        <MuiPageHeader title="Report Details" />
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Report not found.
        </Typography>
        <MuiButton variant="outlined" onClick={() => navigate('/reports')} sx={{ flexShrink: 0 }}>
          Back to Reports
        </MuiButton>
      </>
    );
  }

  const versions = [...report.generatedHistory].reverse();

  return (
    <>
      <MuiPageHeader title="Report Details" subtitle={`Report · ${report.date}`}>
        <MuiStatusBadge status={report.status} />
        <Tooltip title="Delete">
          <IconButton aria-label="Delete report" size="small" onClick={() => setDeleteOpen(true)}>
            <Delete fontSize="small" sx={{ color: 'error.main' }} />
          </IconButton>
        </Tooltip>
      </MuiPageHeader>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Details
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date: {report.date}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Clock In: {report.clockIn || '—'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Clock Out: {report.clockOut || '—'}
              </Typography>
              <List dense disablePadding>
                {report.branches.map((branch) => (
                  <ListItem key={branch.branchId?._id ?? branch.branchId} disablePadding>
                    <ListItemText
                      primary={branch.branchId?.name ?? branch.name ?? 'Branch'}
                      secondary={
                        branch.clockIn || branch.clockOut
                          ? `${branch.clockIn || '—'} – ${branch.clockOut || '—'}`
                          : branch.branchId?.location || undefined
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Audio
              </Typography>
              {report.audio.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No audio clips attached.
                </Typography>
              ) : (
                <List dense disablePadding>
                  {report.audio.map((clip) => (
                    <ListItem
                      key={clip._id}
                      disablePadding
                      sx={{
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        mb: 1.5,
                        '&:last-child': { mb: 0 },
                      }}
                    >
                      <AudioClipRow
                        clip={{
                          id: clip._id,
                          url: `${API_CONFIG.VITE_API_BASE_URL}/audio/${clip._id}/stream`,
                          duration: clip.duration,
                        }}
                      />
                      <ListItemText
                        primary={clip.originalName}
                        secondary={`${clip.mimeType} · ${clip.fileSize} bytes · ${clip.duration}s · ${dayjs(
                          clip.createdAt,
                        ).format('DD-MM-YYYY hh:mm A')}`}
                        sx={{ mt: 0.5 }}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Transcription
                </Typography>
                {transcription ? (
                  <MuiButton
                    variant="outlined"
                    onClick={handleReTranscribe}
                    loading={isTranscribing}
                    sx={{ flexShrink: 0 }}
                  >
                    Re-transcribe
                  </MuiButton>
                ) : null}
              </Box>
              {isTranscribing ? <LinearProgress sx={{ mb: 1 }} /> : null}
              {transcription ? (
                <>
                  <MuiTextField
                    multiline
                    minRows={4}
                    fullWidth
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    sx={{ mb: 1 }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: 1 }}>
                    <MuiButton
                      variant="contained"
                      onClick={handleSaveTranscription}
                      loading={isSaving}
                      sx={{ flexShrink: 0 }}
                    >
                      Save
                    </MuiButton>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {transcription.history.length} revision(s)
                  </Typography>
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No transcription yet.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Generated Report
              </Typography>
              {report.generated ? (
                <>
                  <Typography variant="body2" sx={{ mb: 2, whiteSpace: 'pre-wrap' }}>
                    {report.generated}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    Version History
                  </Typography>
                  <List dense disablePadding>
                    {versions.map((entry, index) => (
                      <ListItem key={`${entry.generatedAt}-${index}`} alignItems="flex-start" disablePadding sx={{ mb: 1 }}>
                        <ListItemText
                          primary={`${entry.provider} · ${dayjs(entry.generatedAt).format('DD-MM-YYYY hh:mm A')}`}
                          secondary={entry.text}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No generated report yet.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <MuiConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Report"
        message="This permanently deletes the report. This cannot be undone."
        confirmText="Delete"
        confirmColor="error"
        confirmLoading={isDeleting}
      />
    </>
  );
}

ReportDetails.displayName = 'ReportDetails';

export default ReportDetails;
