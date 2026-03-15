import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConversationItem } from '@/components/sidebar/ConversationItem';
import type { Conversation } from '@/types';

const conversation: Conversation = {
  _id: 'c1',
  title: 'Test Chat',
  messageCount: 3,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('ConversationItem', () => {
  it('renders conversation title', () => {
    render(
      <ConversationItem
        conversation={conversation}
        isActive={false}
        onSelect={vi.fn()}
        onDelete={vi.fn()}
        onRename={vi.fn()}
      />,
    );
    expect(screen.getByText('Test Chat')).toBeInTheDocument();
  });

  it('shows rename input when edit button clicked', async () => {
    render(
      <ConversationItem
        conversation={conversation}
        isActive={false}
        onSelect={vi.fn()}
        onDelete={vi.fn()}
        onRename={vi.fn()}
      />,
    );
    await userEvent.click(screen.getByLabelText('rename'));
    expect(screen.getByLabelText('rename conversation')).toBeInTheDocument();
  });

  it('calls onRename when submitting rename', async () => {
    const onRename = vi.fn();
    render(
      <ConversationItem
        conversation={conversation}
        isActive={false}
        onSelect={vi.fn()}
        onDelete={vi.fn()}
        onRename={onRename}
      />,
    );
    await userEvent.click(screen.getByLabelText('rename'));
    // MUI TextField renders an <input> element; find it by its current value
    const input = screen.getByDisplayValue('Test Chat') as HTMLInputElement;
    await userEvent.clear(input);
    await userEvent.type(input, 'New Title');
    await userEvent.click(screen.getByLabelText('confirm rename'));
    expect(onRename).toHaveBeenCalledWith('c1', 'New Title');
  });

  it('shows delete dialog on delete button click', async () => {
    render(
      <ConversationItem
        conversation={conversation}
        isActive={false}
        onSelect={vi.fn()}
        onDelete={vi.fn()}
        onRename={vi.fn()}
      />,
    );
    await userEvent.click(screen.getByLabelText('delete'));
    expect(screen.getByText('Delete Conversation')).toBeInTheDocument();
  });
});
