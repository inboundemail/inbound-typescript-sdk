// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'inbnd-mcp/filtering';
import { Metadata, asTextContentResult } from 'inbnd-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inbnd';

export const metadata: Metadata = {
  resource: 'emails.schedule',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/v2/emails/schedule/{id}',
  operationId: 'getEmailsById',
};

export const tool: Tool = {
  name: 'retrieve_emails_schedule',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGET /emails/schedule/{id}\n\n# Response Schema\n```json\n{\n  type: 'object',\n  description: 'GET /api/v2/emails/schedule/[id]\\nGet details of a specific scheduled email\\n\\nDELETE /api/v2/emails/schedule/[id] \\nCancel a scheduled email (only if status is \\'scheduled\\')\\n\\nHas tests? ❌ (TODO)\\nHas logging? ✅\\nHas types? ✅',\n  properties: {\n    id: {\n      type: 'string'\n    },\n    attempts: {\n      type: 'number'\n    },\n    created_at: {\n      type: 'string'\n    },\n    from: {\n      type: 'string'\n    },\n    max_attempts: {\n      type: 'number'\n    },\n    scheduled_at: {\n      type: 'string'\n    },\n    status: {\n      type: 'string'\n    },\n    subject: {\n      type: 'string'\n    },\n    timezone: {\n      type: 'string'\n    },\n    to: {\n      type: 'string'\n    },\n    updated_at: {\n      type: 'string'\n    },\n    attachments: {\n      type: 'array',\n      items: {\n        type: 'string'\n      }\n    },\n    bcc: {\n      type: 'string'\n    },\n    cc: {\n      type: 'string'\n    },\n    headers: {\n      type: 'string'\n    },\n    html: {\n      type: 'string'\n    },\n    last_error: {\n      type: 'string'\n    },\n    next_retry_at: {\n      type: 'string'\n    },\n    replyTo: {\n      type: 'string'\n    },\n    sent_at: {\n      type: 'string'\n    },\n    sent_email_id: {\n      type: 'string'\n    },\n    tags: {\n      type: 'string'\n    },\n    text: {\n      type: 'string'\n    }\n  },\n  required: [    'id',\n    'attempts',\n    'created_at',\n    'from',\n    'max_attempts',\n    'scheduled_at',\n    'status',\n    'subject',\n    'timezone',\n    'to',\n    'updated_at'\n  ]\n}\n```",
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.emails.schedule.retrieve(id)));
};

export default { metadata, tool, handler };
