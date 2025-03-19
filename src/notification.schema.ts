import { z } from 'zod';

import { MCPNotificationSchema } from './message.schema';

export const InitializedNotificationSchema = MCPNotificationSchema.extend({
  method: z.literal('notifications/initialized'),
});

export type InitializedNotification = z.infer<typeof InitializedNotificationSchema>;

export const CancelledNotificationSchema = MCPNotificationSchema.extend({
  method: z.literal('notifications/cancelled'),
  params: z.object({
    requestId: z.union([z.string(), z.number()]),
    reason: z.string().optional(),
  }),
});

export type CancelledNotification = z.infer<typeof CancelledNotificationSchema>;

export const ProgressNotificationSchema = MCPNotificationSchema.extend({
  method: z.literal('notifications/progress'),
  params: z.object({
    progressToken: z.union([z.string(), z.number()]),
    progress: z.number(),
    total: z.number().optional(),
  }),
});

export type ProgressNotification = z.infer<typeof ProgressNotificationSchema>;

export const PromptListChangedNotificationSchema = MCPNotificationSchema.extend({
  method: z.literal('notifications/prompts/list_changed'),
});

export type PromptListChangedNotification = z.infer<typeof PromptListChangedNotificationSchema>;

export const ResourceListChangedNotificationSchema = MCPNotificationSchema.extend({
  method: z.literal('notifications/resources/list_changed'),
});

export type ResourceListChangedNotification = z.infer<typeof ResourceListChangedNotificationSchema>;

export const ResourceUpdatedNotificationSchema = MCPNotificationSchema.extend({
  method: z.literal('notifications/resources/updated'),
  params: z.object({
    uri: z.string(),
  }),
});

export type ResourceUpdatedNotification = z.infer<typeof ResourceUpdatedNotificationSchema>;

export const ToolListChangedNotificationSchema = MCPNotificationSchema.extend({
  method: z.literal('notifications/tools/list_changed'),
});

export type ToolListChangedNotification = z.infer<typeof ToolListChangedNotificationSchema>;
