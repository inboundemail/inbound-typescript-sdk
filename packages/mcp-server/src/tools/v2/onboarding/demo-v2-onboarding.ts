// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'inbnd-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inbnd';

export const metadata: Metadata = {
  resource: 'v2.onboarding',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/v2/onboarding/demo',
  operationId: 'postOnboarding',
};

export const tool: Tool = {
  name: 'demo_v2_onboarding',
  description: 'POST /onboarding/demo',
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
  },
  annotations: {},
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  return asTextContentResult((await client.v2.onboarding.demo()) as object);
};

export default { metadata, tool, handler };
