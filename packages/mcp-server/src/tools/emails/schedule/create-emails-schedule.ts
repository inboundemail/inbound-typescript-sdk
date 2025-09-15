// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'inbnd-mcp/filtering';
import { Metadata, asTextContentResult } from 'inbnd-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inbnd';

export const metadata: Metadata = {
  resource: 'emails.schedule',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/v2/emails/schedule',
  operationId: 'postEmails',
};

export const tool: Tool = {
  name: 'create_emails_schedule',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nPOST /emails/schedule\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    id: {\n      type: 'string'\n    },\n    scheduled_at: {\n      type: 'string'\n    },\n    status: {\n      type: 'string'\n    },\n    timezone: {\n      type: 'string'\n    }\n  },\n  required: [    'id',\n    'scheduled_at',\n    'status',\n    'timezone'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      from: {
        type: 'string',
      },
      scheduled_at: {
        type: 'string',
      },
      subject: {
        type: 'string',
      },
      to: {
        type: 'string',
      },
      attachments: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
      bcc: {
        type: 'string',
      },
      cc: {
        type: 'string',
      },
      headers: {
        type: 'string',
      },
      html: {
        type: 'string',
      },
      reply_to: {
        type: 'string',
      },
      replyTo: {
        type: 'string',
      },
      tags: {
        type: 'string',
      },
      text: {
        type: 'string',
      },
      timezone: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['from', 'scheduled_at', 'subject', 'to'],
  },
  annotations: {},
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.emails.schedule.create(body)));
};

export default { metadata, tool, handler };
