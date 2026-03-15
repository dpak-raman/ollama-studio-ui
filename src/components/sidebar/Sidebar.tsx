'use client';
import { Box, Typography, Divider } from '@mui/material';
import { NewChatButton } from './NewChatButton';
import { ConversationList } from './ConversationList';

export function Sidebar() {
  return (
    <Box
      sx={{
        width: 260,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        p: 1.5,
      }}
    >
      <Typography variant="h6" sx={{ px: 1, pb: 1.5, fontWeight: 700 }}>
        Ollama Studio
      </Typography>
      <NewChatButton />
      <Divider sx={{ mb: 1 }} />
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <ConversationList />
      </Box>
    </Box>
  );
}
