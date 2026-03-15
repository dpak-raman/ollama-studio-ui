'use client';
import { Box, Slider, Typography } from '@mui/material';
import { useSettingsStore } from '@/store';

interface SliderFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  description?: string;
}

function SliderField({ label, value, min, max, step, onChange, description }: SliderFieldProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" fontWeight={500}>
          {label}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {value}
        </Typography>
      </Box>
      {description && (
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5 }}>
          {description}
        </Typography>
      )}
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(_, v) => onChange(v as number)}
        aria-label={label}
        size="small"
        marks={[
          { value: min, label: String(min) },
          { value: max, label: String(max) },
        ]}
      />
    </Box>
  );
}

export function ParameterSliders() {
  const { temperature, topP, topK, numCtx, setTemperature, setTopP, setTopK, setNumCtx } =
    useSettingsStore();

  return (
    <Box>
      <SliderField
        label="Temperature"
        value={temperature}
        min={0}
        max={2}
        step={0.1}
        onChange={setTemperature}
        description="Controls randomness. Lower = more focused."
      />
      <SliderField
        label="Top P"
        value={topP}
        min={0}
        max={1}
        step={0.05}
        onChange={setTopP}
        description="Nucleus sampling threshold."
      />
      <SliderField
        label="Top K"
        value={topK}
        min={1}
        max={100}
        step={1}
        onChange={setTopK}
        description="Limits vocabulary to top K tokens."
      />
      <SliderField
        label="Context Window (tokens)"
        value={numCtx}
        min={512}
        max={8192}
        step={512}
        onChange={setNumCtx}
        description="Maximum context length."
      />
    </Box>
  );
}
