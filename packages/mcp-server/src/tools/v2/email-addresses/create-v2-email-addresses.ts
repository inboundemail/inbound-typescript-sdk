// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'inbnd-mcp/filtering';
import { Metadata, asTextContentResult } from 'inbnd-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inbnd';

export const metadata: Metadata = {
  resource: 'v2.email_addresses',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/v2/email-addresses',
  operationId: 'postEmailAddresses',
};

export const tool: Tool = {
  name: 'create_v2_email_addresses',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nPOST /email-addresses\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    id: {\n      type: 'string'\n    },\n    address: {\n      type: 'string'\n    },\n    createdAt: {\n      type: 'string'\n    },\n    domain: {\n      type: 'string'\n    },\n    domainId: {\n      type: 'string'\n    },\n    endpointId: {\n      type: 'string'\n    },\n    isActive: {\n      type: 'boolean'\n    },\n    isReceiptRuleConfigured: {\n      type: 'boolean'\n    },\n    receiptRuleName: {\n      type: 'string'\n    },\n    routing: {\n      type: 'string'\n    },\n    updatedAt: {\n      type: 'string'\n    },\n    userId: {\n      type: 'string'\n    },\n    webhookId: {\n      type: 'string'\n    },\n    warning: {\n      type: 'string'\n    }\n  },\n  required: [    'id',\n    'address',\n    'createdAt',\n    'domain',\n    'domainId',\n    'endpointId',\n    'isActive',\n    'isReceiptRuleConfigured',\n    'receiptRuleName',\n    'routing',\n    'updatedAt',\n    'userId',\n    'webhookId'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      address: {
        type: 'string',
      },
      domainId: {
        type: 'string',
      },
      endpointId: {
        type: 'string',
      },
      isActive: {
        type: 'boolean',
      },
      webhookId: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['address', 'domainId'],
  },
  annotations: {},
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.v2.emailAddresses.create(body)));
};

export default { metadata, tool, handler };
