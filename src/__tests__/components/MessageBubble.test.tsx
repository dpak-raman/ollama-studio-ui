import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MessageBubble } from '@/components/chat/MessageBubble';
import type { Message } from '@/types';


const userMessage: Message = {
  _id: '1',
  conversationId: 'conv1',
  role: 'user',
  content: 'Hello there!',
  createdAt: new Date().toISOString(),
};

const assistantMessage: Message = {
  _id: '2',
  conversationId: 'conv1',
  role: 'assistant',
  content: '**Bold** and `code` response',
  createdAt: new Date().toISOString(),
};

describe('MessageBubble', () => {
  it('renders user message content', () => {
    render(<MessageBubble message={userMessage} />);
    expect(screen.getByText('Hello there!')).toBeInTheDocument();
  });

  it('renders assistant message with markdown', () => {
    render(<MessageBubble message={assistantMessage} />);
    expect(screen.getByText('Bold')).toBeInTheDocument();
  });

  it('shows copy button on hover area', () => {
    render(<MessageBubble message={userMessage} />);
    expect(screen.getByLabelText('copy')).toBeInTheDocument();
  });
});
