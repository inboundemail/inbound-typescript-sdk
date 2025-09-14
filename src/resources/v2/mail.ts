// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Mail extends APIResource {
  /**
   * POST /mail
   */
  create(body: MailCreateParams, options?: RequestOptions): APIPromise<MailCreateResponse> {
    return this._client.post('/api/v2/mail', { body, ...options });
  }

  /**
   * GET /mail/{id}
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<MailRetrieveResponse> {
    return this._client.get(path`/api/v2/mail/${id}`, options);
  }

  /**
   * PATCH /mail/{id}
   */
  update(id: string, body: MailUpdateParams, options?: RequestOptions): APIPromise<MailUpdateResponse> {
    return this._client.patch(path`/api/v2/mail/${id}`, { body, ...options });
  }

  /**
   * GET /mail
   */
  list(
    query: MailListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MailListResponse> {
    return this._client.get('/api/v2/mail', { query, ...options });
  }

  /**
   * POST /mail/bulk
   */
  bulkCreate(body: MailBulkCreateParams, options?: RequestOptions): APIPromise<MailBulkCreateResponse> {
    return this._client.post('/api/v2/mail/bulk', { body, ...options });
  }

  /**
   * GET /mail/{id}/thread
   */
  retrieveThread(id: string, options?: RequestOptions): APIPromise<MailRetrieveThreadResponse> {
    return this._client.get(path`/api/v2/mail/${id}/thread`, options);
  }

  /**
   * POST /mail/thread-counts
   */
  threadCounts(options?: RequestOptions): APIPromise<unknown> {
    return this._client.post('/api/v2/mail/thread-counts', options);
  }
}

export interface MailCreateResponse {
  message: string;

  originalEmailId: string;

  replyData: string;

  status: string;
}

export interface MailRetrieveResponse {
  id: string;

  addresses:
    | '{ from: import(/Users/ryanvogel/dev/inbound-org/inbound/app/api/v2/mail/[id]/route).ParsedEmailAddress'
    | 'null; to: import(/Users/ryanvogel/dev/inbound-org/inbound/app/api/v2/mail/[id]/route).ParsedEmailAddress'
    | 'null; cc: import(/Users/ryanvogel/dev/inbound-org/inbound/app/api/v2/mail/[id]/route).ParsedEmailAddress'
    | 'null; bcc: import(/Users/ryanvogel/dev/inbound-org/inbound/app/api/v2/mail/[id]/route).ParsedEmailAddress'
    | 'null; replyTo: import(/Users/ryanvogel/dev/inbound-org/inbound/app/api/v2/mail/[id]/route).ParsedEmailAddress'
    | 'null; }';

  bcc: string;

  cc: string;

  content: string;

  createdAt: 'Date' | 'null';

  emailId: string;

  from: string;

  fromName: string;

  isRead: boolean;

  messageId: string;

  metadata: string;

  processing: string;

  readAt: 'Date' | 'null';

  receivedAt: 'Date' | 'null';

  recipient: string;

  replyTo: string;

  security: string;

  subject: string;

  to: string;

  updatedAt: 'Date' | 'null';
}

export interface MailUpdateResponse {
  id: string;

  archivedAt: 'Date' | 'null';

  isArchived: boolean;

  isRead: boolean;

  readAt: 'Date' | 'null';
}

export interface MailListResponse {
  emails: Array<string>;

  filters: string;

  pagination: number;
}

export interface MailBulkCreateResponse {
  emails: string;

  updatedCount: number;
}

export interface MailRetrieveThreadResponse {
  messages: Array<string>;

  threadId: string;

  totalCount: number;
}

export type MailThreadCountsResponse = unknown;

export interface MailCreateParams {
  emailId: string;

  subject: string;

  to: string;

  attachments?: string;

  htmlBody?: string;

  textBody?: string;
}

export interface MailUpdateParams {
  isArchived?: boolean;

  isRead?: boolean;
}

export interface MailListParams {
  /**
   * domain parameter
   */
  domain?: string;

  /**
   * emailAddress parameter
   */
  emailAddress?: string;

  /**
   * emailId parameter
   */
  emailId?: string;

  /**
   * includeArchived parameter
   */
  includeArchived?: boolean;

  /**
   * limit parameter
   */
  limit?: number;

  /**
   * offset parameter
   */
  offset?: number;

  /**
   * search parameter
   */
  search?: string;

  /**
   * status parameter
   */
  status?: 'failed' | 'all' | 'processed' | 'undefined';

  /**
   * timeRange parameter
   */
  timeRange?: '24h' | '7d' | '30d' | '90d' | 'undefined';
}

export interface MailBulkCreateParams {
  emailIds: string;

  updates: boolean;
}

export declare namespace Mail {
  export {
    type MailCreateResponse as MailCreateResponse,
    type MailRetrieveResponse as MailRetrieveResponse,
    type MailUpdateResponse as MailUpdateResponse,
    type MailListResponse as MailListResponse,
    type MailBulkCreateResponse as MailBulkCreateResponse,
    type MailRetrieveThreadResponse as MailRetrieveThreadResponse,
    type MailThreadCountsResponse as MailThreadCountsResponse,
    type MailCreateParams as MailCreateParams,
    type MailUpdateParams as MailUpdateParams,
    type MailListParams as MailListParams,
    type MailBulkCreateParams as MailBulkCreateParams,
  };
}
