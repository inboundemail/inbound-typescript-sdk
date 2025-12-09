// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'inbound-docs-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'inbound-docs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inboundemail';

export const metadata: Metadata = {
  resource: 'domains',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/e2/domains',
  operationId: 'getApiE2Domains',
};

export const tool: Tool = {
  name: 'list_domains',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet paginated list of domains for authenticated user with optional filtering.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/domain_list_response',\n  $defs: {\n    domain_list_response: {\n      type: 'object',\n      properties: {\n        data: {\n          type: 'array',\n          items: {\n            type: 'object',\n            properties: {\n              id: {\n                type: 'string'\n              },\n              canReceiveEmails: {\n                type: 'boolean'\n              },\n              catchAllEndpointId: {\n                type: 'string'\n              },\n              createdAt: {\n                type: 'string',\n                format: 'date-time'\n              },\n              domain: {\n                type: 'string'\n              },\n              domainProvider: {\n                type: 'string'\n              },\n              hasMxRecords: {\n                type: 'boolean'\n              },\n              isCatchAllEnabled: {\n                type: 'boolean'\n              },\n              lastDnsCheck: {\n                type: 'string',\n                format: 'date-time'\n              },\n              lastSesCheck: {\n                type: 'string',\n                format: 'date-time'\n              },\n              mailFromDomain: {\n                type: 'string'\n              },\n              mailFromDomainStatus: {\n                type: 'string'\n              },\n              mailFromDomainVerifiedAt: {\n                type: 'string',\n                format: 'date-time'\n              },\n              providerConfidence: {\n                type: 'string'\n              },\n              receiveDmarcEmails: {\n                type: 'boolean'\n              },\n              stats: {\n                type: 'object',\n                properties: {\n                  activeEmailAddresses: {\n                    type: 'number'\n                  },\n                  hasCatchAll: {\n                    type: 'boolean'\n                  },\n                  totalEmailAddresses: {\n                    type: 'number'\n                  }\n                },\n                required: [                  'activeEmailAddresses',\n                  'hasCatchAll',\n                  'totalEmailAddresses'\n                ]\n              },\n              status: {\n                type: 'string'\n              },\n              updatedAt: {\n                type: 'string',\n                format: 'date-time'\n              },\n              userId: {\n                type: 'string'\n              },\n              catchAllEndpoint: {\n                type: 'object',\n                properties: {\n                  id: {\n                    type: 'string'\n                  },\n                  isActive: {\n                    type: 'boolean'\n                  },\n                  name: {\n                    type: 'string'\n                  },\n                  type: {\n                    type: 'string'\n                  }\n                },\n                required: [                  'id',\n                  'isActive',\n                  'name',\n                  'type'\n                ]\n              },\n              verificationCheck: {\n                type: 'object',\n                properties: {\n                  dnsRecords: {\n                    type: 'array',\n                    items: {\n                      type: 'object',\n                      properties: {\n                        isVerified: {\n                          type: 'boolean'\n                        },\n                        name: {\n                          type: 'string'\n                        },\n                        type: {\n                          type: 'string'\n                        },\n                        value: {\n                          type: 'string'\n                        },\n                        error: {\n                          type: 'string'\n                        }\n                      },\n                      required: [                        'isVerified',\n                        'name',\n                        'type',\n                        'value'\n                      ]\n                    }\n                  },\n                  isFullyVerified: {\n                    type: 'boolean'\n                  },\n                  lastChecked: {\n                    type: 'string',\n                    format: 'date-time'\n                  },\n                  sesStatus: {\n                    type: 'string'\n                  }\n                },\n                required: [                  'dnsRecords',\n                  'isFullyVerified',\n                  'lastChecked',\n                  'sesStatus'\n                ]\n              }\n            },\n            required: [              'id',\n              'canReceiveEmails',\n              'catchAllEndpointId',\n              'createdAt',\n              'domain',\n              'domainProvider',\n              'hasMxRecords',\n              'isCatchAllEnabled',\n              'lastDnsCheck',\n              'lastSesCheck',\n              'mailFromDomain',\n              'mailFromDomainStatus',\n              'mailFromDomainVerifiedAt',\n              'providerConfidence',\n              'receiveDmarcEmails',\n              'stats',\n              'status',\n              'updatedAt',\n              'userId'\n            ]\n          }\n        },\n        pagination: {\n          type: 'object',\n          properties: {\n            hasMore: {\n              type: 'boolean'\n            },\n            limit: {\n              type: 'number'\n            },\n            offset: {\n              type: 'number'\n            },\n            total: {\n              type: 'number'\n            }\n          },\n          required: [            'hasMore',\n            'limit',\n            'offset',\n            'total'\n          ]\n        }\n      },\n      required: [        'data',\n        'pagination'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      canReceive: {
        type: 'string',
        enum: ['true', 'false'],
      },
      check: {
        type: 'string',
        enum: ['true'],
      },
      limit: {
        anyOf: [
          {
            type: 'string',
          },
          {
            type: 'integer',
          },
        ],
      },
      offset: {
        anyOf: [
          {
            type: 'string',
          },
          {
            type: 'integer',
          },
        ],
      },
      status: {
        type: 'string',
        enum: ['pending', 'verified', 'failed'],
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
    return asTextContentResult(await maybeFilter(jq_filter, await client.domains.list(body)));
  } catch (error) {
    if (error instanceof Inbound.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
