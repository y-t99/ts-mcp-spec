import { describe, expect, it } from 'vitest';

import {
  ERROR_CODES,
  JSONRPC_VERSION,
  LATEST_PROTOCOL_VERSION,
  ProtocolVersion,
} from './constants';

describe('MCP Constants', () => {
  it('should export the correct protocol version', () => {
    expect(LATEST_PROTOCOL_VERSION).toBe(ProtocolVersion.V_2025_03_26);
  });

  it('should export the correct JSON-RPC version', () => {
    expect(JSONRPC_VERSION).toBe('2.0');
  });

  it('should define standard JSON-RPC error codes', () => {
    expect(ERROR_CODES.PARSE_ERROR).toBe(-32700);
    expect(ERROR_CODES.INVALID_REQUEST).toBe(-32600);
    expect(ERROR_CODES.METHOD_NOT_FOUND).toBe(-32601);
    expect(ERROR_CODES.INVALID_PARAMS).toBe(-32602);
    expect(ERROR_CODES.INTERNAL_ERROR).toBe(-32603);
  });

  it('should define server error code range', () => {
    expect(ERROR_CODES.SERVER_ERROR_RANGE_START).toBe(-32000);
    expect(ERROR_CODES.SERVER_ERROR_RANGE_END).toBe(-32099);
  });
});
