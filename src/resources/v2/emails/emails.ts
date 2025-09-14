// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ScheduleAPI from './schedule';
import {
  Schedule,
  ScheduleCreateParams,
  ScheduleCreateResponse,
  ScheduleDeleteResponse,
  ScheduleListParams,
  ScheduleListResponse,
  ScheduleRetrieveResponse,
} from './schedule';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Emails extends APIResource {
  schedule: ScheduleAPI.Schedule = new ScheduleAPI.Schedule(this._client);

  /**
   * POST /emails
   */
  create(body: EmailCreateParams, options?: RequestOptions): APIPromise<EmailCreateResponse> {
    return this._client.post('/api/v2/emails', { body, ...options });
  }

  /**
   * GET /emails/{id}
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<EmailRetrieveResponse> {
    return this._client.get(path`/api/v2/emails/${id}`, options);
  }

  /**
   * POST /emails/{id}/reply
   */
  reply(id: string, body: EmailReplyParams, options?: RequestOptions): APIPromise<EmailReplyResponse> {
    return this._client.post(path`/api/v2/emails/${id}/reply`, { body, ...options });
  }
}

export interface EmailCreateResponse {
  id: string;

  messageId: string;
}

/**
 * GET /api/v2/emails/{id} Retrieve a single sent email by ID Supports both
 * session-based auth and API key auth Has tests? ❌ Has logging? ✅ Has types? ✅
 */
export interface EmailRetrieveResponse {
  id: string;

  bcc: string;

  cc: string;

  created_at: string;

  from: string;

  html: string;

  last_event: string;

  object: string;

  reply_to: string;

  subject: string;

  text: string;

  to: string;
}

export interface EmailReplyResponse {
  id: string;

  awsMessageId: string;

  messageId: string;
}

export interface EmailCreateParams {
  from: string;

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
}

export interface EmailReplyParams {
  from: string;

  attachments?: Array<string>;

  bcc?: string;

  cc?: string;

  from_name?: string;

  headers?: string;

  html?: string;

  include_original?: boolean;

  includeOriginal?: boolean;

  reply_to?: string;

  replyTo?: string;

  simple?: boolean;

  subject?: string;

  tags?: string;

  text?: string;

  to?: string;
}

Emails.Schedule = Schedule;

export declare namespace Emails {
  export {
    type EmailCreateResponse as EmailCreateResponse,
    type EmailRetrieveResponse as EmailRetrieveResponse,
    type EmailReplyResponse as EmailReplyResponse,
    type EmailCreateParams as EmailCreateParams,
    type EmailReplyParams as EmailReplyParams,
  };

  export {
    Schedule as Schedule,
    type ScheduleCreateResponse as ScheduleCreateResponse,
    type ScheduleRetrieveResponse as ScheduleRetrieveResponse,
    type ScheduleListResponse as ScheduleListResponse,
    type ScheduleDeleteResponse as ScheduleDeleteResponse,
    type ScheduleCreateParams as ScheduleCreateParams,
    type ScheduleListParams as ScheduleListParams,
  };
}
