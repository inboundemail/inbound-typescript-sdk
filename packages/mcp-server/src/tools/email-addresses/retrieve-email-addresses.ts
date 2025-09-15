// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'inbnd-mcp/filtering';
import { Metadata, asTextContentResult } from 'inbnd-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inbnd';

export const metadata: Metadata = {
  resource: 'email_addresses',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/v2/email-addresses/{id}',
  operationId: 'getEmailAddressesById',
};

export const tool: Tool = {
  name: 'retrieve_email_addresses',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGET /email-addresses/{id}\n\n# Response Schema\n```json\n{\n  type: 'object',\n  description: 'GET /api/v2/email-addresses/[id]\\nGets a specific email address by ID with detailed information\\nSupports both session-based auth and API key auth\\nHas tests? ⏳\\nHas logging? ✅\\nHas types? ✅',\n  properties: {\n    id: {\n      type: 'string'\n    },\n    address: {\n      type: 'string'\n    },\n    createdAt: {\n      type: 'string'\n    },\n    domain: {\n      type: 'string'\n    },\n    domainId: {\n      type: 'string'\n    },\n    endpointId: {\n      type: 'string'\n    },\n    isActive: {\n      type: 'boolean'\n    },\n    isReceiptRuleConfigured: {\n      type: 'boolean'\n    },\n    receiptRuleName: {\n      type: 'string'\n    },\n    routing: {\n      type: 'string'\n    },\n    updatedAt: {\n      type: 'string'\n    },\n    userId: {\n      type: 'string'\n    },\n    webhookId: {\n      type: 'string'\n    }\n  },\n  required: [    'id',\n    'address',\n    'createdAt',\n    'domain',\n    'domainId',\n    'endpointId',\n    'isActive',\n    'isReceiptRuleConfigured',\n    'receiptRuleName',\n    'routing',\n    'updatedAt',\n    'userId',\n    'webhookId'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
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
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.emailAddresses.retrieve(id)));
};

export default { metadata, tool, handler };
