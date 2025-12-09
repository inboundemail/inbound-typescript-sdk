// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'inbound-docs-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'inbound-docs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inboundemail';

export const metadata: Metadata = {
  resource: 'endpoints',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/api/e2/endpoints/{id}',
  operationId: 'deleteApiE2EndpointsById',
};

export const tool: Tool = {
  name: 'delete_endpoints',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nDelete an endpoint and clean up associated resources (email addresses become store-only, domains lose catch-all config, group entries and delivery history are deleted)\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/endpoint_delete_response',\n  $defs: {\n    endpoint_delete_response: {\n      type: 'object',\n      properties: {\n        cleanup: {\n          type: 'object',\n          properties: {\n            deliveriesDeleted: {\n              type: 'number'\n            },\n            domains: {\n              type: 'array',\n              items: {\n                type: 'string'\n              }\n            },\n            domainsUpdated: {\n              type: 'number'\n            },\n            emailAddresses: {\n              type: 'array',\n              items: {\n                type: 'string'\n              }\n            },\n            emailAddressesUpdated: {\n              type: 'number'\n            },\n            groupEmailsDeleted: {\n              type: 'number'\n            }\n          },\n          required: [            'deliveriesDeleted',\n            'domains',\n            'domainsUpdated',\n            'emailAddresses',\n            'emailAddressesUpdated',\n            'groupEmailsDeleted'\n          ]\n        },\n        message: {\n          type: 'string'\n        }\n      },\n      required: [        'cleanup',\n        'message'\n      ]\n    }\n  }\n}\n```",
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
    idempotentHint: true,
  },
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.endpoints.delete(id)));
  } catch (error) {
    if (error instanceof Inbound.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
