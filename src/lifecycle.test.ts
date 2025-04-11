import { describe, expect, test } from 'vitest';

import { ERROR_CODES } from './constants';
import {
  InitializedNotificationSchema,
  InitializeRequestSchema,
  InitializeResponseSchema,
} from './lifecycle.schema';
import { MCPErrorResponseSchema } from './message.schema';

/**
 * Capability negotiation and protocol version agreement
 */
describe('lifecycle: Initialization', () => {
  test('client -> server: initialize request', () => {
    const request = InitializeRequestSchema.parse({
      id: 0,
      params: {
        capabilities: {},
        clientInfo: {
          name: 'vitest',
          version: '1.0.0',
        },
      },
    });

    expect(request).toEqual({
      jsonrpc: '2.0',
      id: 0,
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'vitest', version: '1.0.0' },
      },
    });
  });

  test('server -> client: initialize response', () => {
    const response = InitializeResponseSchema.parse({
      id: 0,
      result: {
        capabilities: {},
        serverInfo: {
          name: 'vitest',
          version: '1.0.0',
        },
      },
    });

    expect(response).toEqual({
      jsonrpc: '2.0',
      id: 0,
      result: {
        protocolVersion: '2024-11-05',
        serverInfo: {
          name: 'vitest',
          version: '1.0.0',
        },
        capabilities: {},
      },
    });
  });

  test('client -> server: initialized notification', () => {
    // After successful initialization, the client MUST send an initialized notification to indicate it is ready to begin normal operations.
    const notification = InitializedNotificationSchema.parse({});

    expect(notification).toEqual({
      jsonrpc: '2.0',
      method: 'notifications/initialized',
    });
  });
});

/**
 * If the client does not support the version in the server's response, it SHOULD disconnect.
 */
describe('Version Negotiation', () => {
  /**
   * Implementations SHOULD be prepared to handle these error cases:
   *
   * - Protocol version mismatch
   * - Failure to negotiate required capabilities
   * - Initialize request timeout
   * - Shutdown timeout
   *
   * Implementations SHOULD implement appropriate timeouts for all requests, to prevent hung connections and resource exhaustion.
   *
   * Example initialization error:
   */
  test('server -> client: initialize response', () => {
    const response = MCPErrorResponseSchema.parse({
      id: 0,
      error: {
        code: ERROR_CODES.INVALID_PARAMS,
        message: 'Unsupported protocol version.',
        data: {
          supported: ['2024-11-05'],
          requested: '1.0.0',
        },
      },
    });

    expect(response).toEqual({
      jsonrpc: '2.0',
      id: 0,
      error: {
        code: ERROR_CODES.INVALID_PARAMS,
        message: 'Unsupported protocol version.',
        data: {
          supported: ['2024-11-05'],
          requested: '1.0.0',
        },
      },
    });
  });
});

/**
 * Client and server capabilities establish which optional protocol features will be available during the session.
 */
describe('Capability Negotiation', () => {
  test('client -> server: initialize request with capabilities', () => {
    const request = InitializeRequestSchema.parse({
      id: 0,
      params: {
        clientInfo: {
          name: 'vitest',
          version: '1.0.0',
        },
        capabilities: {
          roots: {
            // Whether the client supports notifications for changes to the roots list.
            listChanged: true,
          },
          sampling: {
            // Present if the client supports sampling from an LLM.
          },
          experimental: {
            // Experimental, non-standard capabilities that the client supports.
          },
        },
      },
    });

    expect(request).toEqual({
      jsonrpc: '2.0',
      id: 0,
      method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        clientInfo: {
          name: 'vitest',
          version: '1.0.0',
        },
        capabilities: {
          roots: {
            listChanged: true,
          },
          sampling: {},
          experimental: {},
        },
      },
    });
  });

  test('server -> client: initialize response with capabilities', () => {
    const response = InitializeResponseSchema.parse({
      id: 0,
      result: {
        serverInfo: {
          name: 'vitest',
          version: '1.0.0',
        },
        capabilities: {
          // Present if the server supports sending log messages to the client.
          logging: {},
          // Present if the server offers any prompt templates.
          prompts: {
            // Whether this server supports notifications for changes to the prompt list.
            listChanged: true,
          },
          // Present if the server offers any resources to read.
          resources: {
            // Whether this server supports subscribing to resource updates.
            subscribe: true,
            // Whether this server supports notifications for changes to the resource list.
            listChanged: true,
          },
          // Present if the server offers any tools to call.
          tools: {
            // Whether this server supports notifications for changes to the tool list.
            listChanged: true,
          },
          experimental: {
            // Experimental, non-standard capabilities that the server supports.
          },
        },
      },
    });

    expect(response).toEqual({
      jsonrpc: '2.0',
      id: 0,
      result: {
        protocolVersion: '2024-11-05',
        serverInfo: {
          name: 'vitest',
          version: '1.0.0',
        },
        capabilities: {
          logging: {},
          prompts: {
            listChanged: true,
          },
          resources: {
            subscribe: true,
            listChanged: true,
          },
          tools: {
            listChanged: true,
          },
          experimental: {},
        },
      },
    });
  });
});

/**
 * During the operation phase, the client and server exchange messages according to the negotiated capabilities.
 *
 * Both parties SHOULD:
 *
 * - Respect the negotiated protocol version
 * - Only use capabilities that were successfully negotiated
 */
describe('lifecycle: Operation', () => {});

/**
 * Shutdown
 * During the shutdown phase, one side (usually the client) cleanly terminates the protocol connection. No specific shutdown messages are defined—instead, the underlying transport mechanism should be used to signal connection termination:
 *
 * stdio
 * For the stdio transport, the client SHOULD initiate shutdown by:
 *
 * - First, closing the input stream to the child process (the server)
 * - Waiting for the server to exit, or sending SIGTERM if the server does not exit within a reasonable time
 * - Sending SIGKILL if the server does not exit within a reasonable time after SIGTERM
 *
 * The server MAY initiate shutdown by closing its output stream to the client and exiting.
 *
 * HTTP
 * For HTTP transports, shutdown is indicated by closing the associated HTTP connection(s).
 */
describe('lifecycle: Shutdown', () => {});
