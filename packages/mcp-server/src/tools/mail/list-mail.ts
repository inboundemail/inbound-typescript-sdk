// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'inbound-docs-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'inbound-docs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inboundemail';

export const metadata: Metadata = {
  resource: 'mail',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/e2/mail/threads',
  operationId: 'getApiE2MailThreads',
};

export const tool: Tool = {
  name: 'list_mail',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nList email threads (conversations) for your inbox with cursor-based pagination. This is the primary endpoint for building an inbox UI.\n\n**What is a Thread?**\nA thread groups related emails together based on the In-Reply-To and References headers, similar to how Gmail groups conversations. Each thread contains both inbound (received) and outbound (sent) messages.\n\n**Filtering:**\n- `domain` - Filter by domain ID or name (e.g., 'example.com'). Returns threads where any participant matches the domain.\n- `address` - Filter by email address (e.g., 'user@example.com'). Returns threads where the address is a participant.\n- `search` - Search in subject lines and participant emails.\n- `unread` - Set to 'true' to only return threads with unread messages.\n\n**Pagination:**\nUses cursor-based pagination for efficient infinite scroll. Pass `pagination.next_cursor` from the response as the `cursor` parameter to get the next page.\n\n**Response:**\nEach thread includes:\n- Thread metadata (subject, participants, message count)\n- `latest_message` - Preview of the most recent message (inbound or outbound)\n- `has_unread` - Whether there are unread inbound messages\n- `unread_count` - Number of unread messages\n\n**Use with /mail/threads/:id:**\nUse this endpoint to list threads, then use `GET /mail/threads/:id` to fetch all messages in a specific thread.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/mail_list_response',\n  $defs: {\n    mail_list_response: {\n      type: 'object',\n      properties: {\n        filters: {\n          type: 'object',\n          description: 'Applied filters for this query',\n          properties: {\n            address: {\n              type: 'string',\n              description: 'Applied address filter (resolved email address)'\n            },\n            domain: {\n              type: 'string',\n              description: 'Applied domain filter (resolved domain name)'\n            },\n            search: {\n              type: 'string',\n              description: 'Applied search query'\n            },\n            unread_only: {\n              type: 'boolean',\n              description: 'Whether filtering for unread threads only'\n            }\n          }\n        },\n        pagination: {\n          type: 'object',\n          description: 'Pagination metadata for cursor-based pagination',\n          properties: {\n            has_more: {\n              type: 'boolean',\n              description: 'Whether there are more threads available after this page'\n            },\n            limit: {\n              type: 'number',\n              description: 'Number of results per page'\n            },\n            next_cursor: {\n              type: 'string',\n              description: 'Cursor to pass as the `cursor` parameter to fetch the next page. Null if no more results.'\n            }\n          },\n          required: [            'has_more',\n            'limit'\n          ]\n        },\n        threads: {\n          type: 'array',\n          description: 'Array of thread objects matching the query, sorted by last message date (newest first)',\n          items: {\n            type: 'object',\n            properties: {\n              id: {\n                type: 'string',\n                description: 'Unique identifier for the thread'\n              },\n              created_at: {\n                type: 'string',\n                description: 'ISO 8601 timestamp when the thread was created (first message received)'\n              },\n              has_unread: {\n                type: 'boolean',\n                description: 'Whether the thread has any unread inbound messages'\n              },\n              is_archived: {\n                type: 'boolean',\n                description: 'Whether the thread has been archived'\n              },\n              last_message_at: {\n                type: 'string',\n                description: 'ISO 8601 timestamp of the most recent message in the thread'\n              },\n              message_count: {\n                type: 'number',\n                description: 'Total number of messages in the thread (both inbound and outbound)'\n              },\n              participant_emails: {\n                type: 'array',\n                description: 'Array of all unique email addresses that have participated in this thread',\n                items: {\n                  type: 'string'\n                }\n              },\n              participant_names: {\n                type: 'array',\n                description: 'Array of formatted participant names in the format \\'First Last <email@domain.com>\\' or just \\'email@domain.com\\' if no name is available',\n                items: {\n                  type: 'string'\n                }\n              },\n              root_message_id: {\n                type: 'string',\n                description: 'RFC 2822 Message-ID of the first message in the thread'\n              },\n              latest_message: {\n                type: 'object',\n                properties: {\n                  id: {\n                    type: 'string',\n                    description: 'Unique identifier of the message'\n                  },\n                  from_text: {\n                    type: 'string',\n                    description: 'Formatted sender information (name and/or email)'\n                  },\n                  has_attachments: {\n                    type: 'boolean',\n                    description: 'Whether the message has any attachments'\n                  },\n                  is_read: {\n                    type: 'boolean',\n                    description: 'Whether the message has been read (always true for outbound)'\n                  },\n                  type: {\n                    type: 'string',\n                    description: 'Whether the message was received (inbound) or sent (outbound)',\n                    enum: [                      'inbound',\n                      'outbound'\n                    ]\n                  },\n                  date: {\n                    type: 'string',\n                    description: 'ISO 8601 timestamp of when the message was sent/received'\n                  },\n                  subject: {\n                    type: 'string',\n                    description: 'Subject line of the message'\n                  },\n                  text_preview: {\n                    type: 'string',\n                    description: 'First 200 characters of the message body as a preview'\n                  }\n                },\n                required: [                  'id',\n                  'from_text',\n                  'has_attachments',\n                  'is_read',\n                  'type'\n                ]\n              },\n              normalized_subject: {\n                type: 'string',\n                description: 'Normalized subject line (stripped of Re:, Fwd:, etc.) used for thread grouping'\n              },\n              unread_count: {\n                type: 'number',\n                description: 'Number of unread messages in the thread'\n              }\n            },\n            required: [              'id',\n              'created_at',\n              'has_unread',\n              'is_archived',\n              'last_message_at',\n              'message_count',\n              'participant_emails',\n              'participant_names',\n              'root_message_id'\n            ]\n          }\n        }\n      },\n      required: [        'filters',\n        'pagination',\n        'threads'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      address: {
        type: 'string',
        description:
          "Filter threads by email address. Accepts address ID (e.g., 'addr_xxx') or raw email address (e.g., 'user@example.com'). Returns threads where the address is a participant.",
      },
      cursor: {
        type: 'string',
        description:
          'Cursor for pagination. Pass the thread ID from `pagination.next_cursor` of the previous response to get the next page.',
      },
      domain: {
        type: 'string',
        description:
          "Filter threads by domain. Accepts domain ID (e.g., 'dom_xxx') or domain name (e.g., 'example.com'). Returns threads where any participant email matches the domain.",
      },
      limit: {
        type: 'string',
        description: 'Maximum number of threads to return (1-100). Default is 25.',
      },
      search: {
        type: 'string',
        description:
          'Search query to filter threads by subject or participant emails. Case-insensitive partial match.',
      },
      unread: {
        type: 'string',
        description: "Filter by unread status. Set to 'true' to only return threads with unread messages.",
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
    return asTextContentResult(await maybeFilter(jq_filter, await client.mail.list(body)));
  } catch (error) {
    if (error instanceof Inbound.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
