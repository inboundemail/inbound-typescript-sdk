// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as EmailsAPI from './emails';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Schedule extends APIResource {
  /**
   * Schedules an email to be sent at a specified future time with Resend-compatible
   * interface. Supports both ISO 8601 timestamps (e.g., "2025-10-01T09:00:00Z") and
   * natural language date parsing (e.g., "in 1 hour", "tomorrow at 9am", "next
   * Monday at 2pm"). Scheduled emails use the same delivery pipeline as immediate
   * sends with full support for domain verification, attachments (up to 25MB each,
   * 40MB total), rate limiting, and idempotent operations. Includes automatic retry
   * logic for failed sends.
   *
   * @example
   * ```ts
   * const schedule = await client.v2.emails.schedule.create({
   *   from: 'sender@yourdomain.com',
   *   scheduled_at: '2025-10-01T09:00:00Z',
   *   subject: 'Scheduled Newsletter',
   *   to: ['recipient@example.com'],
   * });
   * ```
   */
  create(params: ScheduleCreateParams, options?: RequestOptions): APIPromise<ScheduleCreateResponse> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/api/v2/emails/schedule', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Retrieves detailed information about a specific scheduled email by its ID.
   * Returns complete email data including recipients, subject, HTML/text content,
   * attachments, custom headers, scheduling information (scheduled time, timezone),
   * retry attempts, max attempts, and current status (scheduled, sent, failed,
   * cancelled). Only scheduled emails belonging to the authenticated user can be
   * accessed.
   *
   * @example
   * ```ts
   * const schedule = await client.v2.emails.schedule.retrieve(
   *   'id',
   * );
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ScheduleRetrieveResponse> {
    return this._client.get(path`/api/v2/emails/schedule/${id}`, options);
  }

  /**
   * Retrieves a paginated list of scheduled emails for the authenticated user.
   * Supports filtering by status (scheduled, sent, failed, cancelled) and standard
   * pagination controls. Returns email metadata including recipients, schedule time,
   * current status, retry attempts, and error information. Useful for monitoring
   * upcoming sends and troubleshooting failed deliveries.
   *
   * @example
   * ```ts
   * const schedules = await client.v2.emails.schedule.list();
   * ```
   */
  list(
    query: ScheduleListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ScheduleListResponse> {
    return this._client.get('/api/v2/emails/schedule', { query, ...options });
  }

  /**
   * Cancels a scheduled email before it is sent. Only emails with status 'scheduled'
   * can be cancelled. Once an email is sent, failed, or already cancelled, it cannot
   * be cancelled again. The cancellation is immediate and cannot be undone. Email
   * will not be sent and delivery pipeline will skip it.
   *
   * @example
   * ```ts
   * const schedule = await client.v2.emails.schedule.delete(
   *   'id',
   * );
   * ```
   */
  delete(id: string, options?: RequestOptions): APIPromise<ScheduleDeleteResponse> {
    return this._client.delete(path`/api/v2/emails/schedule/${id}`, options);
  }
}

export interface ScheduleCreateResponse {
  /**
   * Unique identifier of scheduled email in nanoid format
   */
  id: string;

  /**
   * Normalized ISO 8601 timestamp for scheduled send time
   */
  scheduled_at: string;

  /**
   * Current status (always "scheduled" for new emails)
   */
  status: 'scheduled';

  /**
   * Timezone used for scheduling
   */
  timezone: string;
}

export interface ScheduleRetrieveResponse {
  /**
   * Unique scheduled email identifier
   */
  id: string;

  /**
   * Send attempts made
   */
  attempts: number;

  /**
   * Creation timestamp
   */
  created_at: string;

  /**
   * Sender email address
   */
  from: string;

  /**
   * Maximum retry attempts
   */
  max_attempts: number;

  /**
   * ISO 8601 scheduled send time
   */
  scheduled_at: string;

  /**
   * Current status
   */
  status: 'scheduled' | 'sent' | 'failed' | 'cancelled';

  /**
   * Email subject line
   */
  subject: string;

  /**
   * Timezone for scheduled time
   */
  timezone: string;

  /**
   * Recipient email addresses
   */
  to: Array<string>;

  /**
   * Last update timestamp
   */
  updated_at: string;

  /**
   * Email attachments
   */
  attachments?: Array<unknown>;

  /**
   * Blind carbon copy recipients
   */
  bcc?: Array<string>;

  /**
   * Carbon copy recipients
   */
  cc?: Array<string>;

  /**
   * Custom headers
   */
  headers?: { [key: string]: string };

  /**
   * HTML content
   */
  html?: string;

  /**
   * Last error message
   */
  last_error?: string;

  /**
   * Next retry time (if failed)
   */
  next_retry_at?: string;

  /**
   * Reply-To addresses
   */
  replyTo?: Array<string>;

  /**
   * Actual send timestamp
   */
  sent_at?: string;

  /**
   * ID of sent email record
   */
  sent_email_id?: string;

  /**
   * Metadata tags
   */
  tags?: Array<ScheduleRetrieveResponse.Tag>;

  /**
   * Plain text content
   */
  text?: string;
}

export namespace ScheduleRetrieveResponse {
  export interface Tag {
    name?: string;

    value?: string;
  }
}

export interface ScheduleListResponse {
  /**
   * Array of scheduled email items
   */
  data: Array<ScheduleListResponse.Data>;

  pagination: ScheduleListResponse.Pagination;
}

export namespace ScheduleListResponse {
  export interface Data {
    /**
     * Unique scheduled email identifier
     */
    id: string;

    /**
     * Number of send attempts made
     */
    attempts: number;

    /**
     * ISO 8601 timestamp when scheduled
     */
    created_at: string;

    /**
     * Sender email address
     */
    from: string;

    /**
     * ISO 8601 timestamp for scheduled send
     */
    scheduled_at: string;

    /**
     * Current status of scheduled email
     */
    status: 'scheduled' | 'sent' | 'failed' | 'cancelled';

    /**
     * Email subject line
     */
    subject: string;

    /**
     * Timezone for scheduled time
     */
    timezone: string;

    /**
     * Recipient email addresses
     */
    to: Array<string>;

    /**
     * Error message from last failed attempt
     */
    last_error?: string;
  }

  export interface Pagination {
    /**
     * Whether more pages exist
     */
    hasMore: boolean;

    /**
     * Number of items per page
     */
    limit: number;

    /**
     * Number of items skipped
     */
    offset: number;

    /**
     * Total number of scheduled emails
     */
    total: number;
  }
}

export interface ScheduleDeleteResponse {
  /**
   * Unique scheduled email identifier
   */
  id: string;

  /**
   * ISO 8601 timestamp when cancelled
   */
  cancelled_at: string;

  /**
   * Status after cancellation (always "cancelled")
   */
  status: 'cancelled';
}

export interface ScheduleCreateParams {
  /**
   * Body param: Sender email address. Supports "email@domain.com" and "Display Name
   * <email@domain.com>" formats. Must be from verified domain or agent@inbnd.dev
   */
  from: string;

  /**
   * Body param: When to send email. ISO 8601 format or natural language ("in 1
   * hour", "tomorrow at 9am")
   */
  scheduled_at: string;

  /**
   * Body param: Email subject line
   */
  subject: string;

  /**
   * Body param: Recipient email address(es)
   */
  to: string | Array<string>;

  /**
   * Body param: Email attachments (max 20 files, 25MB each, 40MB total)
   */
  attachments?: Array<EmailsAPI.AttachmentInput>;

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
   * Body param: HTML email body. Either html or text required
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
  tags?: Array<ScheduleCreateParams.Tag>;

  /**
   * Body param: Plain text email body. Either html or text required
   */
  text?: string;

  /**
   * Body param: User timezone for natural language parsing
   */
  timezone?: string;

  /**
   * Header param: Unique key to prevent duplicate scheduling. Same key returns
   * existing scheduled email
   */
  'Idempotency-Key'?: string;
}

export namespace ScheduleCreateParams {
  export interface Tag {
    name?: string;

    value?: string;
  }
}

export interface ScheduleListParams {
  /**
   * Maximum number of scheduled emails to return. Min: 1, Max: 100, Default: 50
   */
  limit?: number;

  /**
   * Number of scheduled emails to skip for pagination. Min: 0, Default: 0
   */
  offset?: number;

  /**
   * Filter by email status. Values: 'scheduled', 'sent', 'failed', 'cancelled'
   */
  status?: string;
}

export declare namespace Schedule {
  export {
    type ScheduleCreateResponse as ScheduleCreateResponse,
    type ScheduleRetrieveResponse as ScheduleRetrieveResponse,
    type ScheduleListResponse as ScheduleListResponse,
    type ScheduleDeleteResponse as ScheduleDeleteResponse,
    type ScheduleCreateParams as ScheduleCreateParams,
    type ScheduleListParams as ScheduleListParams,
  };
}
