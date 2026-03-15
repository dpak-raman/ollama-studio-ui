import { NextResponse } from 'next/server';
import { connectDB, Conversation, Message } from '@/lib/db';
import { RenameConversationSchema } from '@/lib/validators';
import type { ApiResponse } from '@/types';

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = RenameConversationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: parsed.error.message, success: false },
        { status: 400 },
      );
    }
    await connectDB();
    const conversation = await Conversation.findByIdAndUpdate(
      id,
      { title: parsed.data.title },
      { new: true },
    );
    if (!conversation) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: 'Conversation not found', success: false },
        { status: 404 },
      );
    }
    const data = {
      _id: conversation._id.toString(),
      title: conversation.title,
      messageCount: conversation.messageCount,
      createdAt: conversation.createdAt.toISOString(),
      updatedAt: conversation.updatedAt.toISOString(),
    };
    return NextResponse.json<ApiResponse<typeof data>>({ data, error: null, success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: message, success: false },
      { status: 500 },
    );
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    await connectDB();
    const conversation = await Conversation.findByIdAndDelete(id);
    if (!conversation) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: 'Conversation not found', success: false },
        { status: 404 },
      );
    }
    await Message.deleteMany({ conversationId: id });
    return NextResponse.json<ApiResponse<{ id: string }>>({
      data: { id },
      error: null,
      success: true,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: message, success: false },
      { status: 500 },
    );
  }
}
