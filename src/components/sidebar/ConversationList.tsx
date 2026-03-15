'use client';
import { List, Typography, Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ConversationItem } from './ConversationItem';
import {
  useConversations,
  useDeleteConversation,
  useRenameConversation,
} from '@/hooks/useConversations';
import { useChatStore } from '@/store';

export function ConversationList() {
  const router = useRouter();
  const { data: conversations, isLoading, isError } = useConversations();
  const activeConversationId = useChatStore((s) => s.activeConversationId);
  const setActiveConversation = useChatStore((s) => s.setActiveConversation);
  const deleteMutation = useDeleteConversation();
  const renameMutation = useRenameConversation();

  const handleSelect = (id: string) => {
    setActiveConversation(id);
    router.push(`/chat/${id}`);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        if (activeConversationId === id) {
          setActiveConversation(null);
          router.push('/chat/new');
        }
      },
    });
  };

  const handleRename = (id: string, title: string) => {
    renameMutation.mutate({ id, title });
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography variant="caption" color="error" sx={{ p: 2, display: 'block' }}>
        Failed to load conversations
      </Typography>
    );
  }

  if (!conversations?.length) {
    return (
      <Typography variant="caption" color="text.secondary" sx={{ p: 2, display: 'block' }}>
        No conversations yet
      </Typography>
    );
  }

  return (
    <List dense disablePadding>
      {conversations.map((conv) => (
        <ConversationItem
          key={conv._id}
          conversation={conv}
          isActive={conv._id === activeConversationId}
          onSelect={handleSelect}
          onDelete={handleDelete}
          onRename={handleRename}
        />
      ))}
    </List>
  );
}
