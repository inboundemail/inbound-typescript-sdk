// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'inbound-docs-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'inbound-docs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inboundemail';

export const metadata: Metadata = {
  resource: 'endpoints',
  operation: 'write',
  tags: [],
  httpMethod: 'put',
  httpPath: '/api/e2/endpoints/{id}',
  operationId: 'putApiE2EndpointsById',
};

export const tool: Tool = {
  name: 'update_endpoints',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpdate an existing endpoint's name, description, active status, config, or webhook format\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/endpoint_update_response',\n  $defs: {\n    endpoint_update_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        config: {\n          type: 'object',\n          additionalProperties: true\n        },\n        createdAt: {\n          type: 'string'\n        },\n        description: {\n          type: 'string'\n        },\n        groupEmails: {\n          type: 'array',\n          items: {\n            type: 'string'\n          }\n        },\n        isActive: {\n          type: 'boolean'\n        },\n        name: {\n          type: 'string'\n        },\n        type: {\n          type: 'string',\n          enum: [            'webhook',\n            'email',\n            'email_group'\n          ]\n        },\n        updatedAt: {\n          type: 'string'\n        },\n        userId: {\n          type: 'string'\n        }\n      },\n      required: [        'id',\n        'config',\n        'createdAt',\n        'description',\n        'groupEmails',\n        'isActive',\n        'name',\n        'type',\n        'updatedAt',\n        'userId'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      config: {
        anyOf: [
          {
            type: 'object',
            title: 'WebhookConfig',
            properties: {
              url: {
                type: 'string',
              },
              headers: {
                type: 'object',
                description: 'Custom headers to include with webhook requests',
                additionalProperties: true,
              },
              retryAttempts: {
                type: 'number',
              },
              timeout: {
                type: 'number',
              },
            },
            required: ['url'],
          },
          {
            type: 'object',
            title: 'EmailConfig',
            properties: {
              forwardTo: {
                type: 'string',
              },
              preserveHeaders: {
                type: 'boolean',
              },
            },
            required: ['forwardTo'],
          },
          {
            type: 'object',
            title: 'EmailGroupConfig',
            properties: {
              emails: {
                type: 'array',
                items: {
                  type: 'string',
                },
              },
              preserveHeaders: {
                type: 'boolean',
              },
            },
            required: ['emails'],
          },
        ],
      },
      description: {
        type: 'string',
      },
      isActive: {
        type: 'boolean',
      },
      name: {
        type: 'string',
      },
      webhookFormat: {
        type: 'string',
        enum: ['inbound', 'discord', 'slack'],
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
    idempotentHint: true,
  },
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.endpoints.update(id, body)));
  } catch (error) {
    if (error instanceof Inbound.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
