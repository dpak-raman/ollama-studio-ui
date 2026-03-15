import { NextResponse } from 'next/server';
import { connectDB, Conversation, Message } from '@/lib/db';
import { SendMessageSchema } from '@/lib/validators';
import { ollamaChat } from '@/lib/ollama/client';
import { estimateTokens } from '@/lib/utils';
import type { ApiResponse, Message as MessageType } from '@/types';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    await connectDB();
    const messages = await Message.find({ conversationId: id }).sort({ createdAt: 1 });
    const data: MessageType[] = messages.map((m) => ({
      _id: m._id.toString(),
      conversationId: m.conversationId.toString(),
      role: m.role,
      content: m.content,
      tokenCount: m.tokenCount,
      createdAt: m.createdAt.toISOString(),
    }));
    return NextResponse.json<ApiResponse<MessageType[]>>({ data, error: null, success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: message, success: false },
      { status: 500 },
    );
  }
}

export async function POST(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = SendMessageSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: parsed.error.message, success: false },
        { status: 400 },
      );
    }

    await connectDB();

    const conversation = await Conversation.findById(id);
    if (!conversation) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: 'Conversation not found', success: false },
        { status: 404 },
      );
    }

    const { content, model, temperature, topP, topK, numCtx, systemPrompt, baseUrl } = parsed.data;

    // Save user message
    const userMsg = await Message.create({
      conversationId: id,
      role: 'user',
      content,
      tokenCount: estimateTokens(content),
    });

    // Build message history for Ollama
    const history = await Message.find({ conversationId: id }).sort({ createdAt: 1 });

    const ollamaMessages = [
      ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
      ...history.map((m) => ({ role: m.role as string, content: m.content })),
    ];

    // Call Ollama
    const ollamaRes = await ollamaChat(baseUrl ?? 'http://localhost:11434', {
      model,
      messages: ollamaMessages,
      stream: false,
      options: { temperature, top_p: topP, top_k: topK, num_ctx: numCtx },
    });

    const assistantContent = ollamaRes.message.content;

    // Save assistant message
    const assistantMsg = await Message.create({
      conversationId: id,
      role: 'assistant',
      content: assistantContent,
      tokenCount: ollamaRes.eval_count ?? estimateTokens(assistantContent),
    });

    // Update conversation
    await Conversation.findByIdAndUpdate(id, {
      $inc: { messageCount: 2 },
      updatedAt: new Date(),
      ...(conversation.messageCount === 0 ? { title: content.slice(0, 60) } : {}),
    });

    const data = {
      userMessage: {
        _id: userMsg._id.toString(),
        conversationId: id,
        role: 'user' as const,
        content: userMsg.content,
        tokenCount: userMsg.tokenCount,
        createdAt: userMsg.createdAt.toISOString(),
      },
      assistantMessage: {
        _id: assistantMsg._id.toString(),
        conversationId: id,
        role: 'assistant' as const,
        content: assistantMsg.content,
        tokenCount: assistantMsg.tokenCount,
        createdAt: assistantMsg.createdAt.toISOString(),
      },
    };

    return NextResponse.json<ApiResponse<typeof data>>(
      { data, error: null, success: true },
      { status: 201 },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: message, success: false },
      { status: 500 },
    );
  }
}
