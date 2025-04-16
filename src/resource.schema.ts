import { z } from 'zod';

import {
  MCPNotificationSchema,
  MCPRequestSchema,
  MCPResponseResultSchema,
  MCPResponseSchema,
  PaginatedRequestSchema,
  PaginatedResultSchema,
} from './message.schema';

export const ListResourcesRequestSchema = PaginatedRequestSchema.extend({
  method: z.literal('resources/list').default('resources/list'),
});

export type ListResourcesRequest = z.infer<typeof ListResourcesRequestSchema>;

export const RoleSchema = z.enum(['user', 'assistant']);

export type Role = z.infer<typeof RoleSchema>;

export const AnnotatedSchema = z.object({
  annotations: z
    .object({
      audience: z.array(RoleSchema).optional(),
      priority: z.number().optional(),
    })
    .optional(),
});

export type Annotated = z.infer<typeof AnnotatedSchema>;

export const ResourceSchema = AnnotatedSchema.extend({
  uri: z.string(),
  name: z.string(),
  description: z.string().optional(),
  mimeType: z.string().optional(),
  size: z.number().optional(),
});

export type Resource = z.infer<typeof ResourceSchema>;

export const ListResourcesResultSchema = PaginatedResultSchema.extend({
  resources: z.array(ResourceSchema),
});

export type ListResourcesResult = z.infer<typeof ListResourcesResultSchema>;

export const ListResourcesResponseSchema = MCPResponseSchema.extend({
  result: ListResourcesResultSchema,
});

export type ListResourcesResponse = z.infer<typeof ListResourcesResponseSchema>;

export const ListResourceTemplatesRequestSchema = PaginatedRequestSchema.extend({
  method: z.literal('resources/templates/list').default('resources/templates/list'),
});

export type ListResourceTemplatesRequest = z.infer<typeof ListResourceTemplatesRequestSchema>;

export const ResourceTemplateSchema = AnnotatedSchema.extend({
  uriTemplate: z.string(),
  name: z.string(),
  description: z.string().optional(),
  mimeType: z.string().optional(),
});

export type ResourceTemplate = z.infer<typeof ResourceTemplateSchema>;

export const ListResourceTemplatesResultSchema = PaginatedResultSchema.extend({
  resourceTemplates: z.array(ResourceTemplateSchema),
});

export type ListResourceTemplatesResult = z.infer<typeof ListResourceTemplatesResultSchema>;

export const ListResourceTemplatesResponseSchema = MCPResponseSchema.extend({
  result: ListResourceTemplatesResultSchema,
});

export type ListResourceTemplatesResponse = z.infer<typeof ListResourceTemplatesResponseSchema>;

export const SubscribeRequestSchema = MCPRequestSchema.extend({
  method: z.literal('resources/subscribe').default('resources/subscribe'),
  params: z.object({
    uri: z.string(),
  }),
});

export type SubscribeRequest = z.infer<typeof SubscribeRequestSchema>;

export const UnsubscribeRequestSchema = MCPRequestSchema.extend({
  method: z.literal('resources/unsubscribe'),
  params: z.object({
    uri: z.string(),
  }),
});

export type UnsubscribeRequest = z.infer<typeof UnsubscribeRequestSchema>;

export const TextContentSchema = AnnotatedSchema.extend({
  type: z.literal('text'),
  text: z.string(),
});

export type TextContent = z.infer<typeof TextContentSchema>;

export const ImageContentSchema = AnnotatedSchema.extend({
  type: z.literal('image'),
  data: z.string(),
  mimeType: z.string(),
});

export type ImageContent = z.infer<typeof ImageContentSchema>;

export const ResourceContentsSchema = z.object({
  uri: z.string(),
  mimeType: z.string().optional(),
});

export type ResourceContents = z.infer<typeof ResourceContentsSchema>;

export const TextResourceContentsSchema = ResourceContentsSchema.extend({
  text: z.string(),
});

export type TextResourceContents = z.infer<typeof TextResourceContentsSchema>;

export const BlobResourceContentsSchema = ResourceContentsSchema.extend({
  blob: z.string(),
});

export type BlobResourceContents = z.infer<typeof BlobResourceContentsSchema>;

export const EmbeddedResourceSchema = AnnotatedSchema.extend({
  type: z.literal('resource'),
  resource: z.union([TextResourceContentsSchema, BlobResourceContentsSchema]),
});

export type EmbeddedResource = z.infer<typeof EmbeddedResourceSchema>;

export const ReadResourceRequestSchema = MCPRequestSchema.extend({
  method: z.literal('resources/read').default('resources/read'),
  params: z.object({
    uri: z.string(),
  }),
});

export type ReadResourceRequest = z.infer<typeof ReadResourceRequestSchema>;

export const ReadResourceResultSchema = MCPResponseResultSchema.extend({
  contents: z.array(z.union([TextResourceContentsSchema, BlobResourceContentsSchema])),
});

export type ReadResourceResult = z.infer<typeof ReadResourceResultSchema>;

export const ReadResourceResponseSchema = MCPResponseSchema.extend({
  result: ReadResourceResultSchema,
});

export type ReadResourceResponse = z.infer<typeof ReadResourceResponseSchema>;

export const ResourceListChangedNotificationSchema = MCPNotificationSchema.extend({
  method: z
    .literal('notifications/resources/list_changed')
    .default('notifications/resources/list_changed'),
});

export type ResourceListChangedNotification = z.infer<typeof ResourceListChangedNotificationSchema>;

export const ResourceUpdatedNotificationSchema = MCPNotificationSchema.extend({
  method: z.literal('notifications/resources/updated').default('notifications/resources/updated'),
  params: z.object({
    uri: z.string(),
  }),
});

export type ResourceUpdatedNotification = z.infer<typeof ResourceUpdatedNotificationSchema>;
