'use client';
import { Box, Avatar, Typography } from '@mui/material';
import { Person, SmartToy } from '@mui/icons-material';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';
import { CopyButton } from '@/components/shared/CopyButton';
import { formatDate } from '@/lib/utils';
import type { Message } from '@/types';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        gap: 1.5,
        mb: 2,
        px: 1,
      }}
    >
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: isUser ? 'primary.main' : 'secondary.main',
          flexShrink: 0,
        }}
      >
        {isUser ? <Person fontSize="small" /> : <SmartToy fontSize="small" />}
      </Avatar>

      <Box
        sx={{
          maxWidth: '75%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isUser ? 'flex-end' : 'flex-start',
        }}
      >
        <Box
          sx={{
            bgcolor: isUser ? 'primary.main' : 'background.paper',
            color: isUser ? 'primary.contrastText' : 'text.primary',
            borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
            px: 2,
            py: 1.5,
            border: isUser ? 'none' : '1px solid',
            borderColor: 'divider',
            position: 'relative',
            '&:hover .msg-copy': { opacity: 1 },
            '.msg-copy': { opacity: 0, transition: 'opacity 0.2s' },
          }}
        >
          {isUser ? (
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
              {message.content}
            </Typography>
          ) : (
            <MarkdownRenderer content={message.content} />
          )}
          <Box
            className="msg-copy"
            sx={{
              position: 'absolute',
              top: 2,
              right: isUser ? 'auto' : 2,
              left: isUser ? 2 : 'auto',
            }}
          >
            <CopyButton text={message.content} />
          </Box>
        </Box>
        <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, px: 0.5 }}>
          {formatDate(message.createdAt)}
        </Typography>
      </Box>
    </Box>
  );
}
