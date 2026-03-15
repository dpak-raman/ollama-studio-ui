'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';

type ThemeContextType = {
  isDark: boolean;
  toggle: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({ isDark: false, toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

function getInitialTheme(): boolean {
  const saved = localStorage.getItem('THEME');
  if (saved) return saved === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsDark(getInitialTheme());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('THEME', isDark ? 'dark' : 'light');
  }, [isDark, mounted]);

  const toggle = () => setIsDark((prev) => !prev);

  const mode = mounted ? (isDark ? 'dark' : 'light') : 'light';

  const muiTheme = createTheme({
    palette: {
      mode,
      primary: { main: '#6366f1' },
      secondary: { main: '#8b5cf6' },
      background: {
        default: isDark ? '#0f0f0f' : '#f9fafb',
        paper: isDark ? '#1a1a1a' : '#ffffff',
      },
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: 'var(--font-geist-sans, Inter, sans-serif)',
    },
  });

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 30_000, retry: 1 },
        },
      }),
  );

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}
