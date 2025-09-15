// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'inbnd-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inbnd';

export const metadata: Metadata = {
  resource: 'v2.onboarding',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/v2/onboarding/check-reply',
  operationId: 'listOnboarding',
};

export const tool: Tool = {
  name: 'check_reply_v2_onboarding',
  description: 'GET /onboarding/check-reply',
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  return asTextContentResult((await client.v2.onboarding.checkReply()) as object);
};

export default { metadata, tool, handler };
