// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Schedule extends APIResource {
  /**
   * Schedule an email to be sent at a future time. Supports natural language
   * scheduling like "in 1 hour" or "tomorrow at 9am". Compatible with Resend API
   * format.
   *
   * @example
   * ```ts
   * const schedule = await client.emails.schedule.create();
   * ```
   */
  create(
    body: ScheduleCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ScheduleCreateResponse> {
    return this._client.post('/v2/emails/schedule', { body, ...options });
  }

  /**
   * Retrieve a list of emails scheduled for future sending. Supports filtering by
   * status and pagination.
   *
   * @example
   * ```ts
   * const schedules = await client.emails.schedule.list();
   * ```
   */
  list(
    query: ScheduleListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ScheduleListResponse> {
    return this._client.get('/v2/emails/schedule', { query, ...options });
  }
}

export interface ScheduleCreateResponse {
  id?: string;

  /**
   * Normalized ISO 8601 timestamp
   */
  scheduled_at?: string;

  status?: 'scheduled';

  timezone?: string;
}

export interface ScheduleListResponse {
  data?: Array<ScheduleListResponse.Data>;

  pagination?: ScheduleListResponse.Pagination;
}

export namespace ScheduleListResponse {
  export interface Data {
    id?: string;

    attempts?: number;

    created_at?: string;

    from?: string;

    last_error?: string;

    scheduled_at?: string;

    status?: string;

    subject?: string;

    timezone?: string;

    to?: Array<string>;
  }

  export interface Pagination {
    hasMore?: boolean;

    limit?: number;

    offset?: number;

    total?: number;
  }
}

export interface ScheduleCreateParams {
  attachments?: Array<ScheduleCreateParams.Attachment> | null;

  bcc?: string | Array<string> | null;

  cc?: string | Array<string> | null;

  /**
   * Supports both "email@domain.com" and "Display Name <email@domain.com>" formats
   */
  from?: string;

  headers?: { [key: string]: string } | null;

  html?: string | null;

  /**
   * snake_case (legacy)
   */
  reply_to?: string | Array<string> | null;

  /**
   * camelCase (Resend-compatible)
   */
  replyTo?: string | Array<string> | null;

  /**
   * ISO 8601 or natural language ("in 1 hour", "tomorrow at 9am")
   */
  scheduled_at?: string;

  subject?: string;

  tags?: Array<ScheduleCreateParams.Tag> | null;

  text?: string | null;

  /**
   * User's timezone for natural language parsing (defaults to UTC)
   */
  timezone?: string | null;

  to?: string | Array<string>;
}

export namespace ScheduleCreateParams {
  export interface Attachment {
    /**
     * Base64 encoded content
     */
    content?: string | null;

    /**
     * Content ID for embedding (e.g., "logo" for <img src="cid:logo">)
     */
    content_id?: string | null;

    /**
     * snake_case (legacy)
     */
    content_type?: string | null;

    /**
     * camelCase (Resend-compatible)
     */
    contentType?: string | null;

    /**
     * Required display name
     */
    filename?: string;

    /**
     * Remote file URL
     */
    path?: string | null;
  }

  export interface Tag {
    name?: string;

    value?: string;
  }
}

export interface ScheduleListParams {
  limit?: number;

  offset?: number;

  /**
   * Filter by status
   */
  status?: string;
}

export declare namespace Schedule {
  export {
    type ScheduleCreateResponse as ScheduleCreateResponse,
    type ScheduleListResponse as ScheduleListResponse,
    type ScheduleCreateParams as ScheduleCreateParams,
    type ScheduleListParams as ScheduleListParams,
  };
}
