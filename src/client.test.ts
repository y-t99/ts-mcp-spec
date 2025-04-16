import { describe, expect, it } from 'vitest';

import { CreateMessageRequestSchema } from './completion.schema';
import {
  ListRootsRequestSchema,
  ListRootsResponseSchema,
  RootsListChangedNotificationSchema,
} from './root.schema';
/**
 * The Model Context Protocol (MCP) provides a standardized way for clients to expose filesystem “roots” to servers.
 * Roots define the boundaries of where servers can operate within the filesystem, allowing them to understand which directories and files they have access to.
 * Servers can request the list of roots from supporting clients and receive notifications when that list changes.
 */
describe('Roots: Discovery', () => {
  it('server -> client: list resources', () => {
    const request = ListRootsRequestSchema.parse({
      id: 0,
    });
    expect(request).toEqual({
      jsonrpc: '2.0',
      id: 0,
      method: 'roots/list',
    });
  });

  it('client -> server: list resources', () => {
    const result = ListRootsResponseSchema.parse({
      id: 0,
      result: {
        roots: [
          {
            uri: 'file://',
            name: 'home',
          },
        ],
      },
    });
    expect(result).toEqual({
      jsonrpc: '2.0',
      id: 0,
      result: {
        roots: [
          {
            uri: 'file://',
            name: 'home',
          },
        ],
      },
    });
  });
});

describe('Roots: Changes', () => {
  it('When roots change, clients that support listChanged MUST send a notification:', () => {
    const notification = RootsListChangedNotificationSchema.parse({});
    expect(notification).toEqual({
      jsonrpc: '2.0',
      method: 'notifications/roots/list_changed',
    });
  });
});

/**
 * The Model Context Protocol (MCP) provides a standardized way for servers to request LLM sampling (“completions” or “generations”) from language models via clients.
 * This flow allows clients to maintain control over model access, selection, and permissions while enabling servers to leverage AI capabilities—with no server API keys necessary.
 * Servers can request text or image-based interactions and optionally include context from MCP servers in their prompts.
 */
describe('Completions', () => {
  it('server -> client: request a language model generation', () => {
    const request = CreateMessageRequestSchema.parse({
      id: 0,
      params: {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: 'What is the capital of China?',
            },
          },
        ],
        modelPreferences: {
          hints: [
            {
              name: 'deepseek-reasoner',
            },
          ],
        },
        maxTokens: 100,
      },
    });
    expect(request).toEqual({
      jsonrpc: '2.0',
      id: 0,
      method: 'sampling/createMessage',
      params: {
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: 'What is the capital of China?',
            },
          },
        ],
        modelPreferences: {
          hints: [
            {
              name: 'deepseek-reasoner',
            },
          ],
        },

        maxTokens: 100,
      },
    });
  });
});
