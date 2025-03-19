import { z } from 'zod';

import { MCPRequestSchema } from './message.schema';

export const PingRequestSchema = MCPRequestSchema.extend({
  method: z.literal('ping'),
});

export type PingRequest = z.infer<typeof PingRequestSchema>;
