import { NextResponse } from 'next/server';
import { fetchOllamaModels } from '@/lib/ollama/client';
import { OllamaModelsResponseSchema } from '@/lib/validators';
import type { ApiResponse, OllamaModel } from '@/types';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const baseUrl =
      searchParams.get('baseUrl') || process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    const raw = await fetchOllamaModels(baseUrl);
    const parsed = OllamaModelsResponseSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: 'Invalid response from Ollama', success: false },
        { status: 502 },
      );
    }
    return NextResponse.json<ApiResponse<OllamaModel[]>>({
      data: parsed.data.models,
      error: null,
      success: true,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to reach Ollama';
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: message, success: false },
      { status: 503 },
    );
  }
}
