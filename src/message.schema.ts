import { z } from 'zod';

import { JSONRPC_VERSION } from './constants';

export const MCPRequestSchema = z.object({
  jsonrpc: z.literal(JSONRPC_VERSION),
  id: z.union([z.string(), z.number()]),
  method: z.string(),
  params: z
    .object({
      _meta: z
        .object({
          progressToken: z.union([z.string(), z.number()]).optional(),
        })
        .optional(),
    })
    .catchall(z.unknown())
    .optional(),
});

export type MCPRequest = z.infer<typeof MCPRequestSchema>;

export const MCPResponseResultSchema = z
  .object({
    _meta: z.record(z.string(), z.unknown()).optional(),
  })
  .catchall(z.unknown());

export type MCPResponseResult = z.infer<typeof MCPResponseResultSchema>;

export const MCPResponseSchema = z.object({
  jsonrpc: z.literal(JSONRPC_VERSION),
  id: z.union([z.string(), z.number()]),
  result: MCPResponseResultSchema.optional(),
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

export const PaginatedRequestSchema = MCPRequestSchema.extend({
  params: z
    .object({
      cursor: z.number().optional(),
    })
    .optional(),
});

export type PaginatedRequest = z.infer<typeof PaginatedRequestSchema>;

export const PaginatedResultSchema = MCPResponseResultSchema.extend({
  nextCursor: z.number().optional(),
});

export type PaginatedResult = z.infer<typeof PaginatedResultSchema>;
