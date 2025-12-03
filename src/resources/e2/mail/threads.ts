// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Threads extends APIResource {
  /**
   * Get all emails in a thread with full details, including both inbound and
   * outbound messages sorted by thread position.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ThreadRetrieveResponse> {
    return this._client.get(path`/api/e2/mail/threads/${id}`, options);
  }

  /**
   * Get thread summaries for a domain or address with cursor-based pagination.
   * Includes latest message preview and unread status.
   */
  list(
    query: ThreadListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ThreadListResponse> {
    return this._client.get('/api/e2/mail/threads', { query, ...options });
  }
}

export interface ThreadRetrieveResponse {
  messages: Array<ThreadRetrieveResponse.Message>;

  thread: ThreadRetrieveResponse.Thread;

  total_count: number;
}

export namespace ThreadRetrieveResponse {
  export interface Message {
    id: string;

    attachments: Array<unknown>;

    bcc: Array<string>;

    cc: Array<string>;

    from: string;

    has_attachments: boolean;

    headers: unknown;

    is_read: boolean;

    references: Array<string>;

    tags: Array<unknown>;

    thread_position: number;

    to: Array<string>;

    type: 'inbound' | 'outbound';

    date?: string | null;

    failure_reason?: string | null;

    from_address?: string | null;

    from_name?: string | null;

    html_body?: string | null;

    in_reply_to?: string | null;

    message_id?: string | null;

    read_at?: string | null;

    received_at?: string | null;

    sent_at?: string | null;

    status?: string;

    subject?: string | null;

    text_body?: string | null;
  }

  export interface Thread {
    id: string;

    created_at: string;

    last_message_at: string;

    message_count: number;

    participant_emails: Array<string>;

    root_message_id: string;

    updated_at: string;

    normalized_subject?: string | null;
  }
}

export interface ThreadListResponse {
  filters: ThreadListResponse.Filters;

  pagination: ThreadListResponse.Pagination;

  threads: Array<ThreadListResponse.Thread>;
}

export namespace ThreadListResponse {
  export interface Filters {
    address?: string;

    domain?: string;

    search?: string;

    unread_only?: boolean;
  }

  export interface Pagination {
    has_more: boolean;

    limit: number;

    next_cursor?: string | null;
  }

  export interface Thread {
    id: string;

    created_at: string;

    has_unread: boolean;

    is_archived: boolean;

    last_message_at: string;

    message_count: number;

    participant_emails: Array<string>;

    root_message_id: string;

    latest_message?: Thread.LatestMessage | null;

    normalized_subject?: string | null;
  }

  export namespace Thread {
    export interface LatestMessage {
      id: string;

      from_text: string;

      has_attachments: boolean;

      is_read: boolean;

      type: 'inbound' | 'outbound';

      date?: string | null;

      subject?: string | null;

      text_preview?: string | null;
    }
  }
}

export interface ThreadListParams {
  /**
   * Filter by email address ID or address
   */
  address?: string;

  /**
   * Cursor for pagination (thread ID)
   */
  cursor?: string;

  /**
   * Filter by domain ID or name
   */
  domain?: string;

  limit?: string;

  /**
   * Search in subject or participants
   */
  search?: string;

  /**
   * Filter by unread threads (true/false)
   */
  unread?: string;
}

export declare namespace Threads {
  export {
    type ThreadRetrieveResponse as ThreadRetrieveResponse,
    type ThreadListResponse as ThreadListResponse,
    type ThreadListParams as ThreadListParams,
  };
}
