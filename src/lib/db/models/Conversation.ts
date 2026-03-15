import mongoose, { Document, Schema } from 'mongoose';

export interface IConversation extends Document {
  title: string;
  messageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new Schema<IConversation>(
  {
    title: { type: String, default: 'New Conversation', required: true },
    messageCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Conversation =
  mongoose.models.Conversation ||
  mongoose.model<IConversation>('Conversation', ConversationSchema);
