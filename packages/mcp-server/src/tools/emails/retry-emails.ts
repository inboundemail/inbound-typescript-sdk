// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'inbound-docs-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'inbound-docs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inboundemail';

export const metadata: Metadata = {
  resource: 'emails',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/e2/emails/{id}/retry',
  operationId: 'postApiE2EmailsByIdRetry',
};

export const tool: Tool = {
  name: 'retry_emails',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetry delivery of a received email. Can retry to a specific endpoint, retry a specific failed delivery, or retry to all configured endpoints.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/email_retry_response',\n  $defs: {\n    email_retry_response: {\n      type: 'object',\n      properties: {\n        message: {\n          type: 'string'\n        },\n        success: {\n          type: 'boolean'\n        },\n        delivery_id: {\n          type: 'string'\n        }\n      },\n      required: [        'message',\n        'success'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      delivery_id: {
        type: 'string',
        description: 'Specific delivery ID to retry. If provided, retries that specific delivery.',
      },
      endpoint_id: {
        type: 'string',
        description:
          'Endpoint ID to retry delivery to. If not provided, retries to all configured endpoints.',
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
    return asTextContentResult(await maybeFilter(jq_filter, await client.emails.retry(id, body)));
  } catch (error) {
    if (error instanceof Inbound.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
