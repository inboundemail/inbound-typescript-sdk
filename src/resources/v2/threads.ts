// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Threads extends APIResource {
  /**
   * Retrieves all messages in a specific email thread, ordered by thread position.
   * Returns both inbound (received) and outbound (sent/replied) messages with
   * complete content including HTML/text bodies, attachments, headers, threading
   * metadata (In-Reply-To, References), sender/recipient information, and read
   * status. Messages are sorted chronologically by thread position. Useful for
   * displaying full conversation history. Only threads belonging to the
   * authenticated user can be accessed.
   *
   * @example
   * ```ts
   * const thread = await client.v2.threads.retrieve('id');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ThreadRetrieveResponse> {
    return this._client.get(path`/api/v2/threads/${id}`, options);
  }

  /**
   * Retrieves a paginated list of all email threads for the authenticated user with
   * optional search and filtering. Threads group related emails by subject and
   * message references (In-Reply-To, References headers). Returns thread metadata
   * including participant emails, message count, latest message preview (with read
   * status and attachment info), unread status, and last activity timestamp.
   * Supports search by subject or participant email, unread-only filter, and
   * archived filter. Ordered by most recent activity first.
   *
   * @example
   * ```ts
   * const threads = await client.v2.threads.list();
   * ```
   */
  list(
    query: ThreadListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ThreadListResponse> {
    return this._client.get('/api/v2/threads', { query, ...options });
  }

  /**
   * Performs bulk actions on all messages in a thread. Supports marking thread as
   * read/unread (updates all inbound messages in thread), archiving/unarchiving
   * thread (updates isArchived flag with timestamps). Actions are atomic and update
   * all messages in the thread simultaneously. Useful for inbox management and
   * conversation organization. Only threads belonging to the authenticated user can
   * be modified.
   *
   * @example
   * ```ts
   * const response = await client.v2.threads.actions('id', {
   *   action: 'mark_as_read',
   * });
   * ```
   */
  actions(
    id: string,
    body: ThreadActionsParams,
    options?: RequestOptions,
  ): APIPromise<ThreadActionsResponse> {
    return this._client.post(path`/api/v2/threads/${id}/actions`, { body, ...options });
  }
}

export interface ThreadRetrieveResponse {
  /**
   * All messages in thread ordered by position
   */
  messages: Array<unknown>;

  thread: ThreadRetrieveResponse.Thread;

  totalCount: number;
}

export namespace ThreadRetrieveResponse {
  export interface Thread {
    id?: string;

    lastMessageAt?: string;

    messageCount?: number;

    normalizedSubject?: string | null;

    participantEmails?: Array<string>;

    rootMessageId?: string;
  }
}

export interface ThreadListResponse {
  filters: ThreadListResponse.Filters;

  pagination: ThreadListResponse.Pagination;

  /**
   * Array of thread items with latest message previews
   */
  threads: Array<unknown>;
}

export namespace ThreadListResponse {
  export interface Filters {
    archivedOnly?: boolean;

    search?: string;

    unreadOnly?: boolean;
  }

  export interface Pagination {
    hasMore?: boolean;

    limit?: number;

    page?: number;

    total?: number;
  }
}

export interface ThreadActionsResponse {
  /**
   * The action that was performed
   */
  action: string;

  success: boolean;

  /**
   * Thread ID that was modified
   */
  threadId: string;

  /**
   * Number of messages affected
   */
  affectedMessages?: number;

  /**
   * Human-readable result message
   */
  message?: string;
}

export interface ThreadListParams {
  /**
   * Filter to archived threads only. Values: 'true', 'false'. Default: false
   */
  archived?: string;

  /**
   * Threads per page. Min: 1, Max: 100, Default: 25
   */
  limit?: number;

  /**
   * Page number (1-indexed). Default: 1
   */
  page?: number;

  /**
   * Search by subject or participant email (case-insensitive)
   */
  search?: string;

  /**
   * Filter to unread threads only. Values: 'true', 'false'. Default: false
   */
  unread?: string;
}

export interface ThreadActionsParams {
  /**
   * Action to perform on thread
   */
  action: 'mark_as_read' | 'mark_as_unread' | 'archive' | 'unarchive';
}

export declare namespace Threads {
  export {
    type ThreadRetrieveResponse as ThreadRetrieveResponse,
    type ThreadListResponse as ThreadListResponse,
    type ThreadActionsResponse as ThreadActionsResponse,
    type ThreadListParams as ThreadListParams,
    type ThreadActionsParams as ThreadActionsParams,
  };
}
