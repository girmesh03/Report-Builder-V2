/**
 * @module components/assistant/StopStreamingButton
 */

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Stop from '@mui/icons-material/Stop';
import { useChat } from '@mui/x-chat-headless';

/**
 * Stops the in-flight assistant response. Rendered inside the Chat provider
 * tree (composer toolbar), it reads `isStreaming`/`stopStreaming` from the
 * `@mui/x-chat-headless` controller, so it only appears actionable while a
 * stream is running and aborts the adapter fetch via the runtime signal.
 *
 * @returns {JSX.Element} The stop button.
 */
function StopStreamingButton() {
  const { isStreaming, stopStreaming } = useChat();
  return (
    <Tooltip title={isStreaming ? 'Stop generating' : 'No run in progress'}>
      <span>
        <IconButton aria-label="Stop generating" size="small" disabled={!isStreaming} onClick={stopStreaming} sx={{ flexShrink: 0 }}>
          <Stop fontSize="small" />
        </IconButton>
      </span>
    </Tooltip>
  );
}

StopStreamingButton.displayName = 'StopStreamingButton';

export default StopStreamingButton;