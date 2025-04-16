import { z } from 'zod';

import { JSONRPC_VERSION } from './constants';

export const ProgressTokenSchema = z.union([z.string(), z.number()]);

export type ProgressToken = z.infer<typeof ProgressTokenSchema>;

export const CursorSchema = z.string();

export type Cursor = z.infer<typeof CursorSchema>;

export const MCPRequestSchema = z.object({
  jsonrpc: z.literal(JSONRPC_VERSION).default(JSONRPC_VERSION),
  id: z.union([z.string(), z.number()]),
  method: z.string(),
  params: z
    .object({
      _meta: z
        .object({
          progressToken: ProgressTokenSchema.optional(),
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

export type PaginatedRequest = z.infer<typeof PaginatedRequestSchema>;

export const PaginatedResultSchema = MCPResponseResultSchema.extend({
  nextCursor: CursorSchema.optional(),
});

export type PaginatedResult = z.infer<typeof PaginatedResultSchema>;

export const MCPResponseSchema = z.object({
  jsonrpc: z.literal(JSONRPC_VERSION).default(JSONRPC_VERSION),
  id: z.union([z.string(), z.number()]),
  result: MCPResponseResultSchema,
});

export type MCPResponse = z.infer<typeof MCPResponseSchema>;

export const MCPErrorResponseSchema = z.object({
  jsonrpc: z.literal(JSONRPC_VERSION).default(JSONRPC_VERSION),
  id: z.union([z.string(), z.number()]),
  error: z.object({
    code: z.number(),
    message: z.string(),
    data: z.unknown().optional(),
  }),
});

export type MCPErrorResponse = z.infer<typeof MCPErrorResponseSchema>;

export const MCPNotificationSchema = z.object({
  jsonrpc: z.literal(JSONRPC_VERSION).default(JSONRPC_VERSION),
  method: z.string(),
  params: z.record(z.string(), z.unknown()).optional(),
});

export type MCPNotification = z.infer<typeof MCPNotificationSchema>;

export const PaginatedRequestSchema = MCPRequestSchema.extend({
  params: z
    .object({
      cursor: CursorSchema.optional(),
    })
    .optional(),
});
