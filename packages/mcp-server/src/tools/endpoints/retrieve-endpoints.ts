// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'inbound-docs-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'inbound-docs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inboundemail';

export const metadata: Metadata = {
  resource: 'endpoints',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/e2/endpoints/{id}',
  operationId: 'getApiE2EndpointsById',
};

export const tool: Tool = {
  name: 'retrieve_endpoints',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet detailed information about a specific endpoint including delivery stats, recent deliveries, associated emails, and catch-all domains\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/endpoint_retrieve_response',\n  $defs: {\n    endpoint_retrieve_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        associatedEmails: {\n          type: 'array',\n          items: {\n            type: 'object',\n            properties: {\n              id: {\n                type: 'string'\n              },\n              address: {\n                type: 'string'\n              },\n              createdAt: {\n                type: 'string'\n              },\n              isActive: {\n                type: 'boolean'\n              }\n            },\n            required: [              'id',\n              'address',\n              'createdAt',\n              'isActive'\n            ]\n          }\n        },\n        catchAllDomains: {\n          type: 'array',\n          items: {\n            type: 'object',\n            properties: {\n              id: {\n                type: 'string'\n              },\n              domain: {\n                type: 'string'\n              },\n              status: {\n                type: 'string'\n              }\n            },\n            required: [              'id',\n              'domain',\n              'status'\n            ]\n          }\n        },\n        config: {\n          type: 'object',\n          additionalProperties: true\n        },\n        createdAt: {\n          type: 'string'\n        },\n        deliveryStats: {\n          type: 'object',\n          properties: {\n            failed: {\n              type: 'number'\n            },\n            lastDelivery: {\n              type: 'string'\n            },\n            successful: {\n              type: 'number'\n            },\n            total: {\n              type: 'number'\n            }\n          },\n          required: [            'failed',\n            'lastDelivery',\n            'successful',\n            'total'\n          ]\n        },\n        description: {\n          type: 'string'\n        },\n        groupEmails: {\n          type: 'array',\n          items: {\n            type: 'string'\n          }\n        },\n        isActive: {\n          type: 'boolean'\n        },\n        name: {\n          type: 'string'\n        },\n        recentDeliveries: {\n          type: 'array',\n          items: {\n            type: 'object',\n            properties: {\n              id: {\n                type: 'string'\n              },\n              attempts: {\n                type: 'number'\n              },\n              createdAt: {\n                type: 'string'\n              },\n              deliveryType: {\n                type: 'string'\n              },\n              emailId: {\n                type: 'string'\n              },\n              lastAttemptAt: {\n                type: 'string'\n              },\n              responseData: {\n                type: 'object',\n                additionalProperties: true\n              },\n              status: {\n                type: 'string'\n              }\n            },\n            required: [              'id',\n              'attempts',\n              'createdAt',\n              'deliveryType',\n              'emailId',\n              'lastAttemptAt',\n              'responseData',\n              'status'\n            ]\n          }\n        },\n        type: {\n          type: 'string',\n          enum: [            'webhook',\n            'email',\n            'email_group'\n          ]\n        },\n        updatedAt: {\n          type: 'string'\n        },\n        userId: {\n          type: 'string'\n        }\n      },\n      required: [        'id',\n        'associatedEmails',\n        'catchAllDomains',\n        'config',\n        'createdAt',\n        'deliveryStats',\n        'description',\n        'groupEmails',\n        'isActive',\n        'name',\n        'recentDeliveries',\n        'type',\n        'updatedAt',\n        'userId'\n      ]\n    }\n  }\n}\n```",
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
    return asTextContentResult(await maybeFilter(jq_filter, await client.endpoints.retrieve(id)));
  } catch (error) {
    if (error instanceof Inbound.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
