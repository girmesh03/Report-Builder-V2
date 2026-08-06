/**
 * @module components/assistant/ReasoningToggle
 */

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

/**
 * Reasoning toggle rendered in the chat composer toolbar. When on, the session
 * requests reasoning output from reasoning-capable providers (e.g. NVIDIA's
 * DeepSeek); the backend responds with `reasoning` parts that the chat
 * message list renders as a collapsible "Reasoning" block.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.value - Whether reasoning is requested.
 * @param {(value: boolean) => void} props.onChange - Reasoning toggle change handler.
 * @returns {JSX.Element} The reasoning toggle.
 */
function ReasoningToggle({ value, onChange }) {
  return (
    <FormControlLabel
      control={<Switch size="small" checked={value} onChange={(event) => onChange(event.target.checked)} />}
      label="Reasoning"
      labelPlacement="end"
      sx={{ ml: 0.5 }}
    />
  );
}

ReasoningToggle.displayName = 'ReasoningToggle';

export default ReasoningToggle;