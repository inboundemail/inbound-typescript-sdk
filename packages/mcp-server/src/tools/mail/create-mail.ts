// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'inbnd-mcp/filtering';
import { Metadata, asTextContentResult } from 'inbnd-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inbnd';

export const metadata: Metadata = {
  resource: 'mail',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/v2/mail',
  operationId: 'postMail',
};

export const tool: Tool = {
  name: 'create_mail',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nPOST /mail\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    message: {\n      type: 'string'\n    },\n    originalEmailId: {\n      type: 'string'\n    },\n    replyData: {\n      type: 'string'\n    },\n    status: {\n      type: 'string'\n    }\n  },\n  required: [    'message',\n    'originalEmailId',\n    'replyData',\n    'status'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      emailId: {
        type: 'string',
      },
      subject: {
        type: 'string',
      },
      to: {
        type: 'string',
      },
      attachments: {
        type: 'string',
      },
      htmlBody: {
        type: 'string',
      },
      textBody: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['emailId', 'subject', 'to'],
  },
  annotations: {},
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.mail.create(body)));
};

export default { metadata, tool, handler };
