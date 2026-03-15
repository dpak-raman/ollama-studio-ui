import type { OllamaChatRequest, OllamaChatResponse, OllamaModelsResponse } from '@/types';

export async function fetchOllamaModels(baseUrl: string): Promise<OllamaModelsResponse> {
  const res = await fetch(`${baseUrl}/api/tags`);
  if (!res.ok) throw new Error(`Ollama unreachable: ${res.status}`);
  return res.json() as Promise<OllamaModelsResponse>;
}

export async function ollamaChat(
  baseUrl: string,
  payload: OllamaChatRequest,
): Promise<OllamaChatResponse> {
  const res = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, stream: false }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Ollama chat failed: ${res.status} ${text}`);
  }
  return res.json() as Promise<OllamaChatResponse>;
}
