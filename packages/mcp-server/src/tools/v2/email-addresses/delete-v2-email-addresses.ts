// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'inbnd-mcp/filtering';
import { Metadata, asTextContentResult } from 'inbnd-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inbnd';

export const metadata: Metadata = {
  resource: 'v2.email_addresses',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/api/v2/email-addresses/{id}',
  operationId: 'deleteEmailAddressesById',
};

export const tool: Tool = {
  name: 'delete_v2_email_addresses',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nDELETE /email-addresses/{id}\n\n# Response Schema\n```json\n{\n  type: 'object',\n  description: 'DELETE /api/v2/email-addresses/[id]\\nDeletes an email address and cleans up SES rules\\nSupports both session-based auth and API key auth\\nHas tests? ⏳\\nHas logging? ✅\\nHas types? ✅',\n  properties: {\n    cleanup: {\n      type: 'string'\n    },\n    message: {\n      type: 'string'\n    }\n  },\n  required: [    'cleanup',\n    'message'\n  ]\n}\n```",
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
    idempotentHint: true,
  },
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.v2.emailAddresses.delete(id)));
};

export default { metadata, tool, handler };
