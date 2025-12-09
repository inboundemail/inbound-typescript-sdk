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
  httpPath: '/api/e2/emails',
  operationId: 'getApiE2Emails',
};

export const tool: Tool = {
  name: 'list_emails',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nList all email activity (sent, received, and scheduled) with comprehensive filtering options.\n\n**Type Filtering:**\n- `all` - Returns sent, received, and scheduled emails combined (default)\n- `sent` - Only outbound emails you've sent\n- `received` - Only inbound emails you've received\n- `scheduled` - Only emails scheduled for future delivery\n\n**Status Filtering:**\n- `delivered` - Successfully delivered emails\n- `pending` - Emails currently being processed\n- `failed` - Emails that failed to deliver\n- `bounced` - Emails that bounced (sent only)\n- `scheduled` - Emails scheduled for future delivery\n- `cancelled` - Cancelled scheduled emails\n- `unread` - Unread received emails\n- `read` - Read received emails\n- `archived` - Archived received emails\n\n**Time Range Filtering:**\n- `1h` - Last hour\n- `24h` - Last 24 hours\n- `7d` - Last 7 days\n- `30d` - Last 30 days (default)\n- `90d` - Last 90 days\n- `all` - All time\n\n**Address Filtering:**\nSupports filtering by domain ID, domain name, address ID, or raw email address (e.g., 'user@example.com').\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/email_list_response',\n  $defs: {\n    email_list_response: {\n      type: 'object',\n      properties: {\n        data: {\n          type: 'array',\n          description: 'Array of email objects matching the query',\n          items: {\n            type: 'object',\n            properties: {\n              id: {\n                type: 'string',\n                description: 'Unique identifier for the email'\n              },\n              created_at: {\n                type: 'string',\n                description: 'ISO 8601 timestamp when the email was created/received'\n              },\n              from: {\n                type: 'string',\n                description: 'Sender email address'\n              },\n              has_attachments: {\n                type: 'boolean',\n                description: 'Whether the email has any attachments'\n              },\n              status: {\n                type: 'string',\n                description: 'Current status of the email (delivered, pending, failed, bounced, scheduled, cancelled)'\n              },\n              subject: {\n                type: 'string',\n                description: 'Email subject line'\n              },\n              to: {\n                type: 'array',\n                description: 'Array of recipient email addresses',\n                items: {\n                  type: 'string'\n                }\n              },\n              type: {\n                type: 'string',\n                enum: [                  'sent',\n                  'received',\n                  'scheduled'\n                ]\n              },\n              attachment_count: {\n                type: 'number',\n                description: 'Number of attachments on the email'\n              },\n              cc: {\n                type: 'array',\n                description: 'Array of CC recipient email addresses',\n                items: {\n                  type: 'string'\n                }\n              },\n              from_name: {\n                type: 'string',\n                description: 'Sender display name if available'\n              },\n              is_archived: {\n                type: 'boolean',\n                description: 'Whether the email has been archived (only for received emails)'\n              },\n              is_read: {\n                type: 'boolean',\n                description: 'Whether the email has been read (only for received emails)'\n              },\n              message_id: {\n                type: 'string',\n                description: 'RFC 2822 Message-ID header value'\n              },\n              preview: {\n                type: 'string',\n                description: 'First 200 characters of the email body as a preview'\n              },\n              read_at: {\n                type: 'string',\n                description: 'ISO 8601 timestamp when the email was marked as read (only for received emails)'\n              },\n              scheduled_at: {\n                type: 'string',\n                description: 'ISO 8601 timestamp when the email is scheduled to be sent'\n              },\n              sent_at: {\n                type: 'string',\n                description: 'ISO 8601 timestamp when the email was sent'\n              },\n              thread_id: {\n                type: 'string',\n                description: 'ID of the thread this email belongs to, if threaded'\n              }\n            },\n            required: [              'id',\n              'created_at',\n              'from',\n              'has_attachments',\n              'status',\n              'subject',\n              'to',\n              'type'\n            ]\n          }\n        },\n        filters: {\n          type: 'object',\n          description: 'Applied filters for this query',\n          properties: {\n            address: {\n              type: 'string',\n              description: 'Applied address filter'\n            },\n            domain: {\n              type: 'string',\n              description: 'Applied domain filter'\n            },\n            search: {\n              type: 'string',\n              description: 'Applied search query'\n            },\n            status: {\n              type: 'string',\n              description: 'Applied status filter'\n            },\n            time_range: {\n              type: 'string',\n              description: 'Applied time range filter'\n            },\n            type: {\n              type: 'string',\n              description: 'Applied type filter'\n            }\n          }\n        },\n        pagination: {\n          type: 'object',\n          description: 'Pagination metadata',\n          properties: {\n            has_more: {\n              type: 'boolean',\n              description: 'Whether there are more results available'\n            },\n            limit: {\n              type: 'number',\n              description: 'Number of results per page'\n            },\n            offset: {\n              type: 'number',\n              description: 'Number of results skipped'\n            },\n            total: {\n              type: 'number',\n              description: 'Total number of matching emails'\n            }\n          },\n          required: [            'has_more',\n            'limit',\n            'offset',\n            'total'\n          ]\n        }\n      },\n      required: [        'data',\n        'filters',\n        'pagination'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      address: {
        type: 'string',
        description:
          "Filter by email address. Accepts address ID (e.g., 'addr_xxx') or raw email address (e.g., 'user@example.com').",
      },
      domain: {
        type: 'string',
        description:
          "Filter by domain. Accepts domain ID (e.g., 'dom_xxx') or domain name (e.g., 'example.com').",
      },
      limit: {
        type: 'string',
        description: 'Maximum number of emails to return (1-100). Default is 50.',
      },
      offset: {
        type: 'string',
        description: 'Number of emails to skip for pagination. Default is 0.',
      },
      search: {
        type: 'string',
        description:
          'Search query to filter emails by subject, sender, or recipient. Case-insensitive partial match.',
      },
      status: {
        type: 'string',
        enum: [
          'all',
          'delivered',
          'pending',
          'failed',
          'bounced',
          'scheduled',
          'cancelled',
          'unread',
          'read',
          'archived',
        ],
      },
      time_range: {
        type: 'string',
        enum: ['1h', '24h', '7d', '30d', '90d', 'all'],
      },
      type: {
        type: 'string',
        enum: ['all', 'sent', 'received', 'scheduled'],
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.emails.list(body)));
  } catch (error) {
    if (error instanceof Inbound.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
