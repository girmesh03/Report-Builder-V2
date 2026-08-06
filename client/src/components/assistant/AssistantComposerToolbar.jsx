/**
 * @module components/assistant/AssistantComposerToolbar
 */

import Stack from '@mui/material/Stack';
import { ChatComposerToolbar } from '@mui/x-chat';

import ProviderSelect from './ProviderSelect.jsx';
import ReasoningToggle from './ReasoningToggle.jsx';
import StopStreamingButton from './StopStreamingButton.jsx';

/**
 * Chat composer toolbar slot (`slots.composerToolbar`): hosts the session
 * agent selector and the stop button on the left while forwarding the
 * Chat-provided children (attach/send buttons) on the right. Defined in its
 * own module so the `ChatBox` slot reference stays stable across renders.
 *
 * @param {Object} props - Component props merged with `slotProps.composerToolbar`.
 * @param {string} props.value - The session provider value (forwarded).
 * @param {(provider: string) => void} props.onValueChange - Provider change handler.
 * @param {boolean} props.reasoning - Whether reasoning is requested (forwarded).
 * @param {(value: boolean) => void} props.onReasoningChange - Reasoning toggle handler.
 * @param {import('react').ReactNode} props.children - Chat-provided toolbar children.
 * @returns {JSX.Element} The composer toolbar.
 */
function AssistantComposerToolbar({ value, onValueChange, reasoning, onReasoningChange, children, ...rest }) {
  return (
    <ChatComposerToolbar {...rest}>
      <Stack direction="row" alignItems="center" gap={1} sx={{ minWidth: 0 }}>
        <ProviderSelect value={value} onChange={onValueChange} />
        <ReasoningToggle value={reasoning} onChange={onReasoningChange} />
        <StopStreamingButton />
      </Stack>
      {children}
    </ChatComposerToolbar>
  );
}

AssistantComposerToolbar.displayName = 'AssistantComposerToolbar';

export default AssistantComposerToolbar;