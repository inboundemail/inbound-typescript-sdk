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
  httpPath: '/api/e2/emails',
  operationId: 'postApiE2Emails',
};

export const tool: Tool = {
  name: 'send_emails',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nSend an email immediately or schedule it for later using the scheduled_at parameter. Supports HTML/text content, attachments, and custom headers.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/email_send_response',\n  $defs: {\n    email_send_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        message_id: {\n          type: 'string'\n        }\n      },\n      required: [        'id'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      from: {
        type: 'string',
        description: 'Sender email address',
      },
      subject: {
        type: 'string',
        description: 'Email subject',
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
        description: 'Recipient email address(es)',
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
      bcc: {
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
      },
      cc: {
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
      reply_to: {
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
      },
      scheduled_at: {
        type: 'string',
        description: 'ISO 8601 date or natural language for scheduling',
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
      timezone: {
        type: 'string',
        description: 'Timezone for natural language parsing',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['from', 'subject', 'to'],
  },
  annotations: {},
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.emails.send(body)));
  } catch (error) {
    if (error instanceof Inbound.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
