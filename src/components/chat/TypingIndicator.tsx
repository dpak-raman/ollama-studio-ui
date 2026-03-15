'use client';
import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

const bounce = keyframes`
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-6px); }
`;

export function TypingIndicator() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        p: 1.5,
        borderRadius: 2,
        bgcolor: 'background.paper',
        width: 'fit-content',
        border: '1px solid',
        borderColor: 'divider',
      }}
      aria-label="Assistant is typing"
    >
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            animation: `${bounce} 1.4s ease infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </Box>
  );
}
