'use client';
import { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useUIStore, useSettingsStore } from '@/store';
import { ModelSelector } from './ModelSelector';
import { ParameterSliders } from './ParameterSliders';
import { SystemPromptEditor } from './SystemPromptEditor';
import type { ApiResponse, OllamaModel } from '@/types';

export function SettingsDrawer() {
  const { settingsDrawerOpen, setSettingsDrawerOpen } = useUIStore();
  const { baseUrl, setBaseUrl, streamEnabled, setStreamEnabled } = useSettingsStore();
  const [testStatus, setTestStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');

  const handleTestConnection = async () => {
    setTestStatus('loading');
    try {
      const res = await fetch(`/api/ollama/models?baseUrl=${encodeURIComponent(baseUrl)}`);
      const json: ApiResponse<OllamaModel[]> = await res.json();
      if (json.success) {
        setTestStatus('ok');
        setTestMessage(`Connected — ${json.data?.length ?? 0} model(s) found`);
      } else {
        setTestStatus('error');
        setTestMessage(json.error ?? 'Connection failed');
      }
    } catch {
      setTestStatus('error');
      setTestMessage('Cannot reach Ollama');
    }
  };

  return (
    <Drawer
      anchor="right"
      open={settingsDrawerOpen}
      onClose={() => setSettingsDrawerOpen(false)}
      PaperProps={{ sx: { width: 360 } }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Settings
        </Typography>
        <IconButton onClick={() => setSettingsDrawerOpen(false)} aria-label="close settings">
          <Close />
        </IconButton>
      </Box>
      <Divider />

      <Box
        sx={{
          p: 2,
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* Base URL */}
        <Box>
          <Typography variant="body2" fontWeight={500} gutterBottom>
            Ollama Base URL
          </Typography>
          <TextField
            fullWidth
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            size="small"
            placeholder="http://localhost:11434"
            inputProps={{ 'aria-label': 'ollama base url' }}
          />
          <Button
            variant="outlined"
            size="small"
            onClick={handleTestConnection}
            disabled={testStatus === 'loading'}
            sx={{ mt: 1, textTransform: 'none' }}
            startIcon={testStatus === 'loading' ? <CircularProgress size={14} /> : undefined}
          >
            Test Connection
          </Button>
          {testStatus === 'ok' && (
            <Alert severity="success" sx={{ mt: 1 }}>
              {testMessage}
            </Alert>
          )}
          {testStatus === 'error' && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {testMessage}
            </Alert>
          )}
        </Box>

        <Divider />

        {/* Model */}
        <Box>
          <Typography variant="body2" fontWeight={500} gutterBottom>
            Model
          </Typography>
          <ModelSelector />
        </Box>

        <Divider />

        {/* Parameters */}
        <Box>
          <Typography variant="body2" fontWeight={500} gutterBottom>
            Generation Parameters
          </Typography>
          <ParameterSliders />
        </Box>

        <Divider />

        {/* System Prompt */}
        <SystemPromptEditor />

        <Divider />

        {/* Stream toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={streamEnabled}
              onChange={(e) => setStreamEnabled(e.target.checked)}
              aria-label="stream toggle"
            />
          }
          label={
            <Box>
              <Typography variant="body2" fontWeight={500}>
                Streaming
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Currently wired for polling. Toggle ready for SSE upgrade.
              </Typography>
            </Box>
          }
        />
      </Box>
    </Drawer>
  );
}
