import { z } from 'zod';

import { JSONRPC_VERSION } from './constants';

export const MCPRequestSchema = z.object({
  jsonrpc: z.literal(JSONRPC_VERSION),
  id: z.union([z.string(), z.number()]),
  method: z.string(),
  params: z.record(z.string(), z.unknown()).optional(),
});

export type MCPRequest = z.infer<typeof MCPRequestSchema>;

export const MCPResponseSchema = z.object({
  jsonrpc: z.literal(JSONRPC_VERSION),
  id: z.union([z.string(), z.number()]),
  result: z.record(z.string(), z.unknown()).optional(),
  error: z
    .object({
      code: z.number(),
      message: z.string(),
      data: z.unknown().optional(),
    })
    .optional(),
});

export type MCPResponse = z.infer<typeof MCPResponseSchema>;

export const MCPNotificationSchema = z.object({
  jsonrpc: z.literal(JSONRPC_VERSION),
  method: z.string(),
  params: z.record(z.string(), z.unknown()).optional(),
});

export type MCPNotification = z.infer<typeof MCPNotificationSchema>;
