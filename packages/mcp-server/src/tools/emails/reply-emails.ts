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
  httpPath: '/api/e2/emails/{id}/reply',
  operationId: 'postApiE2EmailsByIdReply',
};

export const tool: Tool = {
  name: 'reply_emails',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nReply to an email or thread. Accepts either an email ID or thread ID (replies to latest message in thread). Supports reply all functionality.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/email_reply_response',\n  $defs: {\n    email_reply_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        aws_message_id: {\n          type: 'string'\n        },\n        is_thread_reply: {\n          type: 'boolean'\n        },\n        message_id: {\n          type: 'string'\n        },\n        replied_to_email_id: {\n          type: 'string'\n        },\n        replied_to_thread_id: {\n          type: 'string'\n        }\n      },\n      required: [        'id',\n        'aws_message_id',\n        'is_thread_reply',\n        'message_id',\n        'replied_to_email_id'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Email ID or Thread ID to reply to',
      },
      from: {
        type: 'string',
        description: 'Sender email address',
      },
      attachments: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            content: {
              type: 'string',
            },
            filename: {
              type: 'string',
            },
            content_type: {
              type: 'string',
            },
            path: {
              type: 'string',
            },
          },
          required: ['content', 'filename'],
        },
      },
      headers: {
        type: 'object',
        description: 'Custom email headers',
        additionalProperties: true,
      },
      html: {
        type: 'string',
        description: 'HTML content of the email',
      },
      reply_all: {
        type: 'boolean',
        description: 'Include original CC recipients',
      },
      subject: {
        type: 'string',
        description: 'Email subject - defaults to Re: original subject',
      },
      tags: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            value: {
              type: 'string',
            },
          },
          required: ['name', 'value'],
        },
      },
      text: {
        type: 'string',
        description: 'Plain text content of the email',
      },
      to: {
        anyOf: [
          {
            type: 'string',
          },
          {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        ],
        description: 'Recipient email address(es) - defaults to original sender',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id', 'from'],
  },
  annotations: {},
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.emails.reply(id, body)));
  } catch (error) {
    if (error instanceof Inbound.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
