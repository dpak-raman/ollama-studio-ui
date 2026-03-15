'use client';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { Typography, Box } from '@mui/material';
import { CodeBlock } from './CodeBlock';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeHighlight]}
      components={{
        p: ({ children }) => (
          <Typography variant="body2" component="p" sx={{ mb: 1, lineHeight: 1.7 }}>
            {children}
          </Typography>
        ),
        code: ({ className, children, ...props }) => {
          const isBlock = className?.startsWith('language-');
          const text = String(children).replace(/\n$/, '');
          if (isBlock) {
            return <CodeBlock className={className}>{text}</CodeBlock>;
          }
          return (
            <Box
              component="code"
              sx={{
                fontFamily: 'monospace',
                fontSize: '0.85em',
                bgcolor: 'action.hover',
                px: 0.5,
                py: 0.25,
                borderRadius: 0.5,
              }}
            >
              {children}
            </Box>
          );
        },
        pre: ({ children }) => (
          <Typography
            component="pre"
            sx={{
              bgcolor: 'grey.900',
              borderRadius: 1,
              p: 2,
              overflowX: 'auto',
              my: 1,
              position: 'relative',
            }}
          >
            {children}
          </Typography>
        ),
        ul: ({ children }) => (
          <Typography component="ul" sx={{ pl: 2, mb: 1 }}>
            {children}
          </Typography>
        ),
        ol: ({ children }) => (
          <Typography component="ol" sx={{ pl: 2, mb: 1 }}>
            {children}
          </Typography>
        ),
        li: ({ children }) => (
          <Typography component="li" variant="body2" sx={{ mb: 0.5 }}>
            {children}
          </Typography>
        ),
        h1: ({ children }) => (
          <Typography variant="h5" sx={{ mt: 2, mb: 1, fontWeight: 700 }}>
            {children}
          </Typography>
        ),
        h2: ({ children }) => (
          <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: 700 }}>
            {children}
          </Typography>
        ),
        h3: ({ children }) => (
          <Typography variant="subtitle1" sx={{ mt: 1.5, mb: 0.5, fontWeight: 700 }}>
            {children}
          </Typography>
        ),
        blockquote: ({ children }) => (
          <Typography
            component="blockquote"
            sx={{
              borderLeft: 4,
              borderColor: 'primary.main',
              pl: 2,
              ml: 0,
              my: 1,
              color: 'text.secondary',
            }}
          >
            {children}
          </Typography>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
