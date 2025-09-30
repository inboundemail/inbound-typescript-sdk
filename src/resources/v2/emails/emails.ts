// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ScheduleAPI from './schedule';
import {
  Schedule,
  ScheduleCancelResponse,
  ScheduleCreateParams,
  ScheduleCreateResponse,
  ScheduleListParams,
  ScheduleListResponse,
  ScheduleRetrieveResponse,
} from './schedule';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Emails extends APIResource {
  schedule: ScheduleAPI.Schedule = new ScheduleAPI.Schedule(this._client);

  /**
   * Retrieves a single sent email by its ID. Returns email metadata including
   * recipients, subject, content, and delivery status. Only emails belonging to the
   * authenticated user can be accessed. Response format is Resend-compatible for
   * easy migration from other email services.
   *
   * @example
   * ```ts
   * const email = await client.v2.emails.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<EmailRetrieveResponse> {
    return this._client.get(path`/api/v2/emails/${id}`, options);
  }

  /**
   * Sends a reply to an inbound email or email thread with proper RFC 5322 email
   * threading headers (In-Reply-To, References). Supports both direct email IDs and
   * thread IDs - when given a thread ID, automatically replies to the latest message
   * in the thread. Includes Reply All functionality, automatic thread association,
   * attachment support (up to 25MB each, 40MB total), and idempotent operations.
   * Sender domain must be verified (agent@inbnd.dev not allowed for replies).
   * Compatible with Resend API format.
   *
   * @example
   * ```ts
   * const response = await client.v2.emails.reply('id', {
   *   from: 'support@yourdomain.com',
   * });
   * ```
   */
  reply(id: string, params: EmailReplyParams, options?: RequestOptions): APIPromise<EmailReplyResponse> {
    const { 'API-Version': apiVersion, 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post(path`/api/v2/emails/${id}/reply`, {
      body,
      ...options,
      headers: buildHeaders([
        {
          ...(apiVersion != null ? { 'API-Version': apiVersion } : undefined),
          ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined),
        },
        options?.headers,
      ]),
    });
  }

  /**
   * Resends a previously received inbound email to a specific endpoint. Useful for
   * re-delivering emails to webhooks or forwarding addresses after initial delivery.
   * Creates a new delivery record and tracks the attempt. Supports both webhook and
   * email forwarding endpoints. Endpoint must be active and belong to the
   * authenticated user. Note: Requires session authentication (API keys not
   * supported for this endpoint).
   *
   * @example
   * ```ts
   * const response = await client.v2.emails.resend('id', {
   *   endpointId: 'endpoint_abc123xyz',
   * });
   * ```
   */
  resend(id: string, body: EmailResendParams, options?: RequestOptions): APIPromise<EmailResendResponse> {
    return this._client.post(path`/api/v2/emails/${id}/resend`, { body, ...options });
  }

  /**
   * Retries endpoint delivery for a previously failed or successful delivery. Allows
   * re-attempting delivery to webhooks or forwarding addresses regardless of current
   * status. Uses the email router to re-process the email and create new delivery
   * records. Increments attempt counter and updates delivery timestamps. Endpoint
   * must still exist and be active. Note: Requires session authentication (API keys
   * not supported).
   *
   * @example
   * ```ts
   * const response = await client.v2.emails.retryDelivery(
   *   'id',
   *   { deliveryId: 'delivery_xyz456' },
   * );
   * ```
   */
  retryDelivery(
    id: string,
    body: EmailRetryDeliveryParams,
    options?: RequestOptions,
  ): APIPromise<EmailRetryDeliveryResponse> {
    return this._client.post(path`/api/v2/emails/${id}/retry-delivery`, { body, ...options });
  }

  /**
   * Send an email through the Inbound API with comprehensive support for HTML/text
   * content, file attachments (up to 25MB each, 40MB total), custom SMTP headers,
   * CC/BCC recipients, and idempotent operations. Sender domain must be verified
   * unless using the special agent@inbnd.dev address (available to all users).
   * Includes usage tracking and rate limiting via Autumn. Email delivery powered by
   * AWS SES with full RFC 5322 compliance. Compatible with Resend API format for
   * easy migration.
   *
   * @example
   * ```ts
   * const response = await client.v2.emails.send({
   *   from: 'Support Team <support@yourdomain.com>',
   *   subject: 'Welcome to Inbound',
   *   to: ['customer@example.com'],
   * });
   * ```
   */
  send(params: EmailSendParams, options?: RequestOptions): APIPromise<EmailSendResponse> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/api/v2/emails', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }
}

