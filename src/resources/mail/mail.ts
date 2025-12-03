// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ThreadsAPI from './threads';
import { ThreadListParams, ThreadListResponse, ThreadRetrieveResponse, Threads } from './threads';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

export class Mail extends APIResource {
  threads: ThreadsAPI.Threads = new ThreadsAPI.Threads(this._client);

  /**
   * List received emails filtered by domain, address, status, or search query.
   * Supports pagination and time range filtering.
   */
  list(
    query: MailListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MailListResponse> {
    return this._client.get('/api/e2/mail', { query, ...options });
  }
}

export interface MailListResponse {
  emails: Array<MailListResponse.Email>;

  filters: MailListResponse.Filters;

  pagination: MailListResponse.Pagination;
}

export namespace MailListResponse {
  export interface Email {
    id: string;

    attachment_count: number;

    email_id: string;

    from: string;

    has_attachments: boolean;

    is_archived: boolean;

    is_read: boolean;

    received_at: string;

    archived_at?: string | null;

    from_name?: string | null;

    message_id?: string | null;

    parse_success?: boolean | null;

    preview?: string | null;

    read_at?: string | null;

    recipient?: string | null;

    subject?: string | null;

    thread_id?: string | null;

    thread_position?: number | null;
  }

  export interface Filters {
    unique_domains: Array<string>;
  }

  export interface Pagination {
    has_more: boolean;

    limit: number;

    offset: number;

    total: number;
  }
}

export interface MailListParams {
  /**
   * Filter by email address ID or address
   */
  address?: string;

  /**
   * Filter by domain ID or name
   */
  domain?: string;

  limit?: string;

  offset?: string;

  /**
   * Search in subject, from, to
   */
  search?: string;

  status?: 'all' | 'unread' | 'archived';

  time_range?: '24h' | '7d' | '30d' | '90d';
}

Mail.Threads = Threads;

export declare namespace Mail {
  export { type MailListResponse as MailListResponse, type MailListParams as MailListParams };

  export {
    Threads as Threads,
    type ThreadRetrieveResponse as ThreadRetrieveResponse,
    type ThreadListResponse as ThreadListResponse,
    type ThreadListParams as ThreadListParams,
  };
}
