// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from 'inbound-docs-mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from 'inbound-docs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inboundemail';

export const metadata: Metadata = {
  resource: 'domains',
  operation: 'write',
  tags: [],
  httpMethod: 'delete',
  httpPath: '/api/e2/domains/{id}',
  operationId: 'deleteApiE2DomainsById',
};

export const tool: Tool = {
  name: 'delete_domains',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nDelete a domain and all associated resources including email addresses, DNS records, and SES configurations. Root domains with subdomains must have subdomains deleted first.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/domain_delete_response',\n  $defs: {\n    domain_delete_response: {\n      type: 'object',\n      properties: {\n        deletedResources: {\n          type: 'object',\n          properties: {\n            blockedEmails: {\n              type: 'number'\n            },\n            dnsRecords: {\n              type: 'number'\n            },\n            domain: {\n              type: 'string'\n            },\n            emailAddresses: {\n              type: 'number'\n            },\n            sesIdentity: {\n              type: 'boolean'\n            },\n            sesReceiptRules: {\n              type: 'boolean'\n            }\n          },\n          required: [            'blockedEmails',\n            'dnsRecords',\n            'domain',\n            'emailAddresses',\n            'sesIdentity',\n            'sesReceiptRules'\n          ]\n        },\n        message: {\n          type: 'string'\n        },\n        success: {\n          type: 'boolean'\n        }\n      },\n      required: [        'deletedResources',\n        'message',\n        'success'\n      ]\n    }\n  }\n}\n```",
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
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await client.domains.delete(id)));
  } catch (error) {
    if (error instanceof Inbound.APIError || isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
