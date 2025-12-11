// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'inbound-docs-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'inbound-docs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inboundemail';

export const metadata: Metadata = {
  resource: 'domains',
  operation: 'write',
  tags: [],
  httpMethod: 'post',
  httpPath: '/api/e2/domains',
  operationId: 'postApiE2Domains',
};

export const tool: Tool = {
  name: 'create_domains',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nAdd a new domain for email receiving. Automatically initiates verification and returns required DNS records. Subdomains inherit verification from their verified parent domain.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/domain_create_response',\n  $defs: {\n    domain_create_response: {\n      type: 'object',\n      properties: {\n        id: {\n          type: 'string'\n        },\n        canReceiveEmails: {\n          type: 'boolean'\n        },\n        createdAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        dnsRecords: {\n          type: 'array',\n          items: {\n            type: 'object',\n            properties: {\n              isRequired: {\n                type: 'boolean'\n              },\n              name: {\n                type: 'string'\n              },\n              type: {\n                type: 'string'\n              },\n              value: {\n                type: 'string'\n              },\n              description: {\n                type: 'string'\n              }\n            },\n            required: [              'isRequired',\n              'name',\n              'type',\n              'value'\n            ]\n          }\n        },\n        domain: {\n          type: 'string'\n        },\n        domainProvider: {\n          type: 'string'\n        },\n        hasMxRecords: {\n          type: 'boolean'\n        },\n        providerConfidence: {\n          type: 'string'\n        },\n        status: {\n          type: 'string',\n          enum: [            'pending',\n            'verified',\n            'failed'\n          ]\n        },\n        updatedAt: {\n          type: 'string',\n          format: 'date-time'\n        },\n        dnsConflict: {\n          type: 'object',\n          properties: {\n            hasConflict: {\n              type: 'boolean'\n            },\n            message: {\n              type: 'string'\n            },\n            conflictType: {\n              type: 'string',\n              enum: [                'mx',\n                'cname',\n                'both'\n              ]\n            },\n            existingRecords: {\n              type: 'array',\n              items: {\n                type: 'object',\n                properties: {\n                  type: {\n                    type: 'string'\n                  },\n                  value: {\n                    type: 'string'\n                  }\n                },\n                required: [                  'type',\n                  'value'\n                ]\n              }\n            }\n          },\n          required: [            'hasConflict',\n            'message'\n          ]\n        },\n        mailFromDomain: {\n          type: 'string'\n        },\n        mailFromDomainStatus: {\n          type: 'string'\n        },\n        message: {\n          type: 'string'\n        },\n        parentDomain: {\n          type: 'string'\n        }\n      },\n      required: [        'id',\n        'canReceiveEmails',\n        'createdAt',\n        'dnsRecords',\n        'domain',\n        'domainProvider',\n        'hasMxRecords',\n        'providerConfidence',\n        'status',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
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
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.domains.create(body)));
  } catch (error) {
    if (error instanceof Inbound.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
