// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'inbnd-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inbnd';

export const metadata: Metadata = {
  resource: 'v2.mail',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/v2/mail/thread-counts',
  operationId: 'postMail',
};

export const tool: Tool = {
  name: 'thread_counts_v2_mail',
  description: 'POST /mail/thread-counts',
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
  },
  annotations: {},
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  return asTextContentResult((await client.v2.mail.threadCounts()) as object);
};

export default { metadata, tool, handler };
