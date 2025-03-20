import { z } from 'zod';

import { MCPRequestSchema } from './message.schema';

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
  method: z.literal('logging/setLevel'),
  params: z.object({
    level: LoggingLevelSchema,
  }),
});

export type SetLevelRequest = z.infer<typeof SetLevelRequestSchema>;
