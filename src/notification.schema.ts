import { z } from 'zod';

import { LoggingLevelSchema } from './logging.schema';
import { MCPNotificationSchema } from './message.schema';

export const ToolListChangedNotificationSchema = MCPNotificationSchema.extend({
  method: z.literal('notifications/tools/list_changed'),
});

export type ToolListChangedNotification = z.infer<typeof ToolListChangedNotificationSchema>;

export const LoggingMessageNotificationSchema = MCPNotificationSchema.extend({
  method: z.literal('notifications/message'),
  params: z.object({
    level: LoggingLevelSchema,
    logger: z.string().optional(),
    data: z.unknown(),
  }),
});

export type LoggingMessageNotification = z.infer<typeof LoggingMessageNotificationSchema>;
