// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'inbound-docs-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'inbound-docs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inboundemail';

export const metadata: Metadata = {
  resource: 'domains',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/api/e2/domains/{id}',
  operationId: 'patchApiE2DomainsById',
};

export const tool: Tool = {
  name: 'update_domains',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nUpdate catch-all email settings for a domain. Catch-all receives emails sent to any address on your domain. Domain must be verified first.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/domain_update_response',\n  $defs: {\n    domain_update_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        catchAllEndpointId: {\n          type: 'string'\n        },\n        domain: {\n          type: 'string'\n        },\n        isCatchAllEnabled: {\n          type: 'boolean'\n        },\n        status: {\n          type: 'string'\n        },\n        updatedAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        catchAllEndpoint: {\n          type: 'object',\n          properties: {\n            id: {\n              type: 'string'\n            },\n            isActive: {\n              type: 'boolean'\n            },\n            name: {\n              type: 'string'\n            },\n            type: {\n              type: 'string'\n            }\n          },\n          required: [            'id',\n            'isActive',\n            'name',\n            'type'\n          ]\n        }\n      },\n      required: [        'id',\n        'catchAllEndpointId',\n        'domain',\n        'isCatchAllEnabled',\n        'status',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      isCatchAllEnabled: {
        type: 'boolean',
      },
      catchAllEndpointId: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id', 'isCatchAllEnabled'],
  },
  annotations: {},
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.domains.update(id, body)));
  } catch (error) {
    if (error instanceof Inbound.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