export interface AttachmentInput {
  /**
   * Display name for the attachment (required)
   */
  filename: string;

  /**
   * Base64-encoded file content (mutually exclusive with path)
   */
  content?: string;

  /**
   * Content-ID for embedding images in HTML (used with cid URLs)
   */
  content_id?: string;

  /**
   * MIME type in snake_case format (legacy support)
   */
  content_type?: string;

  /**
   * MIME type in camelCase format (Resend-compatible)
   */
  contentType?: string;

  /**
   * Remote file URL to fetch attachment from (mutually exclusive with content)
   */
  path?: string;
}

export interface EmailRetrieveResponse {
  /**
   * Unique email identifier in nanoid format
   */
  id: string;

  /**
   * ISO 8601 timestamp when email was created
   */
  created_at: string;

  /**
   * Sender email address (may include display name)
   */
  from: string;

  /**
   * Last delivery event status
   */
  last_event: 'created' | 'pending' | 'delivered' | 'failed';

  /**
   * Object type identifier (always "email")
   */
  object: 'email';

  /**
   * Email subject line
   */
  subject: string;

  /**
   * Recipient email addresses
   */
  to: Array<string>;

  /**
   * Blind carbon copy recipients (contains null if none)
   */
  bcc?: Array<string | null>;

  /**
   * Carbon copy recipients (contains null if none)
   */
  cc?: Array<string | null>;

  /**
   * HTML email body content
   */
  html?: string | null;

  /**
   * Reply-To addresses (contains null if none)
   */
  reply_to?: Array<string | null>;

  /**
   * Plain text email body content
   */
  text?: string | null;
}

export interface EmailReplyResponse {
  /**
   * Unique identifier of the reply email in nanoid format
   */
  id: string;

  /**
   * AWS SES Message ID for delivery tracking
   */
  awsMessageId: string;

  /**
   * Whether this was a reply to a thread ID vs direct email ID
   */
  isThreadReply: boolean;

  /**
   * Inbound Message-ID used for email threading (RFC 5322)
   */
  messageId: string;

  /**
   * The actual email ID that was replied to
   */
  repliedToEmailId: string;

  /**
   * The thread ID if replying to a thread (optional)
   */
  repliedToThreadId?: string;
}

export interface EmailResendResponse {
  /**
   * Human-readable status message
   */
  message: string;

  /**
   * Whether the resend operation succeeded
   */
  success: boolean;

  /**
   * Unique identifier of the delivery record (nanoid format)
   */
  deliveryId?: string;

  /**
   * Error message if operation failed
   */
  error?: string;
}

export interface EmailRetryDeliveryResponse {
  /**
   * Human-readable status message
   */
  message: string;

  /**
   * Whether the retry operation was initiated successfully
   */
  success: boolean;

  /**
   * The delivery record ID that was retried
   */
  deliveryId?: string;

  /**
   * Error message if operation failed
   */
  error?: string;
}

export interface EmailSendResponse {
  /**
   * Unique email identifier in nanoid format
   */
  id: string;

  /**
   * AWS SES Message ID for delivery tracking
   */
  messageId: string;
}

export interface EmailReplyParams {
  /**
   * Body param: Sender email address. Supports plain or display name formats. Must
   * be from verified domain (agent@inbnd.dev not allowed)
   */
  from: string;

  /**
   * Body param: Email attachments (max 20 files, 25MB each, 40MB total)
   */
  attachments?: Array<AttachmentInput>;

  /**
   * Body param: Custom email headers as key-value pairs
   */
  headers?: { [key: string]: string };

  /**
   * Body param: HTML content of reply. Either html or text required
   */
  html?: string;

  /**
   * Body param: If true, includes original CC recipients in reply
   */
  replyAll?: boolean;

