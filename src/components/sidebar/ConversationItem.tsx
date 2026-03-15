'use client';
import { useState } from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import { Delete, Edit, Check, Close } from '@mui/icons-material';
import { formatDate } from '@/lib/utils';
import type { Conversation } from '@/types';

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => void;
}

export function ConversationItem({
  conversation,
  isActive,
  onSelect,
  onDelete,
  onRename,
}: ConversationItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(conversation.title);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleRenameSubmit = () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== conversation.title) {
      onRename(conversation._id, trimmed);
    }
    setIsEditing(false);
  };

  const handleRenameCancel = () => {
    setEditValue(conversation.title);
    setIsEditing(false);
  };

  const handleDeleteConfirm = () => {
    onDelete(conversation._id);
    setConfirmDelete(false);
  };

  if (isEditing) {
    return (
      <ListItem
        disablePadding
        secondaryAction={
          <Box>
            <IconButton size="small" onClick={handleRenameSubmit} aria-label="confirm rename">
              <Check fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={handleRenameCancel} aria-label="cancel rename">
              <Close fontSize="small" />
            </IconButton>
          </Box>
        }
      >
        <TextField
          fullWidth
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRenameSubmit();
            if (e.key === 'Escape') handleRenameCancel();
          }}
          size="small"
          autoFocus
          sx={{ mx: 1 }}
          aria-label="rename conversation"
        />
      </ListItem>
    );
  }

  return (
    <>
      <ListItem
        disablePadding
        secondaryAction={
          <Box sx={{ display: 'flex' }}>
            <IconButton size="small" onClick={() => setIsEditing(true)} aria-label="rename">
              <Edit fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => setConfirmDelete(true)} aria-label="delete">
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        }
      >
        <ListItemButton
          selected={isActive}
          onClick={() => onSelect(conversation._id)}
          sx={{ borderRadius: 1, pr: 10 }}
        >
          <ListItemText
            primary={conversation.title}
            secondary={formatDate(conversation.updatedAt)}
            primaryTypographyProps={{ noWrap: true, variant: 'body2' }}
            secondaryTypographyProps={{ variant: 'caption' }}
          />
        </ListItemButton>
      </ListItem>

      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Delete Conversation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete &ldquo;{conversation.title}&rdquo;? This cannot be
          undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
