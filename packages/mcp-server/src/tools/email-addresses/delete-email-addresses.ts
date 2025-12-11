// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'inbound-docs-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'inbound-docs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inboundemail';

export const metadata: Metadata = {
  resource: 'email_addresses',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/api/e2/email-addresses/{id}',
  operationId: 'deleteApiE2Email-addressesById',
};

export const tool: Tool = {
  name: 'delete_email_addresses',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nDelete an email address. Returns cleanup status.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/email_address_delete_response',\n  $defs: {\n    email_address_delete_response: {\n      type: 'object',\n      properties: {\n        cleanup: {\n          type: 'object',\n          properties: {\n            domain: {\n              type: 'string'\n            },\n            emailAddress: {\n              type: 'string'\n            },\n            sesRuleUpdated: {\n              type: 'boolean'\n            },\n            warning: {\n              type: 'string'\n            }\n          },\n          required: [            'domain',\n            'emailAddress',\n            'sesRuleUpdated'\n          ]\n        },\n        message: {\n          type: 'string'\n        }\n      },\n      required: [        'cleanup',\n        'message'\n      ]\n    }\n  }\n}\n```",
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
    return asTextContentResult(await maybeFilter(jq_filter, await client.emailAddresses.delete(id)));
  } catch (error) {
    if (error instanceof Inbound.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
