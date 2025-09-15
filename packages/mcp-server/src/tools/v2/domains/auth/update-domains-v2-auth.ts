// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'inbnd-mcp/filtering';
import { Metadata, asTextContentResult } from 'inbnd-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inbnd';

export const metadata: Metadata = {
  resource: 'v2.domains.auth',
  operation: 'write',
  tags: [],
  httpMethod: 'patch',
  httpPath: '/api/v2/domains/{id}/auth',
  operationId: 'patchDomainsById',
};

export const tool: Tool = {
  name: 'update_domains_v2_auth',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nPATCH /domains/{id}/auth\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    dnsRecords: {\n      type: 'array',\n      items: {\n        type: 'string'\n      }\n    },\n    domain: {\n      type: 'string'\n    },\n    message: {\n      type: 'string'\n    },\n    overallStatus: {\n      type: 'string',\n      enum: [        'pending',\n        'verified',\n        'failed'\n      ]\n    },\n    sesStatus: {\n      type: 'string'\n    },\n    success: {\n      type: 'boolean'\n    },\n    summary: {\n      type: 'number'\n    },\n    nextSteps: {\n      type: 'string'\n    }\n  },\n  required: [    'dnsRecords',\n    'domain',\n    'message',\n    'overallStatus',\n    'sesStatus',\n    'success',\n    'summary'\n  ]\n}\n```",
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
  annotations: {},
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.v2.domains.auth.update(id)));
};

export default { metadata, tool, handler };
