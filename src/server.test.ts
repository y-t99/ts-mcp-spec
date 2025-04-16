import { describe, expect, it } from 'vitest';

import { CompleteRequestSchema, CompleteResponseSchema } from './completion.schema';
import { LoggingMessageNotificationSchema, SetLevelRequestSchema } from './logging.schema';
import {
  GetPromptRequestSchema,
  GetPromptResponseSchema,
  ListPromptsRequestSchema,
  ListPromptsResponseSchema,
  PromptListChangedNotificationSchema,
} from './prompt.schema';
import {
  ListResourcesRequestSchema,
  ListResourcesResponseSchema,
  ListResourceTemplatesRequestSchema,
  ListResourceTemplatesResponseSchema,
  ReadResourceRequestSchema,
  ReadResourceResponseSchema,
  ResourceListChangedNotificationSchema,
  ResourceUpdatedNotificationSchema,
  SubscribeRequestSchema,
} from './resource.schema';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListToolsResponseSchema,
  ToolListChangedNotificationSchema,
} from './tool.schema';

describe('Prompt', () => {
  it('client -> server: request prompt list', () => {
    const request = ListPromptsRequestSchema.parse({
      id: 1,
      params: {
        cursor: 'optional-cursor-value',
      },
    });
    expect(request).toEqual({
      jsonrpc: '2.0',
      id: 1,
      method: 'prompts/list',
      params: {
        cursor: 'optional-cursor-value',
      },
    });
  });

  it('server -> client: response prompt list', () => {
    const response = ListPromptsResponseSchema.parse({
      jsonrpc: '2.0',
      id: 1,
      result: {
        prompts: [
          {
            name: 'code_review',
            description: 'Asks the LLM to analyze code quality and suggest improvements',
            arguments: [
              {
                name: 'code',
                description: 'The code to review',
                required: true,
              },
            ],
          },
        ],
        nextCursor: 'next-page-cursor',
      },
    });
    expect(response).toEqual({
      jsonrpc: '2.0',
      id: 1,
      result: {
        prompts: [
          {
            name: 'code_review',
            description: 'Asks the LLM to analyze code quality and suggest improvements',
            arguments: [
              {
                name: 'code',
                description: 'The code to review',
                required: true,
              },
            ],
          },
        ],
        nextCursor: 'next-page-cursor',
      },
    });
  });

  it('client -> server: get prompt request', () => {
    const request = GetPromptRequestSchema.parse({
      id: 1,
      params: {
        name: 'code_review',
        arguments: {
          code: "def hello():\n    print('world')",
        },
      },
    });
    expect(request).toEqual({
      jsonrpc: '2.0',
      id: 1,
      method: 'prompts/get',
      params: {
        name: 'code_review',
        arguments: {
          code: "def hello():\n    print('world')",
        },
      },
    });
  });

  it('server -> client: get prompt response', () => {
    const response = GetPromptResponseSchema.parse({
      id: 1,
      result: {
        description: 'Code review prompt',
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: "Please review this Python code:\ndef hello():\n    print('world')",
            },
          },
        ],
      },
    });
    expect(response).toEqual({
      jsonrpc: '2.0',
      id: 1,
      result: {
        description: 'Code review prompt',
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: "Please review this Python code:\ndef hello():\n    print('world')",
            },
          },
        ],
      },
    });
  });

  it('server -> client: prompt list changed notification', () => {
    const notification = PromptListChangedNotificationSchema.parse({});
    expect(notification).toEqual({
      jsonrpc: '2.0',
      method: 'notifications/prompts/list_changed',
    });
  });
});

describe('Resource', () => {
  it('client -> server: request resource list', () => {
    const request = ListResourcesRequestSchema.parse({
      id: 1,
      params: {
        cursor: 'optional-cursor-value',
      },
    });
    expect(request).toEqual({
      jsonrpc: '2.0',
      id: 1,
      method: 'resources/list',
      params: {
        cursor: 'optional-cursor-value',
      },
    });
  });

  it('server -> client: response resource list', () => {
    const response = ListResourcesResponseSchema.parse({
      id: 1,
      result: {
        resources: [
          {
            uri: 'file:///project/src/main.rs',
            name: 'main.rs',
            description: 'Primary application entry point',
            mimeType: 'text/x-rust',
          },
        ],
        nextCursor: 'next-page-cursor',
      },
    });
    expect(response).toEqual({
      jsonrpc: '2.0',
      id: 1,
      result: {
        resources: [
          {
            uri: 'file:///project/src/main.rs',
            name: 'main.rs',
            description: 'Primary application entry point',
            mimeType: 'text/x-rust',
          },
        ],
        nextCursor: 'next-page-cursor',
      },
    });
  });

  it('client -> server: read resource', () => {
    const request = ReadResourceRequestSchema.parse({
      id: 1,
      params: {
        uri: 'file:///project/src/main.rs',
      },
    });
    expect(request).toEqual({
      jsonrpc: '2.0',
      id: 1,
      method: 'resources/read',
      params: { uri: 'file:///project/src/main.rs' },
    });
  });

  it('server -> client: resource contents', () => {
    const response = ReadResourceResponseSchema.parse({
      id: 1,
      result: {
        contents: [
          {
            uri: 'file:///project/src/main.rs',
            mimeType: 'text/x-rust',
            text: 'fn main() {\n    println!(\"Hello world!\");\n}',
          },
        ],
      },
    });
    expect(response).toEqual({
      jsonrpc: '2.0',
      id: 1,
      result: {
        contents: [
          {
            uri: 'file:///project/src/main.rs',
            mimeType: 'text/x-rust',
            text: 'fn main() {\n    println!(\"Hello world!\");\n}',
          },
        ],
      },
    });
  });

  it('client -> server: request resource templates list', () => {
    const request = ListResourceTemplatesRequestSchema.parse({
      id: 1,
    });
    expect(request).toEqual({
      jsonrpc: '2.0',
      id: 1,
      method: 'resources/templates/list',
    });
  });

  it('server -> client: response resource templates list', () => {
    const response = ListResourceTemplatesResponseSchema.parse({
      id: 1,
      result: {
        resourceTemplates: [
          {
            uriTemplate: 'file:///{path}',
            name: 'Project Files',
            description: 'Access files in the project directory',
            mimeType: 'application/octet-stream',
          },
        ],
      },
    });
    expect(response).toEqual({
      jsonrpc: '2.0',
      id: 1,
      result: {
        resourceTemplates: [
          {
            uriTemplate: 'file:///{path}',
            name: 'Project Files',
            description: 'Access files in the project directory',
            mimeType: 'application/octet-stream',
          },
        ],
      },
    });
  });

  it('server -> client: resource list changed notification', () => {
    const notification = ResourceListChangedNotificationSchema.parse({});
    expect(notification).toEqual({
      jsonrpc: '2.0',
      method: 'notifications/resources/list_changed',
    });
  });

  it('client -> server: subscribe to resource list changes', () => {
    const request = SubscribeRequestSchema.parse({
      id: 1,
      params: {
        uri: 'file:///project/src/main.rs',
      },
    });
    expect(request).toEqual({
      jsonrpc: '2.0',
      id: 1,
      method: 'resources/subscribe',
      params: { uri: 'file:///project/src/main.rs' },
    });
  });

  it('server -> client: resource updated notification', () => {
    const notification = ResourceUpdatedNotificationSchema.parse({
      params: { uri: 'file:///project/src/main.rs' },
    });
    expect(notification).toEqual({
      jsonrpc: '2.0',
      method: 'notifications/resources/updated',
      params: { uri: 'file:///project/src/main.rs' },
    });
  });
});

