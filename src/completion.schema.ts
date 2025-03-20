import { z } from 'zod';

import { MCPRequestSchema, MCPResponseResultSchema } from './message.schema';
import { ImageContentSchema, RoleSchema, TextContentSchema } from './resource.schema';

export const PromptReferenceSchema = z.object({
  type: z.literal('ref/prompt'),
  name: z.string(),
});

export type PromptReference = z.infer<typeof PromptReferenceSchema>;

export const ResourceReferenceSchema = z.object({
  type: z.literal('ref/resource'),
  uri: z.string(),
});

export type ResourceReference = z.infer<typeof ResourceReferenceSchema>;

export const CompleteRequestSchema = MCPRequestSchema.extend({
  method: z.literal('completion/complete'),
  params: z.object({
    ref: z.union([PromptReferenceSchema, ResourceReferenceSchema]),
    argument: z.object({
      name: z.string(),
      value: z.string(),
    }),
  }),
});

export type CompleteRequest = z.infer<typeof CompleteRequestSchema>;

export const CompleteResultSchema = MCPResponseResultSchema.extend({
  completion: z.object({
    values: z.array(z.string()),
    total: z.number().optional(),
    hasMore: z.boolean().optional(),
  }),
});

export type CompleteResult = z.infer<typeof CompleteResultSchema>;

export const SamplingMessageSchema = z.object({
  role: RoleSchema,
  content: z.union([TextContentSchema, ImageContentSchema]),
});

export type SamplingMessage = z.infer<typeof SamplingMessageSchema>;

export const ModelHintSchema = z.object({
  name: z.string().optional(),
});

export type ModelHint = z.infer<typeof ModelHintSchema>;

export const ModelPreferencesSchema = z.object({
  hints: z.array(ModelHintSchema).optional(),
  costPriority: z.number().optional(),
  speedPriority: z.number().optional(),
  intelligencePriority: z.number().optional(),
});

export type ModelPreferences = z.infer<typeof ModelPreferencesSchema>;

export const CreateMessageRequestSchema = MCPRequestSchema.extend({
  method: z.literal('sampling/createMessage'),
  params: z.object({
    messages: z.array(SamplingMessageSchema),
    modelPreferences: ModelPreferencesSchema.optional(),
    systemPrompt: z.string().optional(),
    includeContext: z.enum(['none', 'thisServer', 'allServers']).optional(),
    temperature: z.number().optional(),
    maxTokens: z.number(),
    stopSequences: z.array(z.string()).optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
  }),
});

export type CreateMessageRequest = z.infer<typeof CreateMessageRequestSchema>;

export const CreateMessageResultSchema = MCPResponseResultSchema.merge(SamplingMessageSchema).merge(
  z.object({
    model: z.string(),
    stopReason: z.enum(['endTurn', 'stopSequence', 'maxTokens']).or(z.string()).optional(),
  }),
);

export type CreateMessageResult = z.infer<typeof CreateMessageResultSchema>;
