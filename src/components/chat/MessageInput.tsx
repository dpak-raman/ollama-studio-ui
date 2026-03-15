'use client';
import { useState, useRef, KeyboardEvent } from 'react';
import { Box, TextField, IconButton, Tooltip } from '@mui/material';
import { Send } from '@mui/icons-material';

interface MessageInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function MessageInput({
  onSend,
  disabled = false,
  placeholder = 'Message...',
}: MessageInputProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 1,
        p: 2,
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <TextField
        inputRef={inputRef}
        fullWidth
        multiline
        maxRows={8}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        variant="outlined"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
          },
        }}
        inputProps={{ 'aria-label': 'message input' }}
      />
      <Tooltip title="Send (Enter)">
        <span>
          <IconButton
            onClick={handleSend}
            disabled={disabled || !value.trim()}
            color="primary"
            aria-label="send message"
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' },
              '&.Mui-disabled': { bgcolor: 'action.disabledBackground' },
              mb: 0.25,
            }}
          >
            <Send />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
}
