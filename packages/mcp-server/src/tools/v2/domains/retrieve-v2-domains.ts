// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'inbnd-mcp/filtering';
import { Metadata, asTextContentResult } from 'inbnd-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inbnd';

export const metadata: Metadata = {
  resource: 'v2.domains',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/v2/domains/{id}',
  operationId: 'getDomainsById',
};

export const tool: Tool = {
  name: 'retrieve_v2_domains',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGET /domains/{id}\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    id: {\n      type: 'string'\n    },\n    canReceiveEmails: {\n      type: 'boolean'\n    },\n    catchAllEndpointId: {\n      type: 'string'\n    },\n    createdAt: {\n      type: 'string'\n    },\n    domain: {\n      type: 'string'\n    },\n    domainProvider: {\n      type: 'string'\n    },\n    hasMxRecords: {\n      type: 'boolean'\n    },\n    isCatchAllEnabled: {\n      type: 'boolean'\n    },\n    lastDnsCheck: {\n      type: 'string',\n      enum: [        'Date',\n        'null'\n      ]\n    },\n    lastSesCheck: {\n      type: 'string',\n      enum: [        'Date',\n        'null'\n      ]\n    },\n    mailFromDomain: {\n      type: 'string'\n    },\n    mailFromDomainStatus: {\n      type: 'string'\n    },\n    mailFromDomainVerifiedAt: {\n      type: 'string',\n      enum: [        'Date',\n        'null'\n      ]\n    },\n    providerConfidence: {\n      type: 'string'\n    },\n    stats: {\n      type: 'string'\n    },\n    status: {\n      type: 'string'\n    },\n    updatedAt: {\n      type: 'string'\n    },\n    userId: {\n      type: 'string'\n    },\n    authRecommendations: {\n      type: 'string'\n    },\n    catchAllEndpoint: {\n      type: 'string'\n    },\n    verificationCheck: {\n      type: 'string'\n    }\n  },\n  required: [    'id',\n    'canReceiveEmails',\n    'catchAllEndpointId',\n    'createdAt',\n    'domain',\n    'domainProvider',\n    'hasMxRecords',\n    'isCatchAllEnabled',\n    'lastDnsCheck',\n    'lastSesCheck',\n    'mailFromDomain',\n    'mailFromDomainStatus',\n    'mailFromDomainVerifiedAt',\n    'providerConfidence',\n    'stats',\n    'status',\n    'updatedAt',\n    'userId'\n  ]\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      path_id: {
        type: 'string',
      },
      query_id: {
        type: 'string',
        description: 'id parameter',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['path_id', 'query_id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.v2.domains.retrieve(id, body)));
};

export default { metadata, tool, handler };
