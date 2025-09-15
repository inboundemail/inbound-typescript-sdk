// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'inbnd-mcp/filtering';
import { Metadata, asTextContentResult } from 'inbnd-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inbnd';

export const metadata: Metadata = {
  resource: 'mail',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/v2/mail/{id}',
  operationId: 'getMailById',
};

export const tool: Tool = {
  name: 'retrieve_mail',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGET /mail/{id}\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    id: {\n      type: 'string'\n    },\n    addresses: {\n      type: 'string',\n      enum: [        '{ from: import(/Users/ryanvogel/dev/inbound-org/inbound/app/api/v2/mail/[id]/route).ParsedEmailAddress',\n        'null; to: import(/Users/ryanvogel/dev/inbound-org/inbound/app/api/v2/mail/[id]/route).ParsedEmailAddress',\n        'null; cc: import(/Users/ryanvogel/dev/inbound-org/inbound/app/api/v2/mail/[id]/route).ParsedEmailAddress',\n        'null; bcc: import(/Users/ryanvogel/dev/inbound-org/inbound/app/api/v2/mail/[id]/route).ParsedEmailAddress',\n        'null; replyTo: import(/Users/ryanvogel/dev/inbound-org/inbound/app/api/v2/mail/[id]/route).ParsedEmailAddress',\n        'null; }'\n      ]\n    },\n    bcc: {\n      type: 'string'\n    },\n    cc: {\n      type: 'string'\n    },\n    content: {\n      type: 'string'\n    },\n    createdAt: {\n      type: 'string',\n      enum: [        'Date',\n        'null'\n      ]\n    },\n    emailId: {\n      type: 'string'\n    },\n    from: {\n      type: 'string'\n    },\n    fromName: {\n      type: 'string'\n    },\n    isRead: {\n      type: 'boolean'\n    },\n    messageId: {\n      type: 'string'\n    },\n    metadata: {\n      type: 'string'\n    },\n    processing: {\n      type: 'string'\n    },\n    readAt: {\n      type: 'string',\n      enum: [        'Date',\n        'null'\n      ]\n    },\n    receivedAt: {\n      type: 'string',\n      enum: [        'Date',\n        'null'\n      ]\n    },\n    recipient: {\n      type: 'string'\n    },\n    replyTo: {\n      type: 'string'\n    },\n    security: {\n      type: 'string'\n    },\n    subject: {\n      type: 'string'\n    },\n    to: {\n      type: 'string'\n    },\n    updatedAt: {\n      type: 'string',\n      enum: [        'Date',\n        'null'\n      ]\n    }\n  },\n  required: [    'id',\n    'addresses',\n    'bcc',\n    'cc',\n    'content',\n    'createdAt',\n    'emailId',\n    'from',\n    'fromName',\n    'isRead',\n    'messageId',\n    'metadata',\n    'processing',\n    'readAt',\n    'receivedAt',\n    'recipient',\n    'replyTo',\n    'security',\n    'subject',\n    'to',\n    'updatedAt'\n  ]\n}\n```",
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.mail.retrieve(id)));
};

export default { metadata, tool, handler };
