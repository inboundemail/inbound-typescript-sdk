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
  httpPath: '/api/e2/domains/{id}',
  operationId: 'getApiE2DomainsById',
};

export const tool: Tool = {
  name: 'retrieve_domains',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nGet detailed information about a specific domain including DNS records. Use `?check=true` for live DNS and SES verification.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/domain_retrieve_response',\n  $defs: {\n    domain_retrieve_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        canReceiveEmails: {\n          type: 'boolean'\n        },\n        catchAllEndpointId: {\n          type: 'string'\n        },\n        createdAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        dnsRecords: {\n          type: 'array',\n          items: {\n            type: 'object',\n            properties: {\n              id: {\n                type: 'string'\n              },\n              createdAt: {\n                type: 'string',\n                format: 'date-time'\n              },\n              domainId: {\n                type: 'string'\n              },\n              isRequired: {\n                type: 'boolean'\n              },\n              isVerified: {\n                type: 'boolean'\n              },\n              lastChecked: {\n                type: 'string',\n                format: 'date-time'\n              },\n              name: {\n                type: 'string'\n              },\n              recordType: {\n                type: 'string'\n              },\n              value: {\n                type: 'string'\n              }\n            },\n            required: [              'id',\n              'createdAt',\n              'domainId',\n              'isRequired',\n              'isVerified',\n              'lastChecked',\n              'name',\n              'recordType',\n              'value'\n            ]\n          }\n        },\n        domain: {\n          type: 'string'\n        },\n        domainProvider: {\n          type: 'string'\n        },\n        hasMxRecords: {\n          type: 'boolean'\n        },\n        isCatchAllEnabled: {\n          type: 'boolean'\n        },\n        lastDnsCheck: {\n          type: 'string',\n          format: 'date-time'\n        },\n        lastSesCheck: {\n          type: 'string',\n          format: 'date-time'\n        },\n        mailFromDomain: {\n          type: 'string'\n        },\n        mailFromDomainStatus: {\n          type: 'string'\n        },\n        mailFromDomainVerifiedAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        providerConfidence: {\n          type: 'string'\n        },\n        receiveDmarcEmails: {\n          type: 'boolean'\n        },\n        stats: {\n          type: 'object',\n          properties: {\n            activeEmailAddresses: {\n              type: 'number'\n            },\n            emailsLast24h: {\n              type: 'number'\n            },\n            emailsLast30d: {\n              type: 'number'\n            },\n            emailsLast7d: {\n              type: 'number'\n            },\n            totalEmailAddresses: {\n              type: 'number'\n            }\n          },\n          required: [            'activeEmailAddresses',\n            'emailsLast24h',\n            'emailsLast30d',\n            'emailsLast7d',\n            'totalEmailAddresses'\n          ]\n        },\n        status: {\n          type: 'string'\n        },\n        updatedAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        userId: {\n          type: 'string'\n        },\n        authRecommendations: {\n          type: 'object',\n          properties: {\n            dmarc: {\n              type: 'object',\n              properties: {\n                description: {\n                  type: 'string'\n                },\n                name: {\n                  type: 'string'\n                },\n                value: {\n                  type: 'string'\n                }\n              },\n              required: [                'description',\n                'name',\n                'value'\n              ]\n            },\n            spf: {\n              type: 'object',\n              properties: {\n                description: {\n                  type: 'string'\n                },\n                name: {\n                  type: 'string'\n                },\n                value: {\n                  type: 'string'\n                }\n              },\n              required: [                'description',\n                'name',\n                'value'\n              ]\n            }\n          }\n        },\n        catchAllEndpoint: {\n          type: 'object',\n          properties: {\n            id: {\n              type: 'string'\n            },\n            isActive: {\n              type: 'boolean'\n            },\n            name: {\n              type: 'string'\n            },\n            type: {\n              type: 'string'\n            }\n          },\n          required: [            'id',\n            'isActive',\n            'name',\n            'type'\n          ]\n        },\n        inheritsFromParent: {\n          type: 'boolean'\n        },\n        parentDomain: {\n          type: 'string'\n        },\n        verificationCheck: {\n          type: 'object',\n          properties: {\n            dnsRecords: {\n              type: 'array',\n              items: {\n                type: 'object',\n                properties: {\n                  isVerified: {\n                    type: 'boolean'\n                  },\n                  name: {\n                    type: 'string'\n                  },\n                  type: {\n                    type: 'string'\n                  },\n                  value: {\n                    type: 'string'\n                  },\n                  error: {\n                    type: 'string'\n                  }\n                },\n                required: [                  'isVerified',\n                  'name',\n                  'type',\n                  'value'\n                ]\n              }\n            },\n            isFullyVerified: {\n              type: 'boolean'\n            },\n            lastChecked: {\n              type: 'string',\n              format: 'date-time'\n            },\n            sesStatus: {\n              type: 'string'\n            },\n            dkimStatus: {\n              type: 'string'\n            },\n            dkimTokens: {\n              type: 'array',\n              items: {\n                type: 'string'\n              }\n            },\n            dkimVerified: {\n              type: 'boolean'\n            },\n            mailFromDomain: {\n              type: 'string'\n            },\n            mailFromStatus: {\n              type: 'string'\n            },\n            mailFromVerified: {\n              type: 'boolean'\n            }\n          },\n          required: [            'dnsRecords',\n            'isFullyVerified',\n            'lastChecked',\n            'sesStatus'\n          ]\n        }\n      },\n      required: [        'id',\n        'canReceiveEmails',\n        'catchAllEndpointId',\n        'createdAt',\n        'dnsRecords',\n        'domain',\n        'domainProvider',\n        'hasMxRecords',\n        'isCatchAllEnabled',\n        'lastDnsCheck',\n        'lastSesCheck',\n        'mailFromDomain',\n        'mailFromDomainStatus',\n        'mailFromDomainVerifiedAt',\n        'providerConfidence',\n        'receiveDmarcEmails',\n        'stats',\n        'status',\n        'updatedAt',\n        'userId'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      check: {
        type: 'string',
        enum: ['true'],
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
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.domains.retrieve(id, body)));
  } catch (error) {
    if (error instanceof Inbound.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
