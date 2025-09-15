// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'inbnd-mcp/filtering';
import { Metadata, asTextContentResult } from 'inbnd-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inbnd';

export const metadata: Metadata = {
  resource: 'endpoints',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/v2/endpoints',
  operationId: 'postEndpoints',
};

export const tool: Tool = {
  name: 'create_endpoints',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nPOST /endpoints\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    id: {\n      type: 'string'\n    },\n    config: {\n      type: 'string'\n    },\n    createdAt: {\n      type: 'string'\n    },\n    deliveryStats: {\n      type: 'string'\n    },\n    description: {\n      type: 'string'\n    },\n    groupEmails: {\n      type: 'string'\n    },\n    isActive: {\n      type: 'boolean'\n    },\n    name: {\n      type: 'string'\n    },\n    type: {\n      type: 'string',\n      enum: [        'webhook',\n        'email',\n        'email_group'\n      ]\n    },\n    updatedAt: {\n      type: 'string'\n    },\n    userId: {\n      type: 'string'\n    }\n  },\n  required: [    'id',\n    'config',\n    'createdAt',\n    'deliveryStats',\n    'description',\n    'groupEmails',\n    'isActive',\n    'name',\n    'type',\n    'updatedAt',\n    'userId'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      config: {
        type: 'string',
      },
      name: {
        type: 'string',
      },
      type: {
        type: 'string',
        enum: ['webhook', 'email', 'email_group'],
      },
      description: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['config', 'name', 'type'],
  },
  annotations: {},
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.endpoints.create(body)));
};

export default { metadata, tool, handler };
