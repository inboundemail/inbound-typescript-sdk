// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'inbnd-mcp/filtering';
import { Metadata, asTextContentResult } from 'inbnd-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inbnd';

export const metadata: Metadata = {
  resource: 'domains',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/v2/domains',
  operationId: 'postDomains',
};

export const tool: Tool = {
  name: 'create_domains',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nPOST /domains\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    id: {\n      type: 'string'\n    },\n    canReceiveEmails: {\n      type: 'boolean'\n    },\n    createdAt: {\n      type: 'string'\n    },\n    dnsRecords: {\n      type: 'string'\n    },\n    domain: {\n      type: 'string'\n    },\n    domainProvider: {\n      type: 'string'\n    },\n    hasMxRecords: {\n      type: 'boolean'\n    },\n    providerConfidence: {\n      type: 'string'\n    },\n    status: {\n      type: 'string',\n      enum: [        'pending',\n        'verified',\n        'failed'\n      ]\n    },\n    updatedAt: {\n      type: 'string'\n    },\n    mailFromDomain: {\n      type: 'string'\n    },\n    mailFromDomainStatus: {\n      type: 'string'\n    }\n  },\n  required: [    'id',\n    'canReceiveEmails',\n    'createdAt',\n    'dnsRecords',\n    'domain',\n    'domainProvider',\n    'hasMxRecords',\n    'providerConfidence',\n    'status',\n    'updatedAt'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      domain: {
        type: 'string',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['domain'],
  },
  annotations: {},
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.domains.create(body)));
};

export default { metadata, tool, handler };
