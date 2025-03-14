import { z } from 'zod';

import { MCPRequestSchema, MCPResponseSchema } from './message.schema';

export const ClientCapabilitiesSchema = z.object({
  roots: z
    .object({
      listChanged: z.boolean().optional(),
    })
    .optional(),
  sampling: z.record(z.string(), z.unknown()).optional(),
  experimental: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
});

export type ClientCapabilities = z.infer<typeof ClientCapabilitiesSchema>;

export const ImplementationSchema = z.object({
  name: z.string(),
  version: z.string(),
});

export type Implementation = z.infer<typeof ImplementationSchema>;

export const InitializeRequestSchema = MCPRequestSchema.extend({
  method: z.literal('initialize'),
  params: z.object({
    protocolVersion: z.string(),
    capabilities: ClientCapabilitiesSchema,
    clientInfo: ImplementationSchema,
  }),
});

export type InitializeRequest = z.infer<typeof InitializeRequestSchema>;

export const ServerCapabilitiesSchema = z.object({
  logging: z.record(z.string(), z.unknown()).optional(),
  experimental: z.record(z.string(), z.record(z.string(), z.unknown())).optional(),
  tools: z
    .object({
      listChanged: z.boolean().optional(),
    })
    .optional(),
  prompts: z
    .object({
      listChanged: z.boolean().optional(),
    })
    .optional(),
  resources: z
    .object({
      listChanged: z.boolean().optional(),
      subscribe: z.boolean().optional(),
    })
    .optional(),
});

export type ServerCapabilities = z.infer<typeof ServerCapabilitiesSchema>;

export const InitializeResponseSchema = MCPResponseSchema.extend({
  result: z.object({
    protocolVersion: z.string(),
    serverInfo: ImplementationSchema,
    capabilities: ServerCapabilitiesSchema,
    instructions: z.string().optional(),
  }),
});

export type InitializeResponse = z.infer<typeof InitializeResponseSchema>;
