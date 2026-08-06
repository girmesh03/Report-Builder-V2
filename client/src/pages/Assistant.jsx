/**
 * @module pages/Assistant
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router';
import { toast } from 'react-toastify';
import { ChatBox } from '@mui/x-chat';
import ArrowBack from '@mui/icons-material/ArrowBack';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import AssistantComposerToolbar from '../components/assistant/AssistantComposerToolbar.jsx';
import AssistantMessageActions from '../components/assistant/AssistantMessageActions.jsx';
import AssistantToolCard from '../components/assistant/AssistantToolCard.jsx';
import ConversationDeleteButton from '../components/assistant/ConversationDeleteButton.jsx';
import ConversationRail from '../components/assistant/ConversationRail.jsx';
import NewChatDialog from '../components/assistant/NewChatDialog.jsx';
import { createAssistantAdapter } from '../components/assistant/chatAdapter.js';
import { useListConversationsQuery, useCreateConversationMutation } from '../redux/features/assistantApi.js';
import { api } from '../redux/features/api.js';
import { setActiveConversationId, setConversations } from '../redux/features/aiConversationSlice.js';
import { selectActiveConversationId, selectConversations, selectConversationsStatus } from '../redux/features/aiConversationSlice.js';
import { API_CONFIG, PROVIDER_ADDIS } from '../utils/constants.js';

/**
 * Assistant page — full-screen chat (`docs/initial-doc.md` §3.5.2, route
 * `/assistant`, AppShell sibling). The app bar carries back navigation plus
 * the title; the conversation rail hosts the "New Chat" button, the compact
 * conversation list with per-item delete, and the session agent selector +
 * stop button in the composer toolbar (user follow-up requests). The rail and
 * active selection are CONTROLLED from `aiConversationSlice` (user decision):
 * deep links (`/assistant?conversation=<id>) select a conversation once the
 * rail finishes loading, stale/invalid ids toast an error and start with no
 * selection, and a sidebar entry (no deep link) always starts free — a new
 * free (report-less) or report-bound conversation is created via the dialog.
 * The `chatAdapter` streams SSE corrections with the built-in
 * `save_transcription` tool approval UI for report-bound chats.
 *
 * @returns {JSX.Element} The assistant page.
 */
