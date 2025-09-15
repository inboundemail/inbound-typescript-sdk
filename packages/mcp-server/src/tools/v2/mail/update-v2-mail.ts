// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'inbnd-mcp/filtering';
import { Metadata, asTextContentResult } from 'inbnd-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inbnd';

export const metadata: Metadata = {
  resource: 'v2.mail',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/api/v2/mail/{id}',
  operationId: 'patchMailById',
};

export const tool: Tool = {
  name: 'update_v2_mail',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nPATCH /mail/{id}\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    id: {\n      type: 'string'\n    },\n    archivedAt: {\n      type: 'string',\n      enum: [        'Date',\n        'null'\n      ]\n    },\n    isArchived: {\n      type: 'boolean'\n    },\n    isRead: {\n      type: 'boolean'\n    },\n    readAt: {\n      type: 'string',\n      enum: [        'Date',\n        'null'\n      ]\n    }\n  },\n  required: [    'id',\n    'archivedAt',\n    'isArchived',\n    'isRead',\n    'readAt'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      isArchived: {
        type: 'boolean',
      },
      isRead: {
        type: 'boolean',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id'],
  },
  annotations: {},
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.v2.mail.update(id, body)));
};

export default { metadata, tool, handler };
