import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

const mockToggle = vi.fn();
vi.mock('@/hooks', () => ({
  useTheme: () => ({ isDark: false, toggle: mockToggle }),
}));

describe('ThemeToggle', () => {
  it('renders toggle button', () => {
    render(<ThemeToggle />);
    expect(screen.getByLabelText('toggle theme')).toBeInTheDocument();
  });

  it('calls toggle when clicked', async () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByLabelText('toggle theme'));
    expect(mockToggle).toHaveBeenCalled();
  });
});
