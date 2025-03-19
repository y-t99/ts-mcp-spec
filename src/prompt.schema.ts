import { z } from 'zod';

import { PaginatedRequestSchema, PaginatedResultSchema } from './message.schema';

export const ListPromptsRequestSchema = PaginatedRequestSchema.extend({
  method: z.literal('prompts/list'),
});

export const PromptArgumentSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  required: z.boolean().optional(),
});

export type PromptArgument = z.infer<typeof PromptArgumentSchema>;

export const PromptSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  arguments: z.array(PromptArgumentSchema).optional(),
});

export type Prompt = z.infer<typeof PromptSchema>;

export type ListPromptsRequest = z.infer<typeof ListPromptsRequestSchema>;

export const ListPromptsResultSchema = PaginatedResultSchema.extend({
  prompts: z.array(PromptSchema),
});

export type ListPromptsResult = z.infer<typeof ListPromptsResultSchema>;
