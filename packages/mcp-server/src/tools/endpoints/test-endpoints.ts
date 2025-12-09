// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'inbound-docs-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'inbound-docs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inboundemail';

export const metadata: Metadata = {
  resource: 'endpoints',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/e2/endpoints/{id}/test',
  operationId: 'postApiE2EndpointsByIdTest',
};

export const tool: Tool = {
  name: 'test_endpoints',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nTest an endpoint by sending a test payload. For webhooks, supports inbound, discord, and slack formats. For email endpoints, simulates the forwarding process.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/endpoint_test_response',\n  $defs: {\n    endpoint_test_response: {\n      type: 'object',\n      properties: {\n        message: {\n          type: 'string'\n        },\n        responseTime: {\n          type: 'number'\n        },\n        success: {\n          type: 'boolean'\n        },\n        error: {\n          type: 'string'\n        },\n        responseBody: {\n          type: 'string'\n        },\n        statusCode: {\n          type: 'number'\n        },\n        testPayload: {\n          type: 'object',\n          additionalProperties: true\n        },\n        urlTested: {\n          type: 'string'\n        },\n        webhookFormat: {\n          type: 'string',\n          enum: [            'inbound',\n            'discord',\n            'slack'\n          ]\n        }\n      },\n      required: [        'message',\n        'responseTime',\n        'success'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      overrideUrl: {
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
  annotations: {},
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.endpoints.test(id, body)));
  } catch (error) {
    if (error instanceof Inbound.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
