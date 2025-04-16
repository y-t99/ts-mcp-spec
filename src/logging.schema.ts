import { z } from 'zod';

import { MCPNotificationSchema, MCPRequestSchema } from './message.schema';

export const LoggingLevelSchema = z.enum([
  'debug',
  'info',
  'notice',
  'warning',
  'error',
  'critical',
  'alert',
  'emergency',
]);

export type LoggingLevel = z.infer<typeof LoggingLevelSchema>;

export const SetLevelRequestSchema = MCPRequestSchema.extend({
  method: z.literal('logging/setLevel').default('logging/setLevel'),
  params: z.object({
    level: LoggingLevelSchema,
  }),
});

export type SetLevelRequest = z.infer<typeof SetLevelRequestSchema>;

export const LoggingMessageNotificationSchema = MCPNotificationSchema.extend({
  method: z.literal('notifications/message').default('notifications/message'),
  params: z.object({
    level: LoggingLevelSchema,
    logger: z.string().optional(),
    data: z.unknown(),
  }),
});

export type LoggingMessageNotification = z.infer<typeof LoggingMessageNotificationSchema>;
