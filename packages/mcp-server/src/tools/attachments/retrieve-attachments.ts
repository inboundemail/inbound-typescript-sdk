// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'inbound-docs-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import Inbound from 'inboundemail';

export const metadata: Metadata = {
  resource: 'attachments',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/api/e2/attachments/{id}/{filename}',
  operationId: 'getApiE2AttachmentsByIdByFilename',
};

export const tool: Tool = {
  name: 'retrieve_attachments',
  description:
    'Download an email attachment by email ID and filename. Returns the binary file content with appropriate Content-Type and Content-Disposition headers.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      filename: {
        type: 'string',
      },
    },
    required: ['id', 'filename'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: Inbound, args: Record<string, unknown> | undefined) => {
  const { filename, ...body } = args as any;
  const response = await client.attachments.retrieve(filename, body).asResponse();
  return asTextContentResult(await response.text());
};

export default { metadata, tool, handler };
