/**
 * @module components/assistant/AssistantMessageActions
 */

import { useCallback } from 'react';
import { ChatMessageActions } from '@mui/x-chat';
import { useChat, useChatStore } from '@mui/x-chat-headless';
import Delete from '@mui/icons-material/Delete';
import Refresh from '@mui/icons-material/Refresh';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { assistantApi, useDeleteMessageMutation } from '../../redux/features/assistantApi.js';

/**
 * Finds the nearest preceding user message before a message in the active
 * thread (the anchor whose response is being deleted/regenerated).
 *
 * @param {Object[]} messages - The ordered active-thread messages.
 * @param {string} messageId - The target message id.
 * @returns {{ anchorIndex: number, anchorId: string }} The anchor position/id.
 */
function resolveAnchor(messages, messageId) {
  const targetIndex = messages.findIndex((message) => message.id === messageId);
  if (targetIndex === -1) {
    return { anchorIndex: -1, anchorId: messageId };
  }
  for (let index = targetIndex; index >= 0; index -= 1) {
    if (messages[index].role === 'user') {
      return { anchorIndex: index, anchorId: messages[index].id };
    }
  }
  return { anchorIndex: -1, anchorId: messageId };
}

/**
 * Per-message hover actions for the assistant thread (ChatBox `slots.actions`):
 * "Regenerate response" and "Delete response" on assistant replies. Regenerate
 * re-runs the anchored turn through the adapter (`adapter.regenerate`), which
 * strips the reply server-side and streams a fresh one; delete truncates the
 * thread server-side and mirrors it in the live store (the reply and
 * everything after it, keeping the user's question). Both are disabled while
 * a stream is in flight. Store/Redux hooks are safe here because the slot
 * renders inside the app's Redux and Chat providers.
 *
 * @param {Object} props - The `ChatMessageActions` props.
 * @param {Object | null} [props.message] - The owning chat message.
 * @returns {JSX.Element} The chat message actions.
 */
function AssistantMessageActions({ message, ...rest }) {
  const dispatch = useDispatch();
  const { messages, regenerate, isStreaming, activeConversationId } = useChat();
  const store = useChatStore();
  const [deleteMessage, { isLoading: isDeleting }] = useDeleteMessageMutation();
  const disabled = isStreaming || isDeleting;

  const handleRegenerate = useCallback(
    async (event) => {
      event.stopPropagation();
      if (!message) {
        return;
      }
      try {
        await regenerate(message.id);
        dispatch(assistantApi.util.invalidateTags(['Conversation']));
      } catch (error) {
        toast.error(error?.message || 'Failed to regenerate the response');
      }
    },
    [dispatch, message, regenerate],
  );

  const handleDelete = useCallback(
    async (event) => {
      event.stopPropagation();
      if (!message || !activeConversationId) {
        return;
      }
      const { anchorId, anchorIndex } = resolveAnchor(messages, message.id);
      const dropStart = anchorIndex === -1 ? messages.findIndex((item) => item.id === message.id) : anchorIndex + 1;
      if (dropStart === -1) {
        return;
      }
      try {
        await deleteMessage({ conversationId: activeConversationId, messageId: anchorId }).unwrap();
      } catch (error) {
        toast.error(error.data?.message || 'Failed to delete the response');
        return;
      }
      for (const id of messages.slice(dropStart).map((item) => item.id)) {
        store.removeMessage(id);
      }
      toast.success('Response deleted');
    },
    [activeConversationId, deleteMessage, messages, message, store],
  );

  const extraActions =
    message?.role === 'assistant' && resolveAnchor(messages, message.id).anchorIndex !== -1
      ? [
          {
            id: 'regenerate',
            label: 'Regenerate response',
            icon: <Refresh fontSize="small" />,
            disabled,
            onClick: handleRegenerate,
          },
          {
            id: 'delete',
            label: 'Delete response',
            icon: <Delete fontSize="small" />,
            disabled,
            onClick: handleDelete,
          },
        ]
      : [];

  return <ChatMessageActions {...rest} message={message} extraActions={extraActions} />;
}

AssistantMessageActions.displayName = 'AssistantMessageActions';

export default AssistantMessageActions;