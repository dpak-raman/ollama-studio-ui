import { describe, it, expect } from 'vitest';
import { formatDate } from '@/lib/utils';

describe('formatDate', () => {
  it('returns relative time for today', () => {
    const now = new Date();
    const result = formatDate(now.toISOString());
    expect(result).toMatch(/ago|less than|minute|second|hour/i);
  });

  it('returns "Yesterday" for yesterday', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const result = formatDate(yesterday.toISOString());
    expect(result).toMatch(/Yesterday/);
  });

  it('returns formatted date for older dates', () => {
    const old = new Date('2024-01-15T10:00:00Z');
    const result = formatDate(old.toISOString());
    expect(result).toBe('Jan 15, 2024');
  });

  it('accepts a Date object', () => {
    const d = new Date('2024-06-01T00:00:00Z');
    const result = formatDate(d);
    expect(result).toBe('Jun 1, 2024');
  });
});
