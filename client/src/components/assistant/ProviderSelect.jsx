/**
 * @module components/assistant/ProviderSelect
 */

import MenuItem from '@mui/material/MenuItem';

import MuiSelect from '../reusable/MuiSelect.jsx';
import { PROVIDER_ADDIS, PROVIDER_GEMINI, PROVIDER_NVIDIA } from '../../utils/constants.js';

/**
 * Session-wide AI agent (provider) selector rendered in the chat composer
 * toolbar. The selected provider is passed to every assistant message in the
 * session; the backend records it on assistant messages (REQ-133).
 *
 * @param {Object} props - Component props.
 * @param {string} props.value - The selected provider (`addis` | `gemini` | `nvidia`).
 * @param {(provider: string) => void} props.onChange - Provider change handler.
 * @returns {JSX.Element} The provider selector.
 */
function ProviderSelect({ value, onChange }) {
  return (
    <MuiSelect
      value={value}
      onChange={(event) => onChange(event.target.value)}
      variant="standard"
      inputProps={{ 'aria-label': 'AI agent' }}
      sx={{ minWidth: 96, flexShrink: 0 }}
    >
      <MenuItem value={PROVIDER_ADDIS}>Addis AI</MenuItem>
      <MenuItem value={PROVIDER_GEMINI}>Gemini</MenuItem>
      <MenuItem value={PROVIDER_NVIDIA}>NVIDIA</MenuItem>
    </MuiSelect>
  );
}

ProviderSelect.displayName = 'ProviderSelect';

export default ProviderSelect;