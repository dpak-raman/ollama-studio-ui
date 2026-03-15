import { describe, it, expect } from 'vitest';
import { estimateTokens, estimateTotalTokens } from '@/lib/utils';

describe('estimateTokens', () => {
  it('estimates 1 token per 4 chars', () => {
    expect(estimateTokens('test')).toBe(1);
    expect(estimateTokens('hello world!')).toBe(3);
  });

  it('rounds up partial tokens', () => {
    expect(estimateTokens('abc')).toBe(1);
    expect(estimateTokens('abcde')).toBe(2);
  });

  it('returns 0 for empty string', () => {
    expect(estimateTokens('')).toBe(0);
  });
});

describe('estimateTotalTokens', () => {
  it('sums tokens across messages', () => {
    const msgs = [{ content: 'hello' }, { content: 'world' }];
    expect(estimateTotalTokens(msgs)).toBe(
      estimateTokens('hello') + estimateTokens('world'),
    );
  });

  it('returns 0 for empty array', () => {
    expect(estimateTotalTokens([])).toBe(0);
  });
});
