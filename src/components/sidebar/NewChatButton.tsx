'use client';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useChatStore } from '@/store';

export function NewChatButton() {
  const router = useRouter();
  const setActiveConversation = useChatStore((s) => s.setActiveConversation);

  const handleNew = () => {
    setActiveConversation(null);
    router.push('/chat/new');
  };

  return (
    <Button
      fullWidth
      variant="outlined"
      startIcon={<Add />}
      onClick={handleNew}
      sx={{ borderRadius: 2, textTransform: 'none', mb: 1 }}
    >
      New Chat
    </Button>
  );
}
