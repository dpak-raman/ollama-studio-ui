'use client';
import { IconButton, Tooltip } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme } from '@/hooks';

export function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton onClick={toggle} color="inherit" aria-label="toggle theme">
        {isDark ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Tooltip>
  );
}
