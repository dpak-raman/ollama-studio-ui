import { NextResponse } from 'next/server';
import { ollamaChat } from '@/lib/ollama/client';
import type { ApiResponse, OllamaChatResponse } from '@/types';
import { z } from 'zod';

const ChatProxySchema = z.object({
  model: z.string().min(1),
  messages: z.array(z.object({ role: z.string(), content: z.string() })),
  options: z
    .object({
      temperature: z.number().optional(),
      top_p: z.number().optional(),
      top_k: z.number().optional(),
      num_ctx: z.number().optional(),
    })
    .optional(),
  baseUrl: z.string().url().optional().default('http://localhost:11434'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ChatProxySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: parsed.error.message, success: false },
        { status: 400 },
      );
    }
    const { model, messages, options, baseUrl } = parsed.data;
    const result = await ollamaChat(baseUrl, { model, messages, stream: false, options });
    return NextResponse.json<ApiResponse<OllamaChatResponse>>({
      data: result,
      error: null,
      success: true,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Chat failed';
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: message, success: false },
      { status: 500 },
    );
  }
}
