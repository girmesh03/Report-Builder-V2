/**
 * @module components/assistant/ConversationDeleteButton
 */

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Delete from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { useDeleteConversationMutation } from '../../redux/features/assistantApi.js';
import { removeConversation } from '../../redux/features/aiConversationSlice.js';

/**
 * Per-conversation delete action rendered through the rail's
 * `itemActions` slot (compact variant, revealed on hover/focus). Clicking it
 * removes the conversation server-side (`DELETE /assistant/conversations/:id`)
 * and drops it from `aiConversationSlice`; the click is stopped from bubbling
 * so the rail item is not selected. Redux hooks are safe here because the
 * slot still renders inside the app's Redux provider.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.conversation - The rail item (canon `id`).
 * @returns {JSX.Element} The delete button.
 */
function ConversationDeleteButton({ conversation }) {
  const dispatch = useDispatch();
  const [deleteConversation, { isLoading }] = useDeleteConversationMutation();

  const handleDelete = async (event) => {
    event.stopPropagation();
    try {
      await deleteConversation(conversation.id).unwrap();
      dispatch(removeConversation(conversation.id));
    } catch (error) {
      toast.error(error.data?.message || 'Failed to delete conversation');
    }
  };

  return (
    <Tooltip title="Delete conversation">
      <IconButton
        aria-label="Delete conversation"
        size="small"
        onClick={handleDelete}
        disabled={isLoading}
        sx={{ flexShrink: 0 }}
      >
        <Delete fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}

ConversationDeleteButton.displayName = 'ConversationDeleteButton';

export default ConversationDeleteButton;