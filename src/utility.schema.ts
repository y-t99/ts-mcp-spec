import { z } from 'zod';

import { MCPNotificationSchema, MCPRequestSchema, ProgressTokenSchema } from './message.schema';

export const PingRequestSchema = MCPRequestSchema.extend({
  method: z.literal('ping').default('ping'),
});

export type PingRequest = z.infer<typeof PingRequestSchema>;

export const CancelledNotificationSchema = MCPNotificationSchema.extend({
  method: z.literal('notifications/cancelled').default('notifications/cancelled'),
  params: z.object({
    requestId: z.union([z.string(), z.number()]),
    reason: z.string().optional(),
  }),
});

export type CancelledNotification = z.infer<typeof CancelledNotificationSchema>;

export const ProgressNotificationSchema = MCPNotificationSchema.extend({
  method: z.literal('notifications/progress').default('notifications/progress'),
  params: z.object({
    progressToken: ProgressTokenSchema,
    progress: z.number(),
    total: z.number().optional(),
  }),
});

export type ProgressNotification = z.infer<typeof ProgressNotificationSchema>;
