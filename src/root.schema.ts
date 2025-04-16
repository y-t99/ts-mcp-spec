import { z } from 'zod';

import {
  MCPNotificationSchema,
  MCPRequestSchema,
  MCPResponseResultSchema,
  MCPResponseSchema,
} from './message.schema';

export const ListRootsRequestSchema = MCPRequestSchema.extend({
  method: z.literal('roots/list').default('roots/list'),
});

export type ListRootsRequest = z.infer<typeof ListRootsRequestSchema>;

export const RootSchema = z.object({
  uri: z.string(),
  name: z.string().optional(),
});

export type Root = z.infer<typeof RootSchema>;

export const ListRootsResultSchema = MCPResponseResultSchema.extend({
  roots: z.array(RootSchema),
});

export type ListRootsResult = z.infer<typeof ListRootsResultSchema>;

export const ListRootsResponseSchema = MCPResponseSchema.extend({
  result: ListRootsResultSchema,
});

export type ListRootsResponse = z.infer<typeof ListRootsResponseSchema>;

export const RootsListChangedNotificationSchema = MCPNotificationSchema.extend({
  method: z.literal('notifications/roots/list_changed').default('notifications/roots/list_changed'),
});

export type RootsListChangedNotification = z.infer<typeof RootsListChangedNotificationSchema>;
