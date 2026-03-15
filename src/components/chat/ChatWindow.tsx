'use client';
import { useEffect, useRef, useState } from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { TypingIndicator } from './TypingIndicator';
import { useChat } from '@/hooks/useChat';
import { useCreateConversation } from '@/hooks/useConversations';
import { useChatStore } from '@/store';
import { useSettingsStore } from '@/store';

export function ChatWindow() {
  const router = useRouter();
  const activeConversationId = useChatStore((s) => s.activeConversationId);
  const model = useSettingsStore((s) => s.model);
  const { messages, isLoading, isError, pendingMessage, sendMessage, isSending } = useChat();
  const createConversation = useCreateConversation();
  const bottomRef = useRef<HTMLDivElement>(null);
  const [sendError, setSendError] = useState<string | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, pendingMessage]);

  const handleSend = async (content: string) => {
    setSendError(null);
    try {
      let convId = activeConversationId;
      if (!convId) {
        const newConv = await createConversation.mutateAsync(content.slice(0, 60));
        convId = newConv._id;
        router.push(`/chat/${convId}`);
      }
      await sendMessage(content, convId);
    } catch (e) {
      setSendError(e instanceof Error ? e.message : 'Failed to send message');
    }
  };

  if (!model) {
    return (
      <Box
        sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}
      >
        <Typography color="text.secondary" align="center">
          Open Settings and select an Ollama model to start chatting.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Box sx={{ flex: 1, overflowY: 'auto', px: 2, py: 3 }}>
        {isLoading && (
          <Typography color="text.secondary" align="center">
            Loading messages...
          </Typography>
        )}
        {isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to load messages.
          </Alert>
        )}
        {!isLoading && messages.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '60%',
            }}
          >
            <Typography variant="h6" color="text.secondary" align="center">
              Start a new conversation
            </Typography>
          </Box>
        )}
        {messages.map((msg) => (
          <MessageBubble key={msg._id} message={msg} />
        ))}
        {(isSending || pendingMessage) && (
          <Box sx={{ display: 'flex', pl: 6, mb: 2 }}>
            <TypingIndicator />
          </Box>
        )}
        {sendError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {sendError}
          </Alert>
        )}
        <div ref={bottomRef} />
      </Box>
      <MessageInput
        onSend={handleSend}
        disabled={isSending || pendingMessage}
        placeholder={`Message ${model}...`}
      />
    </Box>
  );
}
