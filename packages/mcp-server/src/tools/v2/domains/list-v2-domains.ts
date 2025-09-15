// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'inbnd-mcp/filtering';
import { Metadata, asTextContentResult } from 'inbnd-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inbnd';

export const metadata: Metadata = {
  resource: 'v2.domains',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/v2/domains',
  operationId: 'listDomains',
};

export const tool: Tool = {
  name: 'list_v2_domains',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGET /domains\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'array',\n      items: {\n        type: 'string'\n      }\n    },\n    meta: {\n      type: 'number'\n    },\n    pagination: {\n      type: 'number'\n    }\n  },\n  required: [    'data',\n    'meta',\n    'pagination'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      canReceive: {
        type: 'string',
        description: 'canReceive parameter',
        enum: ['true', 'false', 'undefined'],
      },
      check: {
        type: 'string',
        description: 'check parameter',
        enum: ['true', 'false', 'undefined'],
      },
      limit: {
        type: 'number',
        description: 'limit parameter',
      },
      offset: {
        type: 'number',
        description: 'offset parameter',
      },
      status: {
        type: 'string',
        description: 'status parameter',
        enum: ['pending', 'verified', 'failed', 'undefined'],
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.v2.domains.list(body)));
};

export default { metadata, tool, handler };
