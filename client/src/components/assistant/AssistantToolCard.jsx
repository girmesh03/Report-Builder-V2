/**
 * @module components/assistant/AssistantToolCard
 */

import { useMemo, useState } from 'react';
import { getDefaultMessagePartRenderer, useChat } from '@mui/x-chat-headless';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

/** @type {Set<string>} Tool names rendered as clean correction cards (everything else falls back to the default renderer). */
const CORRECTION_TOOLS = new Set(['save_report', 'save_transcription']);

/** @type {Object<string, { label: string, color: string }>} Status chip presentation per tool invocation state. */
const STATUS_PRESENTATION = Object.freeze({
  'approval-requested': { label: 'Approval required', color: 'warning' },
  'approval-responded': { label: 'Declined', color: 'default' },
  'output-available': { label: 'Applied', color: 'success' },
  'output-denied': { label: 'Declined', color: 'default' },
  'output-error': { label: 'Failed', color: 'error' },
});

/** @type {Object<string, string>} Friendly card title per correction tool. */
const TOOL_TITLES = Object.freeze({
  save_report: 'Report correction',
  save_transcription: 'Transcription correction',
});

/**
 * Resolves the corrected text offered by a correction tool (`input.correctedText`
 * for `save_report`, `input.latest` for `save_transcription`).
 *
 * @param {Object} [input] - The tool invocation input.
 * @returns {string} The corrected text, or an empty string.
 */
function extractCorrectionText(input) {
  if (!input || typeof input !== 'object') {
    return '';
  }
  return input.correctedText ?? input.latest ?? '';
}

/**
 * Custom `tool`/`dynamic-tool` message part renderer (registered through
 * `ChatBox.partRenderers`). Correction tools (`save_report`,
 * `save_transcription`) render a clean card — friendly title, status chip,
 * the corrected report as collapsible plain text (never raw JSON), and
 * Approve/Reject actions for pending approvals — instead of the built-in
 * JSON-dumping tool card. Any other tool name falls back to the default
 * part renderer so future tools keep standard behavior.
 *
 * @param {Object} props - The Chat part renderer props.
 * @param {Object} props.part - The tool message part (`toolInvocation`).
 * @param {Object} props.message - The owning chat message.
 * @param {number} props.index - The part index within the message.
 * @param {Function} [props.onToolCall] - The Chat runtime tool-call callback.
 * @returns {import('react').ReactNode} The rendered card (or the default renderer output).
 */
function AssistantToolCard({ part, message, index, onToolCall }) {
  const { addToolApprovalResponse } = useChat();
  const [pendingDecision, setPendingDecision] = useState(false);
  const { toolInvocation } = part;
  const toolName = toolInvocation.toolName;
  const state = toolInvocation.state;
  const correctionText = useMemo(() => extractCorrectionText(toolInvocation.input), [toolInvocation.input]);
  const outputMessage = toolInvocation.output?.message ?? '';

  if (!CORRECTION_TOOLS.has(toolName)) {
    const defaultRenderer = getDefaultMessagePartRenderer(part);
    return defaultRenderer ? defaultRenderer({ part, message, index, onToolCall }) : null;
  }

  const presentation = STATUS_PRESENTATION[state] ?? { label: state, color: 'default' };
  const title = TOOL_TITLES[toolName] ?? toolName;
  const awaitingDecision = state === 'approval-requested';

  const handleDecision = async (approved) => {
    setPendingDecision(true);
    try {
      await addToolApprovalResponse({
        id: toolInvocation.approvalId ?? toolInvocation.toolCallId,
        approved,
      });
    } catch {
      // Errors surface through the chat runtime error channel.
    } finally {
      setPendingDecision(false);
    }
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: 560, my: 0.5 }}>
      <CardContent sx={{ pb: awaitingDecision ? 0 : 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Chip label={presentation.label} color={presentation.color} size="small" variant="outlined" />
        </Box>
        {state === 'output-available' && outputMessage ? (
          <Alert severity="success" sx={{ my: 1 }}>
            {outputMessage}
          </Alert>
        ) : null}
        {state === 'approval-responded' || state === 'output-denied' ? (
          <Alert severity="info" sx={{ my: 1 }}>
            The correction was declined — nothing was updated.
          </Alert>
        ) : null}
        {state === 'output-error' ? (
          <Alert severity="error" sx={{ my: 1 }}>
            {toolInvocation.errorText || 'The correction could not be applied.'}
          </Alert>
        ) : null}
        {correctionText ? (
          <details>
            <summary style={{ cursor: 'pointer' }}>Show corrected report</summary>
            <Box
              component="pre"
              sx={{
                maxHeight: 240,
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontSize: 'caption.fontSize',
                bgcolor: 'action.hover',
                borderRadius: 1,
                p: 1,
                m: 0,
                mt: 1,
              }}
            >
              {correctionText}
            </Box>
          </details>
        ) : null}
      </CardContent>
      {awaitingDecision ? (
        <CardActions>
          <Button
            size="small"
            variant="contained"
            color="success"
            disabled={pendingDecision}
            onClick={() => handleDecision(true)}
          >
            Approve
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="inherit"
            disabled={pendingDecision}
            onClick={() => handleDecision(false)}
          >
            Reject
          </Button>
        </CardActions>
      ) : null}
    </Card>
  );
}

AssistantToolCard.displayName = 'AssistantToolCard';

export default AssistantToolCard;
