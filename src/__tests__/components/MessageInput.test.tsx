import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MessageInput } from '@/components/chat/MessageInput';

describe('MessageInput', () => {
  it('calls onSend with input value on Enter', async () => {
    const onSend = vi.fn();
    render(<MessageInput onSend={onSend} />);
    const input = screen.getByLabelText('message input');
    await userEvent.type(input, 'Hello{Enter}');
    expect(onSend).toHaveBeenCalledWith('Hello');
  });

  it('does not send on Shift+Enter, adds newline instead', async () => {
    const onSend = vi.fn();
    render(<MessageInput onSend={onSend} />);
    const input = screen.getByLabelText('message input');
    await userEvent.type(input, 'Line 1{Shift>}{Enter}{/Shift}');
    expect(onSend).not.toHaveBeenCalled();
  });

  it('disables input and button when disabled=true', () => {
    render(<MessageInput onSend={vi.fn()} disabled />);
    expect(screen.getByLabelText('message input')).toBeDisabled();
    expect(screen.getByLabelText('send message')).toBeDisabled();
  });

  it('clears input after send', async () => {
    render(<MessageInput onSend={vi.fn()} />);
    const input = screen.getByLabelText('message input');
    await userEvent.type(input, 'test message{Enter}');
    expect(input).toHaveValue('');
  });
});
