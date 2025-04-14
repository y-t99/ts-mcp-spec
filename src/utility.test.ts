import { describe, expect, it } from 'vitest';

import { MCPRequestSchema } from './message.schema';
import {
  CancelledNotificationSchema,
  PingRequestSchema,
  ProgressNotificationSchema,
} from './utility.schema';

/**
 * The Model Context Protocol (MCP) supports optional cancellation of in-progress requests through notification messages.
 * Either side can send a cancellation notification to indicate that a previously-issued request should be terminated.
 */
describe('Utility: Cancellation', () => {
  it('cancel an in-progress request', () => {
    const notification = CancelledNotificationSchema.parse({
      params: {
        requestId: 0,
        reason: 'User requested cancellation',
      },
    });
    expect(notification).toEqual({
      jsonrpc: '2.0',
      method: 'notifications/cancelled',
      params: {
        requestId: 0,
        reason: 'User requested cancellation',
      },
    });
  });
});

/**
 * The Model Context Protocol includes an optional ping mechanism that allows either party to verify that their counterpart is still responsive and the connection is alive.
 */
describe('Utility: Ping', () => {
  it('ping the server', () => {
    const request = PingRequestSchema.parse({
      id: 0,
    });
    expect(request).toEqual({
      jsonrpc: '2.0',
      id: 0,
      method: 'ping',
    });
  });
});

/**
 * The Model Context Protocol (MCP) supports optional progress tracking for long-running operations through notification messages.
 * Either side can send progress notifications to provide updates about operation status.
 */
describe('Utility: Progress', () => {
  it('When a party wants to receive progress updates for a request, it includes a progressToken in the request metadata.', () => {
    const requestWithProgressToken = MCPRequestSchema.parse({
      id: 1,
      method: 'xxx',
      params: {
        _meta: {
          progressToken: 0,
        },
      },
    });
    expect(requestWithProgressToken).toEqual({
      jsonrpc: '2.0',
      id: 1,
      method: 'xxx',
      params: {
        _meta: {
          progressToken: 0,
        },
      },
    });
  });

  it('The receiver MAY then send progress notifications', () => {
    const notification = ProgressNotificationSchema.parse({
      params: {
        progressToken: 0,
        progress: 50,
        total: 100,
      },
    });
    expect(notification).toEqual({
      jsonrpc: '2.0',
      method: 'notifications/progress',
      params: {
        progressToken: 0,
        progress: 50,
        total: 100,
      },
    });
  });
});