describe('Tool', () => {
  it('client -> server: request tool list', () => {
    const request = ListToolsRequestSchema.parse({
      id: 1,
      params: {
        cursor: 'optional-cursor-value',
      },
    });
    expect(request).toEqual({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list',
      params: { cursor: 'optional-cursor-value' },
    });
  });

  it('server -> client: response tool list', () => {
    const response = ListToolsResponseSchema.parse({
      id: 1,
      result: {
        tools: [
          {
            name: 'get_weather',
            description: 'Get current weather information for a location',
            inputSchema: {
              type: 'object',
              properties: {
                location: {
                  type: 'string',
                  description: 'City name or zip code',
                },
              },
              required: ['location'],
            },
          },
        ],
        nextCursor: 'next-page-cursor',
      },
    });
    expect(response).toEqual({
      jsonrpc: '2.0',
      id: 1,
      result: {
        tools: [
          {
            name: 'get_weather',
            description: 'Get current weather information for a location',
            inputSchema: {
              type: 'object',
              properties: {
                location: {
                  type: 'string',
                  description: 'City name or zip code',
                },
              },
              required: ['location'],
            },
          },
        ],
        nextCursor: 'next-page-cursor',
      },
    });
  });

  it('client -> server: call tool', () => {
    const request = CallToolRequestSchema.parse({
      id: 1,
      params: {
        name: 'get_weather',
        arguments: {
          location: 'New York',
        },
      },
    });
    expect(request).toEqual({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'get_weather',
        arguments: {
          location: 'New York',
        },
      },
    });
  });

  it('server -> client: tool list changed notification', () => {
    const notification = ToolListChangedNotificationSchema.parse({});
    expect(notification).toEqual({
      jsonrpc: '2.0',
      method: 'notifications/tools/list_changed',
    });
  });
});

describe('Completion', () => {
  it('client -> server: request completion', () => {
    const request = CompleteRequestSchema.parse({
      id: 1,
      params: {
        ref: {
          type: 'ref/prompt',
          name: 'code_review',
        },
        argument: {
          name: 'language',
          value: 'py',
        },
      },
    });
    expect(request).toEqual({
      jsonrpc: '2.0',
      id: 1,
      method: 'completion/complete',
      params: {
        ref: {
          type: 'ref/prompt',
          name: 'code_review',
        },
        argument: {
          name: 'language',
          value: 'py',
        },
      },
    });
  });

  it('server -> client: completion result', () => {
    const response = CompleteResponseSchema.parse({
      id: 1,
      result: {
        completion: {
          values: ['python', 'pytorch', 'pyside'],
          total: 10,
          hasMore: true,
        },
      },
    });
    expect(response).toEqual({
      jsonrpc: '2.0',
      id: 1,
      result: {
        completion: {
          values: ['python', 'pytorch', 'pyside'],
          total: 10,
          hasMore: true,
        },
      },
    });
  });
});

describe('Logging', () => {
  it('client -> server: set logging level', () => {
    const request = SetLevelRequestSchema.parse({
      id: 1,
      params: {
        level: 'info',
      },
    });
    expect(request).toEqual({
      jsonrpc: '2.0',
      id: 1,
      method: 'logging/setLevel',
      params: { level: 'info' },
    });
  });

  it('server -> client: logging message notification', () => {
    const notification = LoggingMessageNotificationSchema.parse({
      params: {
        level: 'error',
        logger: 'database',
        data: {
          error: 'Connection failed',
          details: {
            host: 'localhost',
            port: 5432,
          },
        },
      },
    });
    expect(notification).toEqual({
      jsonrpc: '2.0',
      method: 'notifications/message',
      params: {
        level: 'error',
        logger: 'database',
        data: {
          error: 'Connection failed',
          details: {
            host: 'localhost',
            port: 5432,
          },
        },
      },
    });
  });
});
