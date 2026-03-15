'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { useChatStore } from '@/store';

export default function ChatPage() {
  const params = useParams<{ id: string }>();
  const setActiveConversation = useChatStore((s) => s.setActiveConversation);

  useEffect(() => {
    if (params.id && params.id !== 'new') {
      setActiveConversation(params.id);
    } else {
      setActiveConversation(null);
    }
  }, [params.id, setActiveConversation]);

  return <AppShell />;
}