function Assistant() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const deepLinkId = searchParams.get('conversation');
  const user = useSelector((state) => state.auth.user);
  const conversations = useSelector(selectConversations);
  const activeConversationId = useSelector(selectActiveConversationId);
  const conversationsStatus = useSelector(selectConversationsStatus);
  const [newChatOpen, setNewChatOpen] = useState(false);
  const [provider, setProvider] = useState(PROVIDER_ADDIS);
  const [reasoning, setReasoning] = useState(false);
  const { error: conversationsError } = useListConversationsQuery();
  const errorMessage = conversationsError?.data?.message || conversationsError?.message;
  const [createConversation] = useCreateConversationMutation();

  // Chat provider entity mapping for the controlled `conversations` prop
  // (slice entries are canonical `{_id, id, title, lastMessageAt}`).
  const chatConversations = useMemo(
    () =>
      conversations.map((conversation) => ({
        id: conversation.id,
        title: conversation.title,
        lastMessageAt: conversation.lastMessageAt,
      })),
    [conversations],
  );

  // Session-wide agent: the adapter is recreated when the provider or
  // reasoning flag changes so every subsequent message carries the selection.
  // Approved `save_transcription` tool calls update Shared data — the
  // `Report` cache is invalidated so `ReportDetails` (open elsewhere) shows
  // the refreshed `reviewed` status/generated text (Report-review corrigenda).
  const adapter = useMemo(
    () =>
      createAssistantAdapter({
        currentUser: user,
        provider,
        reasoning,
        onToolApproved: () => dispatch(api.util.invalidateTags(['Report'])),
      }),
    [user, provider, reasoning, dispatch],
  );

  const syncActiveConversation = useCallback(
    (conversationId) => {
      dispatch(setActiveConversationId(conversationId));
      if (conversationId) {
        setSearchParams({ conversation: conversationId }, { replace: true });
      } else {
        setSearchParams({}, { replace: true });
      }
    },
    [dispatch, setSearchParams],
  );

  // Deep link resolution: select the linked conversation once the rail is
  // loaded; an unknown/expired id toasts and clears the link (no redirect).
  // A sidebar entry always starts without a selection (free-chat start).
  useEffect(() => {
    if (conversationsStatus !== 'succeeded') {
      if (conversationsStatus === 'failed') {
        toast.error(errorMessage || 'Failed to load conversations');
        setSearchParams({}, { replace: true });
      }
      return;
    }
    if (deepLinkId) {
      if (conversations.some((conversation) => conversation._id === deepLinkId)) {
        dispatch(setActiveConversationId(deepLinkId));
      } else {
        toast.error('Conversation not found');
        setSearchParams({}, { replace: true });
      }
      return;
    }
    dispatch(setActiveConversationId(null));
  }, [conversationsStatus, conversations, deepLinkId, dispatch, setSearchParams, errorMessage]);

  // Deleting the active conversation (rail) leaves a stale `?conversation=`
  // link behind — drop it once the selection clears without a deep link.
  useEffect(() => {
    if (!activeConversationId && searchParams.get('conversation')) {
      setSearchParams({}, { replace: true });
    }
  }, [activeConversationId, searchParams, setSearchParams]);

  const handleSelectReport = async (report) => {
    setNewChatOpen(false);
    try {
      const conversation = await createConversation(report._id).unwrap();
      syncActiveConversation(conversation._id);
    } catch (error) {
      toast.error(error.data?.message || 'Failed to start a conversation');
    }
  };

  const handleFreeChat = async () => {
    setNewChatOpen(false);
    try {
      const conversation = await createConversation(null).unwrap();
      syncActiveConversation(conversation._id);
    } catch (error) {
      toast.error(error.data?.message || 'Failed to start a free conversation');
    }
  };

  const handleNewChat = () => setNewChatOpen(true);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar variant="dense" sx={{ gap: 1 }}>
          <IconButton aria-label="Go back" size="small" onClick={() => navigate(-1)} sx={{ flexShrink: 0 }}>
            <ArrowBack fontSize="small" />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            {API_CONFIG.VITE_APP_NAME} Assistant
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, minHeight: 0 }}>
        <ChatBox
          adapter={adapter}
          currentUser={user ? { id: user._id, displayName: user.fullName, role: 'user' } : undefined}
          members={[{ id: 'assistant', displayName: 'Assistant', role: 'assistant' }]}
          conversations={chatConversations}
          activeConversationId={activeConversationId}
          onActiveConversationChange={syncActiveConversation}
          onConversationsChange={(next) => dispatch(setConversations(next))}
          slots={{
            composerToolbar: AssistantComposerToolbar,
            conversationList: ConversationRail,
            actions: AssistantMessageActions,
          }}
          partRenderers={{
            tool: AssistantToolCard,
            'dynamic-tool': AssistantToolCard,
          }}
          slotProps={{
            composerToolbar: { value: provider, onValueChange: setProvider, reasoning, onReasoningChange: setReasoning },
            conversationList: {
              variant: 'compact',
              onNewChat: handleNewChat,
              slots: { itemActions: ConversationDeleteButton },
            },
          }}
          features={{ conversationList: true, attachments: false, scrollToBottom: true, suggestions: true }}
          sx={{ height: '100%' }}
        />
      </Box>
      <NewChatDialog
        open={newChatOpen}
        onClose={() => setNewChatOpen(false)}
        onFreeChat={handleFreeChat}
        onSelect={handleSelectReport}
      />
    </Box>
  );
}

Assistant.displayName = 'Assistant';

export default Assistant;