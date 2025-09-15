// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'inbnd-mcp/filtering';
import { Metadata, asTextContentResult } from 'inbnd-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inbnd';

export const metadata: Metadata = {
  resource: 'v2.mail',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/v2/mail',
  operationId: 'listMail',
};

export const tool: Tool = {
  name: 'list_v2_mail',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGET /mail\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    emails: {\n      type: 'array',\n      items: {\n        type: 'string'\n      }\n    },\n    filters: {\n      type: 'string'\n    },\n    pagination: {\n      type: 'number'\n    }\n  },\n  required: [    'emails',\n    'filters',\n    'pagination'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      domain: {
        type: 'string',
        description: 'domain parameter',
      },
      emailAddress: {
        type: 'string',
        description: 'emailAddress parameter',
      },
      emailId: {
        type: 'string',
        description: 'emailId parameter',
      },
      includeArchived: {
        type: 'boolean',
        description: 'includeArchived parameter',
      },
      limit: {
        type: 'number',
        description: 'limit parameter',
      },
      offset: {
        type: 'number',
        description: 'offset parameter',
      },
      search: {
        type: 'string',
        description: 'search parameter',
      },
      status: {
        type: 'string',
        description: 'status parameter',
        enum: ['failed', 'all', 'processed', 'undefined'],
      },
      timeRange: {
        type: 'string',
        description: 'timeRange parameter',
        enum: ['24h', '7d', '30d', '90d', 'undefined'],
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.v2.mail.list(body)));
};

export default { metadata, tool, handler };
