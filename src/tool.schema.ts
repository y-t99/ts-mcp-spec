import { z } from 'zod';

import { MCPRequestSchema, PaginatedRequestSchema, PaginatedResultSchema } from './message.schema';
import { EmbeddedResourceSchema, ImageContentSchema, TextContentSchema } from './resource.schema';

export const ListToolsRequestSchema = PaginatedRequestSchema.extend({
  method: z.literal('tools/list'),
});

export type ListToolsRequest = z.infer<typeof ListToolsRequestSchema>;

export const ToolSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  inputSchema: z.object({
    type: z.literal('object'),
    properties: z.record(z.any()).optional(),
    required: z.array(z.string()).optional(),
  }),
});

export type Tool = z.infer<typeof ToolSchema>;

export const ListToolsResultSchema = PaginatedResultSchema.extend({
  tools: z.array(ToolSchema),
});

export type ListToolsResult = z.infer<typeof ListToolsResultSchema>;

export const CallToolRequestSchema = MCPRequestSchema.extend({
  method: z.literal('tools/call'),
  params: z.object({
    name: z.string(),
    arguments: z.record(z.unknown()).optional(),
  }),
});

export type CallToolRequest = z.infer<typeof CallToolRequestSchema>;

export const CallToolResultSchema = z.object({
  content: z.array(z.union([TextContentSchema, ImageContentSchema, EmbeddedResourceSchema])),
  isError: z.boolean().optional(),
});

export type CallToolResult = z.infer<typeof CallToolResultSchema>;
