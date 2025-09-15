// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'inbnd-mcp/filtering';
import { Metadata, asTextContentResult } from 'inbnd-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inbnd';

export const metadata: Metadata = {
  resource: 'domains.auth',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/v2/domains/{id}/auth',
  operationId: 'postDomainsById',
};

export const tool: Tool = {
  name: 'create_domains_auth',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nPOST /domains/{id}/auth\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    dkimEnabled: {\n      type: 'boolean'\n    },\n    dkimTokens: {\n      type: 'string'\n    },\n    domain: {\n      type: 'string'\n    },\n    mailFromDomain: {\n      type: 'string'\n    },\n    mailFromStatus: {\n      type: 'string'\n    },\n    message: {\n      type: 'string'\n    },\n    records: {\n      type: 'array',\n      items: {\n        type: 'string'\n      }\n    },\n    sesIdentityStatus: {\n      type: 'string'\n    },\n    success: {\n      type: 'boolean'\n    }\n  },\n  required: [    'dkimEnabled',\n    'dkimTokens',\n    'domain',\n    'mailFromDomain',\n    'mailFromStatus',\n    'message',\n    'records',\n    'sesIdentityStatus',\n    'success'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      generateDmarc: {
        type: 'boolean',
      },
      generateSpf: {
        type: 'boolean',
      },
      mailFromDomain: {
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
  return asTextContentResult(await maybeFilter(jq_filter, await client.domains.auth.create(id, body)));
};

export default { metadata, tool, handler };
