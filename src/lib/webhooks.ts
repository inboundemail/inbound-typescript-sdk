import type { Inbound } from '../client';

/**
 * Email address with optional name
 */
export interface InboundEmailAddress {
  address: string;
  name: string | null;
}

/**
 * Address group containing text representation and parsed addresses
 */
export interface InboundAddressGroup {
  text: string;
  addresses: InboundEmailAddress[];
}

/**
 * Email attachment metadata
 */
export interface InboundEmailAttachment {
  filename: string;
  contentType: string;
  size: number;
  contentId: string | null;
  contentDisposition: 'attachment' | 'inline';
  downloadUrl: string;
}

/**
 * Parsed email data with full content
 */
export interface InboundParsedEmailData {
  messageId: string;
  date: Date;
  subject: string;
  from: InboundAddressGroup;
  to: InboundAddressGroup;
  cc: InboundAddressGroup | null;
  bcc: InboundAddressGroup | null;
  replyTo: InboundAddressGroup | null;
  inReplyTo: string | undefined;
  references: string | string[] | undefined;
  textBody: string | null;
  htmlBody: string | null;
  raw: string;
  attachments: InboundEmailAttachment[];
  headers: Record<string, string>;
  priority: string | undefined;
}

/**
 * Cleaned email content with processed HTML/text
 */
export interface InboundCleanedContent {
  html: string | null;
  text: string | null;
  hasHtml: boolean;
  hasText: boolean;
  attachments: InboundEmailAttachment[];
  headers: Record<string, string>;
}

/**
 * Full email object in webhook payload
 */
export interface InboundWebhookEmail {
  id: string;
  messageId: string;
  from: InboundAddressGroup;
  to: InboundAddressGroup;
  recipient: string;
  subject: string;
  receivedAt: string;
  parsedData: InboundParsedEmailData;
  cleanedContent: InboundCleanedContent;
}

/**
 * Endpoint information in webhook payload
 */
export interface InboundWebhookEndpoint {
  id: string;
  name: string;
  type: 'webhook' | 'email' | 'email_group';
}

/**
 * Webhook event types
 */
export type InboundWebhookEvent = 'email.received';

/**
 * Complete webhook payload sent to your endpoint when an email is received
 */
export interface InboundWebhookPayload {
  event: InboundWebhookEvent;
  timestamp: string;
  email: InboundWebhookEmail;
  endpoint: InboundWebhookEndpoint;
}

/**
 * Headers sent with every webhook request for verification
 */
export interface InboundWebhookHeaders {
  'x-webhook-verification-token': string;
  'x-endpoint-id': string;
  'x-webhook-event': string;
  'x-webhook-timestamp': string;
}

/**
 * Verifies that a webhook request is authentic by checking the verification token
 * against the endpoint configuration.
 *
 * @param headers - The request headers (can be Headers object or plain object)
 * @param client - An initialized Inbound client
 * @returns Promise<boolean> - true if the webhook is valid, false otherwise
 *
 * @example
 * ```typescript
 * import { Inbound, verifyWebhookFromHeaders } from 'inboundemail';
 *
 * const inbound = new Inbound(process.env.INBOUND_API_KEY!);
 *
 * export async function POST(request: Request) {
 *   const isValid = await verifyWebhookFromHeaders(request.headers, inbound);
 *
 *   if (!isValid) {
 *     return new Response('Unauthorized', { status: 401 });
 *   }
 *
 *   const payload: InboundWebhookPayload = await request.json();
 *   // Process the verified webhook...
 * }
 * ```
 */
export async function verifyWebhookFromHeaders(
  headers: Headers | Record<string, string | string[] | undefined>,
  client: Inbound,
): Promise<boolean> {
  const getHeader = (name: string): string | null => {
    if (headers instanceof Headers) {
      return headers.get(name);
    }
    const value = headers[name] ?? headers[name.toLowerCase()];
    if (Array.isArray(value)) {
      return value[0] ?? null;
    }
    return value ?? null;
  };

  const verificationToken = getHeader('x-webhook-verification-token');
  const endpointId = getHeader('x-endpoint-id');

  if (!verificationToken || !endpointId) {
    return false;
  }

  try {
    const endpoint = await client.endpoints.retrieve(endpointId);

    // Check if the endpoint has a verification token in its config
    const config = endpoint.config as { verificationToken?: string } | null;
    if (!config || typeof config !== 'object') {
      return false;
    }

    return config.verificationToken === verificationToken;
  } catch {
    return false;
  }
}
