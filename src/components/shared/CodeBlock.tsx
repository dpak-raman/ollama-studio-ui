'use client';
import { Box } from '@mui/material';
import { CopyButton } from './CopyButton';

interface CodeBlockProps {
  children: string;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        '&:hover .copy-btn': { opacity: 1 },
        '.copy-btn': { opacity: 0, transition: 'opacity 0.2s' },
      }}
    >
      <Box
        className={className}
        component="code"
        sx={{
          display: 'block',
          overflowX: 'auto',
          fontSize: '0.875rem',
          lineHeight: 1.7,
        }}
      >
        {children}
      </Box>
      <Box className="copy-btn" sx={{ position: 'absolute', top: 4, right: 4 }}>
        <CopyButton text={children} />
      </Box>
    </Box>
  );
}
