import { z } from 'zod';

export const CreateConversationSchema = z.object({
  title: z.string().min(1).max(200).optional(),
});

export const RenameConversationSchema = z.object({
  title: z.string().min(1).max(200),
});

export const SendMessageSchema = z.object({
  content: z.string().min(1).max(32000),
  model: z.string().min(1),
  temperature: z.number().min(0).max(2).default(0.7),
  topP: z.number().min(0).max(1).default(0.9),
  topK: z.number().int().min(1).max(100).default(40),
  numCtx: z.number().int().min(512).max(8192).default(2048),
  systemPrompt: z.string().max(4000).optional(),
  baseUrl: z.string().url().optional().default('http://localhost:11434'),
});

export const OllamaModelDetailsSchema = z.object({
  format: z.string(),
  family: z.string(),
  families: z.array(z.string()).nullable(),
  parameter_size: z.string(),
  quantization_level: z.string(),
});

export const OllamaModelSchema = z.object({
  name: z.string(),
  modified_at: z.string(),
  size: z.number(),
  digest: z.string(),
  details: OllamaModelDetailsSchema,
});

export const OllamaModelsResponseSchema = z.object({
  models: z.array(OllamaModelSchema),
});

export type CreateConversationInput = z.infer<typeof CreateConversationSchema>;
export type RenameConversationInput = z.infer<typeof RenameConversationSchema>;
export type SendMessageInput = z.infer<typeof SendMessageSchema>;
