import { NextResponse } from 'next/server';
import { connectDB, Conversation } from '@/lib/db';
import { CreateConversationSchema } from '@/lib/validators';
import type { ApiResponse } from '@/types';

export async function GET() {
  try {
    await connectDB();
    const conversations = await Conversation.find().sort({ updatedAt: -1 });
    const data = conversations.map((c) => ({
      _id: c._id.toString(),
      title: c.title,
      messageCount: c.messageCount,
      createdAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString(),
    }));
    return NextResponse.json<ApiResponse<typeof data>>({ data, error: null, success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json<ApiResponse<null>>(
      { data: null, error: message, success: false },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = CreateConversationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, error: parsed.error.message, success: false },
        { status: 400 },
      );
    }
    await connectDB();
    const conversation = await Conversation.create({
      title: parsed.data.title ?? 'New Conversation',
    });
    const data = {
      _id: conversation._id.toString(),
      title: conversation.title,
      messageCount: conversation.messageCount,
      createdAt: conversation.createdAt.toISOString(),
      updatedAt: conversation.updatedAt.toISOString(),
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
