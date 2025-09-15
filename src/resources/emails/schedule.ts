// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Schedule extends APIResource {
  /**
   * POST /emails/schedule
   */
  create(body: ScheduleCreateParams, options?: RequestOptions): APIPromise<ScheduleCreateResponse> {
    return this._client.post('/api/v2/emails/schedule', { body, ...options });
  }

  /**
   * GET /emails/schedule/{id}
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ScheduleRetrieveResponse> {
    return this._client.get(path`/api/v2/emails/schedule/${id}`, options);
  }

  /**
   * GET /emails/schedule
   */
  list(
    query: ScheduleListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ScheduleListResponse> {
    return this._client.get('/api/v2/emails/schedule', { query, ...options });
  }

  /**
   * DELETE /emails/schedule/{id}
   */
  delete(id: string, options?: RequestOptions): APIPromise<ScheduleDeleteResponse> {
    return this._client.delete(path`/api/v2/emails/schedule/${id}`, options);
  }
}

export interface ScheduleCreateResponse {
  id: string;

  scheduled_at: string;

  status: string;

  timezone: string;
}

/**
 * GET /api/v2/emails/schedule/[id] Get details of a specific scheduled email
 *
 * DELETE /api/v2/emails/schedule/[id] Cancel a scheduled email (only if status is
 * 'scheduled')
 *
 * Has tests? ❌ (TODO) Has logging? ✅ Has types? ✅
 */
export interface ScheduleRetrieveResponse {
  id: string;

  attempts: number;

  created_at: string;

  from: string;

  max_attempts: number;

  scheduled_at: string;

  status: string;

  subject: string;

  timezone: string;

  to: string;

  updated_at: string;

  attachments?: Array<string>;

  bcc?: string;

  cc?: string;

  headers?: string;

  html?: string;

  last_error?: string;

  next_retry_at?: string;

  replyTo?: string;

  sent_at?: string;

  sent_email_id?: string;

  tags?: string;

  text?: string;
}

export interface ScheduleListResponse {
  data: Array<string>;

  pagination: number;
}

export interface ScheduleDeleteResponse {
  id: string;

  cancelled_at: string;

  status: string;
}

export interface ScheduleCreateParams {
  from: string;

  scheduled_at: string;

  subject: string;

  to: string;

  attachments?: Array<string>;

  bcc?: string;

  cc?: string;

  headers?: string;

  html?: string;

  reply_to?: string;

  replyTo?: string;

  tags?: string;

  text?: string;

  timezone?: string;
}

export interface ScheduleListParams {
  /**
   * limit parameter
   */
  limit?: number;

  /**
   * offset parameter
   */
  offset?: number;

  /**
   * status parameter
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
