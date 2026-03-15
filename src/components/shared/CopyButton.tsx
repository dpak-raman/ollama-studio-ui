'use client';
import { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { ContentCopy, Check } from '@mui/icons-material';

interface CopyButtonProps {
  text: string;
  size?: 'small' | 'medium';
}

export function CopyButton({ text, size = 'small' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tooltip title={copied ? 'Copied!' : 'Copy'}>
      <IconButton onClick={handleCopy} size={size} aria-label="copy">
        {copied ? <Check fontSize="small" color="success" /> : <ContentCopy fontSize="small" />}
      </IconButton>
    </Tooltip>
  );
}
