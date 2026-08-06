/**
 * @module components/assistant/ConversationRail
 */

import Add from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { ChatConversationList } from '@mui/x-chat';

import MuiButton from '../reusable/MuiButton.jsx';

/**
 * Conversation rail slot (`slots.conversationList`): a "New Chat" button
 * above the built-in `ChatConversationList`. ChatBox passes the list props
 * (variant, slots, slotProps) through `rest`, so the built-in compact
 * variant, per-item actions and drawer wiring keep working unchanged.
 *
 * @param {Object} props - Component props.
 * @param {() => void} props.onNewChat - New Chat click handler.
 * @returns {JSX.Element} The rail.
 */
function ConversationRail({ onNewChat, ...rest }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <Box sx={{ p: 1, flexShrink: 0 }}>
        <MuiButton variant="contained" fullWidth startIcon={<Add />} onClick={onNewChat}>
          New Chat
        </MuiButton>
      </Box>
      <Box sx={{ flexGrow: 1, minHeight: 0 }}>
        <ChatConversationList {...rest} />
      </Box>
    </Box>
  );
}

ConversationRail.displayName = 'ConversationRail';

export default ConversationRail;