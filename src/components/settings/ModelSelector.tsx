'use client';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress, Alert } from '@mui/material';
import { useOllamaModels } from '@/hooks/useOllamaModels';
import { useSettingsStore } from '@/store';

export function ModelSelector() {
  const { data: models, isLoading, isError } = useOllamaModels();
  const model = useSettingsStore((s) => s.model);
  const setModel = useSettingsStore((s) => s.setModel);

  if (isLoading) return <CircularProgress size={20} />;
  if (isError)
    return (
      <Alert severity="warning" sx={{ mb: 1 }}>
        Cannot reach Ollama. Check the Base URL.
      </Alert>
    );

  return (
    <FormControl fullWidth size="small">
      <InputLabel>Model</InputLabel>
      <Select value={model} label="Model" onChange={(e) => setModel(e.target.value)}>
        {(models ?? []).map((m) => (
          <MenuItem key={m.name} value={m.name}>
            {m.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
