'use client';
import { Box, LinearProgress, Typography, Tooltip } from '@mui/material';
import { useSettingsStore } from '@/store';
import { estimateTotalTokens } from '@/lib/utils';
import type { Message } from '@/types';

interface ContextWindowBarProps {
  messages: Message[];
}

export function ContextWindowBar({ messages }: ContextWindowBarProps) {
  const numCtx = useSettingsStore((s) => s.numCtx);
  const used = estimateTotalTokens(messages);
  const pct = Math.min((used / numCtx) * 100, 100);

  const color = pct < 60 ? 'success' : pct < 85 ? 'warning' : 'error';

  return (
    <Tooltip title={`~${used} / ${numCtx} tokens used`}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 140 }}>
        <LinearProgress
          variant="determinate"
          value={pct}
          color={color}
          sx={{ flex: 1, height: 6, borderRadius: 3 }}
          aria-label="context window usage"
        />
        <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
          {Math.round(pct)}%
        </Typography>
      </Box>
    </Tooltip>
  );
}
