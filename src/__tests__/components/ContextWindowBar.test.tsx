import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContextWindowBar } from '@/components/shared/ContextWindowBar';
import type { Message } from '@/types';

vi.mock('@/store', () => ({
  useSettingsStore: (selector: (s: { numCtx: number }) => unknown) =>
    selector({ numCtx: 2048 }),
}));

const makeMessages = (contents: string[]): Message[] =>
  contents.map((content, i) => ({
    _id: String(i),
    conversationId: 'c1',
    role: 'user' as const,
    content,
    createdAt: new Date().toISOString(),
  }));

describe('ContextWindowBar', () => {
  it('displays percentage', () => {
    render(<ContextWindowBar messages={makeMessages(['hello world'])} />);
    expect(screen.getByText(/\d+%/)).toBeInTheDocument();
  });

  it('shows 0% for empty messages', () => {
    render(<ContextWindowBar messages={[]} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('does not exceed 100%', () => {
    const huge = makeMessages([Array(10000).fill('a').join('')]);
    render(<ContextWindowBar messages={huge} />);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });
});
