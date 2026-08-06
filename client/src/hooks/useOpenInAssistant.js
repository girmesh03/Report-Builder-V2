/**
 * @module hooks/useOpenInAssistant
 */

import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { useCreateConversationMutation } from '../redux/features/assistantApi.js';

/**
 * Opens a report in the Assistant chat (`docs/initial-doc.md` §3.5.2/§3.6):
 * find-or-create the report's ChatConversation via `POST
 * /api/v1/assistant/conversations` `{ reportId }`, then navigate to the deep
 * link `/assistant?conversation=<id>`. The Assistant page validates the id
 * against the conversation list and falls back to the rail on a stale link.
 *
 * @returns {{ openInAssistant: (reportId: string) => Promise<void>, isOpening: boolean }} The action and its busy flag.
 */
export function useOpenInAssistant() {
  const navigate = useNavigate();
  const [createConversation, { isLoading: isOpening }] = useCreateConversationMutation();

  const openInAssistant = useCallback(
    async (reportId) => {
      try {
        const conversation = await createConversation(reportId).unwrap();
        const { _id: conversationId, created } = conversation;
        if (created) {
          toast.success('Assistant conversation started');
        }
        navigate(`/assistant?conversation=${conversationId}`);
      } catch (error) {
        toast.error(error.data?.message || 'Failed to open the assistant');
      }
    },
    [createConversation, navigate],
  );

  return { openInAssistant, isOpening };
}