'use client';
import { Box, TextField, Typography } from '@mui/material';
import { useSettingsStore } from '@/store';

export function SystemPromptEditor() {
  const systemPrompt = useSettingsStore((s) => s.systemPrompt);
  const setSystemPrompt = useSettingsStore((s) => s.setSystemPrompt);
  const MAX = 4000;

  return (
    <Box>
      <Typography variant="body2" fontWeight={500} gutterBottom>
        System Prompt
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={5}
        value={systemPrompt}
        onChange={(e) => setSystemPrompt(e.target.value.slice(0, MAX))}
        placeholder="You are a helpful assistant..."
        variant="outlined"
        size="small"
        inputProps={{ 'aria-label': 'system prompt' }}
      />
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: 0.5, display: 'block', textAlign: 'right' }}
      >
        {systemPrompt.length} / {MAX}
      </Typography>
    </Box>
  );
}
