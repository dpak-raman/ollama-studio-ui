'use client';
import { AppBar, Toolbar, Typography, IconButton, Box, Tooltip } from '@mui/material';
import { Menu as MenuIcon, Settings } from '@mui/icons-material';
import { ThemeToggle } from './ThemeToggle';
import { ContextWindowBar } from '@/components/shared/ContextWindowBar';
import { useUIStore, useSettingsStore } from '@/store';
import { useChat } from '@/hooks/useChat';

export function TopBar() {
  const { toggleSidebar, toggleSettingsDrawer } = useUIStore();
  const model = useSettingsStore((s) => s.model);
  const { messages } = useChat();

  return (
    <AppBar position="static" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
      <Toolbar sx={{ gap: 1 }}>
        <IconButton edge="start" color="inherit" onClick={toggleSidebar} aria-label="toggle sidebar">
          <MenuIcon />
        </IconButton>

        <Typography variant="subtitle1" fontWeight={600} sx={{ flexShrink: 0 }}>
          {model || 'No model selected'}
        </Typography>

        <Box sx={{ flex: 1 }} />

        <ContextWindowBar messages={messages} />

        <ThemeToggle />

        <Tooltip title="Settings">
          <IconButton color="inherit" onClick={toggleSettingsDrawer} aria-label="open settings">
            <Settings />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
