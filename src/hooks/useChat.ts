import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useChatStore } from '@/store';
import { useSettingsStore } from '@/store';
import type { ApiResponse, Message } from '@/types';

async function fetchMessages(conversationId: string): Promise<Message[]> {
  const res = await fetch(`/api/conversations/${conversationId}/messages`);
  const json: ApiResponse<Message[]> = await res.json();
  if (!json.success) throw new Error(json.error ?? 'Failed to fetch messages');
  return json.data ?? [];
}

interface SendMessagePayload {
  conversationId: string;
  content: string;
  model: string;
  temperature: number;
  topP: number;
  topK: number;
  numCtx: number;
  systemPrompt?: string;
  baseUrl?: string;
}

async function sendMessage(
  payload: SendMessagePayload,
): Promise<{ userMessage: Message; assistantMessage: Message }> {
  const { conversationId, ...body } = payload;
  const res = await fetch(`/api/conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json: ApiResponse<{ userMessage: Message; assistantMessage: Message }> = await res.json();
  if (!json.success) throw new Error(json.error ?? 'Failed to send message');
  return json.data!;
}

export function useMessages(conversationId: string | null) {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => fetchMessages(conversationId!),
    enabled: !!conversationId && conversationId !== 'new',
  });
}

export function useSendMessage() {
  const qc = useQueryClient();
  const setPending = useChatStore((s) => s.setPendingMessage);

  return useMutation({
    mutationFn: sendMessage,
    onMutate: () => setPending(true),
    onSettled: () => setPending(false),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ['messages', variables.conversationId] });
      qc.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
}

export function useChat() {
  const activeConversationId = useChatStore((s) => s.activeConversationId);
  const pendingMessage = useChatStore((s) => s.pendingMessage);
  const settings = useSettingsStore();
  const messages = useMessages(activeConversationId);
  const sendMutation = useSendMessage();

  const sendMessage = (content: string, conversationId: string) => {
    return sendMutation.mutateAsync({
      conversationId,
      content,
      model: settings.model,
      temperature: settings.temperature,
      topP: settings.topP,
      topK: settings.topK,
      numCtx: settings.numCtx,
      systemPrompt: settings.systemPrompt || undefined,
      baseUrl: settings.baseUrl,
    });
  };

  return {
    messages: messages.data ?? [],
    isLoading: messages.isLoading,
    isError: messages.isError,
    pendingMessage,
    sendMessage,
    isSending: sendMutation.isPending,
    sendError: sendMutation.error,
  };
}
