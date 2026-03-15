import { create } from 'zustand';

interface ChatState {
  activeConversationId: string | null;
  pendingMessage: boolean;
  setActiveConversation: (id: string | null) => void;
  setPendingMessage: (pending: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  activeConversationId: null,
  pendingMessage: false,
  setActiveConversation: (id) => set({ activeConversationId: id }),
  setPendingMessage: (pending) => set({ pendingMessage: pending }),
}));