  /**
   * Body param: Email subject. Defaults to Re prefix with original subject if not
   * provided
   */
  subject?: string;

  /**
   * Body param: Resend-compatible metadata tags
   */
  tags?: Array<EmailReplyParams.Tag>;

  /**
   * Body param: Plain text content of reply. Either html or text required
   */
  text?: string;

  /**
   * Body param: Recipient address(es). Defaults to original sender if not provided
   */
  to?: string | Array<string>;

  /**
   * Header param: API version for routing to historical versions (e.g.,
   * "reply-10-01-25" for legacy behavior)
   */
  'API-Version'?: string;

  /**
   * Header param: Unique key to prevent duplicate replies. Same key returns same
   * response without sending duplicate
   */
  'Idempotency-Key'?: string;
}

export namespace EmailReplyParams {
  export interface Tag {
    name?: string;

    value?: string;
  }
}

export interface EmailResendParams {
  /**
   * The ID of the endpoint to deliver the email to (nanoid format). Endpoint must be
   * active and belong to user
   */
  endpointId: string;
}

export interface EmailRetryDeliveryParams {
  /**
   * The ID of the delivery record to retry (nanoid format). Must belong to the
   * specified email
   */
  deliveryId: string;
}

export interface EmailSendParams {
  /**
   * Body param: Sender email address. Supports both "email@domain.com" and "Display
   * Name <email@domain.com>" formats. Must be from a verified domain or
   * agent@inbnd.dev
   */
  from: string;

  /**
   * Body param: Email subject line (max 998 characters)
   */
  subject: string;

  /**
   * Body param: Recipient email address(es). Can be a single string or array of
   * strings
   */
  to: string | Array<string>;

  /**
   * Body param: Email attachments (max 20 files, 25MB each, 40MB total)
   */
  attachments?: Array<AttachmentInput>;

  /**
   * Body param: Blind carbon copy recipient(s)
   */
  bcc?: string | Array<string>;

  /**
   * Body param: Carbon copy recipient(s)
   */
  cc?: string | Array<string>;

  /**
   * Body param: Custom SMTP headers as key-value pairs
   */
  headers?: { [key: string]: string };

  /**
   * Body param: HTML email body. Either html or text must be provided
   */
  html?: string;

  /**
   * Body param: Reply-To address(es) in snake_case format (legacy)
   */
  reply_to?: string | Array<string>;

  /**
   * Body param: Reply-To address(es) in camelCase format (Resend-compatible)
   */
  replyTo?: string | Array<string>;

  /**
   * Body param: Resend-compatible metadata tags
   */
  tags?: Array<EmailSendParams.Tag>;

  /**
   * Body param: Plain text email body. Either html or text must be provided
   */
  text?: string;

  /**
   * Header param: Unique key to prevent duplicate email sends (optional). If
   * provided, the same key will return the same email ID without sending duplicate
   * emails. Useful for retry logic and ensuring exactly-once delivery
   */
  'Idempotency-Key'?: string;
}

export namespace EmailSendParams {
  export interface Tag {
    name?: string;

    value?: string;
  }
}

Emails.Schedule = Schedule;

export declare namespace Emails {
  export {
    type AttachmentInput as AttachmentInput,
    type EmailRetrieveResponse as EmailRetrieveResponse,
    type EmailReplyResponse as EmailReplyResponse,
    type EmailResendResponse as EmailResendResponse,
    type EmailRetryDeliveryResponse as EmailRetryDeliveryResponse,
    type EmailSendResponse as EmailSendResponse,
    type EmailReplyParams as EmailReplyParams,
    type EmailResendParams as EmailResendParams,
    type EmailRetryDeliveryParams as EmailRetryDeliveryParams,
    type EmailSendParams as EmailSendParams,
  };

  export {
    Schedule as Schedule,
    type ScheduleCreateResponse as ScheduleCreateResponse,
    type ScheduleRetrieveResponse as ScheduleRetrieveResponse,
    type ScheduleListResponse as ScheduleListResponse,
    type ScheduleCancelResponse as ScheduleCancelResponse,
    type ScheduleCreateParams as ScheduleCreateParams,
    type ScheduleListParams as ScheduleListParams,
  };
}
