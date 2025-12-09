// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'inbound-docs-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'inbound-docs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inboundemail';

export const metadata: Metadata = {
  resource: 'emails',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/e2/emails/{id}',
  operationId: 'getApiE2EmailsById',
};

export const tool: Tool = {
  name: 'retrieve_emails',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nRetrieve a single email by ID. Works for sent, received, and scheduled emails.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/email_retrieve_response',\n  $defs: {\n    email_retrieve_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        created_at: {\n          type: 'string'\n        },\n        from: {\n          type: 'string'\n        },\n        has_attachments: {\n          type: 'boolean'\n        },\n        object: {\n          type: 'string',\n          enum: [            'email'\n          ]\n        },\n        status: {\n          type: 'string'\n        },\n        subject: {\n          type: 'string'\n        },\n        to: {\n          type: 'array',\n          items: {\n            type: 'string'\n          }\n        },\n        type: {\n          type: 'string',\n          enum: [            'sent',\n            'received',\n            'scheduled'\n          ]\n        },\n        attachments: {\n          type: 'array',\n          items: {\n            type: 'object',\n            additionalProperties: true\n          }\n        },\n        bcc: {\n          type: 'array',\n          items: {\n            type: 'string'\n          }\n        },\n        cc: {\n          type: 'array',\n          items: {\n            type: 'string'\n          }\n        },\n        headers: {\n          type: 'object',\n          additionalProperties: true\n        },\n        html: {\n          type: 'string'\n        },\n        is_read: {\n          type: 'boolean'\n        },\n        reply_to: {\n          type: 'array',\n          items: {\n            type: 'string'\n          }\n        },\n        scheduled_at: {\n          type: 'string'\n        },\n        sent_at: {\n          type: 'string'\n        },\n        tags: {\n          type: 'array',\n          items: {\n            type: 'object',\n            additionalProperties: true\n          }\n        },\n        text: {\n          type: 'string'\n        },\n        thread_id: {\n          type: 'string'\n        },\n        thread_position: {\n          type: 'number'\n        }\n      },\n      required: [        'id',\n        'created_at',\n        'from',\n        'has_attachments',\n        'object',\n        'status',\n        'subject',\n        'to',\n        'type'\n      ]\n    }\n  }\n}\n```",
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
    return asTextContentResult(await maybeFilter(jq_filter, await client.emails.retrieve(id)));
  } catch (error) {
    if (error instanceof Inbound.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
