/**
 * @module components/reusable/MuiStatusBadge
 */

import Chip from '@mui/material/Chip';

import { REPORT_STATUS_AUDIO_ATTACHED, REPORT_STATUS_COMPLETED, REPORT_STATUS_DRAFT, REPORT_STATUS_REVIEWED, REPORT_STATUS_TRANSCRIBED } from '../../utils/constants.js';

/** @type {Readonly<Record<string, import('@mui/material').ChipProps['color']>>} Status → Chip color mapping (§9.8, `## Status Machine` §3). */
const STATUS_COLORS = Object.freeze({
  [REPORT_STATUS_DRAFT]: 'default',
  [REPORT_STATUS_AUDIO_ATTACHED]: 'warning',
  [REPORT_STATUS_TRANSCRIBED]: 'info',
  [REPORT_STATUS_REVIEWED]: 'primary',
  [REPORT_STATUS_COMPLETED]: 'success',
});

/**
 * Color-coded, non-interactive status chip for `report.status` (1.13) —
 * read-only presentation; no click handling, no hover pointer, never
 * rendered inside a button (`## MUI Component Standards` §9.8).
 *
 * @param {Object} props - Component props.
 * @param {string} props.status - One of `draft` | `audio_attached` | `transcribed` | `reviewed` | `completed`.
 * @returns {JSX.Element} The status badge.
 */
function MuiStatusBadge({ status }) {
  return <Chip size="small" label={status} color={STATUS_COLORS[status] ?? 'default'} sx={{ cursor: 'default' }} />;
}

MuiStatusBadge.displayName = 'MuiStatusBadge';

export default MuiStatusBadge;
