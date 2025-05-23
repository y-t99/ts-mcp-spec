/**
 * Model Context Protocol (MCP) Constants
 * Protocol Revision: 2024-11-05
 */

// Protocol version
export enum ProtocolVersion {
  V_2024_11_05 = '2024-11-05',
  V_2025_03_26 = '2025-03-26',
}
export const LATEST_PROTOCOL_VERSION = ProtocolVersion.V_2024_11_05;

// JSON-RPC version used by MCP
export const JSONRPC_VERSION = '2.0';

// Error codes
export const ERROR_CODES = {
  PARSE_ERROR: -32700,
  INVALID_REQUEST: -32600,
  METHOD_NOT_FOUND: -32601,
  INVALID_PARAMS: -32602,
  INTERNAL_ERROR: -32603,
  SERVER_ERROR_RANGE_START: -32000,
  SERVER_ERROR_RANGE_END: -32099,
} as const;
