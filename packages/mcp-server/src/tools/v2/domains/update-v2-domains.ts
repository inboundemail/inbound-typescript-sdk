// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'inbnd-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inbnd';

export const metadata: Metadata = {
  resource: 'v2.domains',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/api/v2/domains/{id}',
  operationId: 'patchDomainsById',
};

export const tool: Tool = {
  name: 'update_v2_domains',
  description: 'PATCH /domains/{id}',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
    },
    required: ['id'],
  },
  annotations: {},
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult((await client.v2.domains.update(id)) as object);
};

export default { metadata, tool, handler };
