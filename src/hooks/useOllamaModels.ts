import { useQuery } from '@tanstack/react-query';
import { useSettingsStore } from '@/store';
import type { ApiResponse, OllamaModel } from '@/types';

async function fetchModels(baseUrl: string): Promise<OllamaModel[]> {
  const res = await fetch(`/api/ollama/models?baseUrl=${encodeURIComponent(baseUrl)}`);
  const json: ApiResponse<OllamaModel[]> = await res.json();
  if (!json.success) throw new Error(json.error ?? 'Failed to fetch models');
  return json.data ?? [];
}

export function useOllamaModels() {
  const baseUrl = useSettingsStore((s) => s.baseUrl);
  return useQuery({
    queryKey: ['ollamaModels', baseUrl],
    queryFn: () => fetchModels(baseUrl),
    staleTime: 60_000,
    retry: false,
  });
}
