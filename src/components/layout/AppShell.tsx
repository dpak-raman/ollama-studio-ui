'use client';
import { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { TopBar } from './TopBar';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { SettingsDrawer } from '@/components/settings/SettingsDrawer';
import { useUIStore } from '@/store';

export function AppShell() {
  const theme = useTheme();
  const isMdQuery = useMediaQuery(theme.breakpoints.up('md'));
  const [mounted, setMounted] = useState(false);
  const isMd = mounted && isMdQuery;
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      {(sidebarOpen || isMd) && <Sidebar />}

      {/* Main area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar />
        <ChatWindow />
      </Box>

      <SettingsDrawer />
    </Box>
  );
}
