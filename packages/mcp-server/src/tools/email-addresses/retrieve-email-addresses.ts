// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'inbound-docs-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'inbound-docs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inboundemail';

export const metadata: Metadata = {
  resource: 'email_addresses',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/e2/email-addresses/{id}',
  operationId: 'getApiE2Email-addressesById',
};

export const tool: Tool = {
  name: 'retrieve_email_addresses',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet a specific email address by ID with detailed information including routing configuration\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/email_address_retrieve_response',\n  $defs: {\n    email_address_retrieve_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        address: {\n          type: 'string'\n        },\n        createdAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        domain: {\n          type: 'object',\n          properties: {\n            id: {\n              type: 'string'\n            },\n            name: {\n              type: 'string'\n            },\n            status: {\n              type: 'string'\n            }\n          },\n          required: [            'id',\n            'name',\n            'status'\n          ]\n        },\n        domainId: {\n          type: 'string'\n        },\n        endpointId: {\n          type: 'string'\n        },\n        isActive: {\n          type: 'boolean'\n        },\n        isReceiptRuleConfigured: {\n          type: 'boolean'\n        },\n        receiptRuleName: {\n          type: 'string'\n        },\n        routing: {\n          type: 'object',\n          properties: {\n            id: {\n              type: 'string'\n            },\n            isActive: {\n              type: 'boolean'\n            },\n            name: {\n              type: 'string'\n            },\n            type: {\n              type: 'string',\n              enum: [                'webhook',\n                'endpoint',\n                'none'\n              ]\n            },\n            config: {\n              type: 'object',\n              additionalProperties: true\n            }\n          },\n          required: [            'id',\n            'isActive',\n            'name',\n            'type'\n          ]\n        },\n        updatedAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        userId: {\n          type: 'string'\n        },\n        webhookId: {\n          type: 'string'\n        }\n      },\n      required: [        'id',\n        'address',\n        'createdAt',\n        'domain',\n        'domainId',\n        'endpointId',\n        'isActive',\n        'isReceiptRuleConfigured',\n        'receiptRuleName',\n        'routing',\n        'updatedAt',\n        'userId',\n        'webhookId'\n      ]\n    }\n  }\n}\n```",
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
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.emailAddresses.retrieve(id)));
  } catch (error) {
    if (error instanceof Inbound.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
