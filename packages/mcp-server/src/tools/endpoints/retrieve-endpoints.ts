// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'inbnd-mcp/filtering';
import { Metadata, asTextContentResult } from 'inbnd-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inbnd';

export const metadata: Metadata = {
  resource: 'endpoints',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/v2/endpoints/{id}',
  operationId: 'getEndpointsById',
};

export const tool: Tool = {
  name: 'retrieve_endpoints',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGET /endpoints/{id}\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    id: {\n      type: 'string'\n    },\n    associatedEmails: {\n      type: 'array',\n      items: {\n        type: 'string'\n      }\n    },\n    catchAllDomains: {\n      type: 'array',\n      items: {\n        type: 'string'\n      }\n    },\n    config: {\n      type: 'string'\n    },\n    createdAt: {\n      type: 'string'\n    },\n    deliveryStats: {\n      type: 'string'\n    },\n    description: {\n      type: 'string'\n    },\n    groupEmails: {\n      type: 'string'\n    },\n    isActive: {\n      type: 'boolean'\n    },\n    name: {\n      type: 'string'\n    },\n    recentDeliveries: {\n      type: 'array',\n      items: {\n        type: 'string'\n      }\n    },\n    type: {\n      type: 'string',\n      enum: [        'webhook',\n        'email',\n        'email_group'\n      ]\n    },\n    updatedAt: {\n      type: 'string'\n    },\n    userId: {\n      type: 'string'\n    }\n  },\n  required: [    'id',\n    'associatedEmails',\n    'catchAllDomains',\n    'config',\n    'createdAt',\n    'deliveryStats',\n    'description',\n    'groupEmails',\n    'isActive',\n    'name',\n    'recentDeliveries',\n    'type',\n    'updatedAt',\n    'userId'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      path_id: {
        type: 'string',
      },
      query_id: {
        type: 'string',
        description: 'id parameter',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['path_id', 'query_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.endpoints.retrieve(id, body)));
};

export default { metadata, tool, handler };
