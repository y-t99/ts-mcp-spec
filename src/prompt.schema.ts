import { z } from 'zod';

import {
  MCPNotificationSchema,
  MCPRequestSchema,
  MCPResponseResultSchema,
  MCPResponseSchema,
  PaginatedRequestSchema,
  PaginatedResultSchema,
} from './message.schema';
import {
  EmbeddedResourceSchema,
  ImageContentSchema,
  RoleSchema,
  TextContentSchema,
} from './resource.schema';

export const ListPromptsRequestSchema = PaginatedRequestSchema.extend({
  method: z.literal('prompts/list').default('prompts/list'),
});

export type ListPromptsRequest = z.infer<typeof ListPromptsRequestSchema>;

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

export const ListPromptsResultSchema = PaginatedResultSchema.extend({
  prompts: z.array(PromptSchema),
});

export type ListPromptsResult = z.infer<typeof ListPromptsResultSchema>;

export const ListPromptsResponseSchema = MCPResponseSchema.extend({
  result: ListPromptsResultSchema,
});

export type ListPromptsResponse = z.infer<typeof ListPromptsResponseSchema>;

export const GetPromptRequestSchema = MCPRequestSchema.extend({
  method: z.literal('prompts/get').default('prompts/get'),
  params: z.object({
    name: z.string(),
    arguments: z.record(z.string(), z.string()).optional(),
  }),
});

export type GetPromptRequest = z.infer<typeof GetPromptRequestSchema>;

export const PromptMessageSchema = z.object({
  role: RoleSchema,
  content: z.union([TextContentSchema, ImageContentSchema, EmbeddedResourceSchema]),
});

export type PromptMessage = z.infer<typeof PromptMessageSchema>;

export const GetPromptResponseResultSchema = MCPResponseResultSchema.extend({
  description: z.string().optional(),
  messages: z.array(PromptMessageSchema),
});

export type GetPromptResponseResult = z.infer<typeof GetPromptResponseResultSchema>;

export const GetPromptResponseSchema = MCPResponseSchema.extend({
  result: GetPromptResponseResultSchema,
});

export type GetPromptResponse = z.infer<typeof GetPromptResponseSchema>;

export const PromptListChangedNotificationSchema = MCPNotificationSchema.extend({
  method: z
    .literal('notifications/prompts/list_changed')
    .default('notifications/prompts/list_changed'),
});

export type PromptListChangedNotification = z.infer<typeof PromptListChangedNotificationSchema>;
