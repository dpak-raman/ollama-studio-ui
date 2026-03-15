import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Conversation } from '@/types';
import type { ApiResponse } from '@/types';

async function fetchConversations(): Promise<Conversation[]> {
  const res = await fetch('/api/conversations');
  const json: ApiResponse<Conversation[]> = await res.json();
  if (!json.success) throw new Error(json.error ?? 'Failed to fetch conversations');
  return json.data ?? [];
}

async function createConversation(title?: string): Promise<Conversation> {
  const res = await fetch('/api/conversations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  const json: ApiResponse<Conversation> = await res.json();
  if (!json.success) throw new Error(json.error ?? 'Failed to create conversation');
  return json.data!;
}

async function deleteConversation(id: string): Promise<void> {
  const res = await fetch(`/api/conversations/${id}`, { method: 'DELETE' });
  const json: ApiResponse<unknown> = await res.json();
  if (!json.success) throw new Error(json.error ?? 'Failed to delete conversation');
}

async function renameConversation({
  id,
  title,
}: {
  id: string;
  title: string;
}): Promise<Conversation> {
  const res = await fetch(`/api/conversations/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  const json: ApiResponse<Conversation> = await res.json();
  if (!json.success) throw new Error(json.error ?? 'Failed to rename conversation');
  return json.data!;
}

export function useConversations() {
  return useQuery({ queryKey: ['conversations'], queryFn: fetchConversations });
}

export function useCreateConversation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createConversation,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['conversations'] }),
  });
}

export function useDeleteConversation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteConversation,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['conversations'] }),
  });
}

export function useRenameConversation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: renameConversation,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['conversations'] }),
  });
}
