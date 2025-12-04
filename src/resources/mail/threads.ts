// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Threads extends APIResource {
  /**
   * Retrieve a complete email thread (conversation) with all messages.
   *
   * **What You Get:**
   *
   * - Thread metadata (subject, participants, timestamps)
   * - All messages in the thread (both inbound and outbound)
   * - Messages sorted chronologically by thread position
   *
   * **Message Types:**
   *
   * - `inbound` - Emails you received
   * - `outbound` - Emails you sent (includes delivery status)
   *
   * **Message Content:** Each message includes:
   *
   * - Full body content (text and HTML)
   * - Sender and recipient information
   * - Attachments metadata
   * - Read status and timestamps
   * - Threading headers (In-Reply-To, References)
   *
   * **Typical Workflow:**
   *
   * 1. List threads using `GET /mail/threads`
   * 2. User clicks a thread
   * 3. Fetch full thread using this endpoint
   * 4. Display conversation view with all messages
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<ThreadRetrieveResponse> {
    return this._client.get(path`/api/e2/mail/threads/${id}`, options);
  }

  /**
   * List email threads (conversations) for your inbox with cursor-based pagination.
   * This is the primary endpoint for building an inbox UI.
   *
   * **What is a Thread?** A thread groups related emails together based on the
   * In-Reply-To and References headers, similar to how Gmail groups conversations.
   * Each thread contains both inbound (received) and outbound (sent) messages.
   *
   * **Filtering:**
   *
   * - `domain` - Filter by domain ID or name (e.g., 'example.com'). Returns threads
   *   where any participant matches the domain.
   * - `address` - Filter by email address (e.g., 'user@example.com'). Returns
   *   threads where the address is a participant.
   * - `search` - Search in subject lines and participant emails.
   * - `unread` - Set to 'true' to only return threads with unread messages.
   *
   * **Pagination:** Uses cursor-based pagination for efficient infinite scroll. Pass
   * `pagination.next_cursor` from the response as the `cursor` parameter to get the
   * next page.
   *
   * **Response:** Each thread includes:
   *
   * - Thread metadata (subject, participants, message count)
   * - `latest_message` - Preview of the most recent message (inbound or outbound)
   * - `has_unread` - Whether there are unread inbound messages
   * - `unread_count` - Number of unread messages
   *
   * **Use with /mail/threads/:id:** Use this endpoint to list threads, then use
   * `GET /mail/threads/:id` to fetch all messages in a specific thread.
   */
  list(
    query: ThreadListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ThreadListResponse> {
    return this._client.get('/api/e2/mail/threads', { query, ...options });
  }
}

export interface ThreadRetrieveResponse {
  /**
   * Array of all messages in the thread, sorted by thread position (chronological)
   */
  messages: Array<ThreadRetrieveResponse.Message>;

  thread: ThreadRetrieveResponse.Thread;

  /**
   * Total number of messages returned
   */
  total_count: number;
}

export namespace ThreadRetrieveResponse {
  export interface Message {
    /**
     * Unique identifier for the message
     */
    id: string;

    /**
     * Array of attachment metadata
     */
    attachments: Array<Message.Attachment>;

    /**
     * Array of BCC recipient email addresses
     */
    bcc: Array<string>;

    /**
     * Array of CC recipient email addresses
     */
    cc: Array<string>;

    /**
     * Formatted sender (display name and email)
     */
    from: string;

    /**
     * Whether the message has any attachments
     */
    has_attachments: boolean;

    /**
     * Raw email headers as key-value pairs
     */
    headers: unknown;

    /**
     * Whether the message has been read (always true for outbound)
     */
    is_read: boolean;

    /**
     * Array of Message-IDs from the References header
     */
    references: Array<string>;

    /**
     * Array of tags attached to the message (outbound only)
     */
    tags: Array<Message.Tag>;

    /**
     * Position of the message in the thread (0 = first message)
     */
    thread_position: number;

    /**
     * Array of recipient email addresses
     */
    to: Array<string>;

    type: 'inbound' | 'outbound';

    /**
     * ISO 8601 timestamp from the Date header
     */
    date?: string | null;

    /**
     * Error message if the outbound message failed to send
     */
    failure_reason?: string | null;

    /**
     * Sender email address
     */
    from_address?: string | null;

    /**
     * Sender display name if available
     */
    from_name?: string | null;

    /**
     * HTML body of the message
     */
    html_body?: string | null;

    /**
     * RFC 2822 In-Reply-To header value
     */
    in_reply_to?: string | null;

    /**
     * RFC 2822 Message-ID header value
     */
    message_id?: string | null;

    /**
     * ISO 8601 timestamp when the message was marked as read
     */
    read_at?: string | null;

    /**
     * ISO 8601 timestamp when the message was received (inbound only)
     */
    received_at?: string | null;

    /**
     * ISO 8601 timestamp when the message was sent (outbound only)
     */
    sent_at?: string | null;

    /**
     * Delivery status for outbound messages (pending, sent, failed, bounced)
     */
    status?: string;

    /**
     * Subject line of the message
     */
    subject?: string | null;

    /**
     * Plain text body of the message
     */
    text_body?: string | null;
  }

  export namespace Message {
    export interface Attachment {
      /**
       * Base64-encoded content (if included)
       */
      content?: string;

      /**
       * Content-ID for inline attachments
       */
      contentId?: string | null;

      /**
       * MIME type of the attachment
       */
      contentType?: string;

      /**
       * Original filename of the attachment
       */
      filename?: string;

      /**
       * Size of the attachment in bytes
       */
      size?: number;
    }

    export interface Tag {
      /**
       * Tag name
       */
      name: string;

      /**
       * Tag value
       */
      value: string;
    }
  }

  export interface Thread {
    /**
     * Unique identifier for the thread
     */
    id: string;

    /**
     * ISO 8601 timestamp when the thread was created
     */
    created_at: string;

    /**
     * ISO 8601 timestamp of the most recent message
     */
    last_message_at: string;

    /**
     * Total number of messages in the thread
     */
    message_count: number;

    /**
     * Array of all unique email addresses that have participated in this thread
     */
    participant_emails: Array<string>;

    /**
     * RFC 2822 Message-ID of the first message in the thread
     */
    root_message_id: string;

    /**
     * ISO 8601 timestamp when the thread was last updated
     */
    updated_at: string;

    /**
     * Normalized subject line (stripped of Re:, Fwd:, etc.)
     */
    normalized_subject?: string | null;
  }
}

export interface ThreadListResponse {
  /**
   * Applied filters for this query
   */
  filters: ThreadListResponse.Filters;

  /**
   * Pagination metadata for cursor-based pagination
   */
  pagination: ThreadListResponse.Pagination;

  /**
   * Array of thread objects matching the query, sorted by last message date (newest
   * first)
   */
  threads: Array<ThreadListResponse.Thread>;
}

export namespace ThreadListResponse {
  /**
   * Applied filters for this query
   */
  export interface Filters {
    /**
     * Applied address filter (resolved email address)
     */
    address?: string;

    /**
     * Applied domain filter (resolved domain name)
     */
    domain?: string;

    /**
     * Applied search query
     */
    search?: string;

    /**
     * Whether filtering for unread threads only
     */
    unread_only?: boolean;
  }

  /**
   * Pagination metadata for cursor-based pagination
   */
  export interface Pagination {
    /**
     * Whether there are more threads available after this page
     */
    has_more: boolean;

    /**
     * Number of results per page
     */
    limit: number;

    /**
     * Cursor to pass as the `cursor` parameter to fetch the next page. Null if no more
     * results.
     */
    next_cursor?: string | null;
  }

  export interface Thread {
    /**
     * Unique identifier for the thread
     */
    id: string;

    /**
     * ISO 8601 timestamp when the thread was created (first message received)
     */
    created_at: string;

    /**
     * Whether the thread has any unread inbound messages
     */
    has_unread: boolean;

    /**
     * Whether the thread has been archived
     */
    is_archived: boolean;

    /**
     * ISO 8601 timestamp of the most recent message in the thread
     */
    last_message_at: string;

    /**
     * Total number of messages in the thread (both inbound and outbound)
     */
    message_count: number;

    /**
     * Array of all unique email addresses that have participated in this thread
     */
    participant_emails: Array<string>;

    /**
     * RFC 2822 Message-ID of the first message in the thread
     */
    root_message_id: string;

    latest_message?: Thread.LatestMessage | null;

    /**
     * Normalized subject line (stripped of Re:, Fwd:, etc.) used for thread grouping
     */
    normalized_subject?: string | null;

    /**
     * Number of unread messages in the thread
     */
    unread_count?: number;
  }

  export namespace Thread {
    export interface LatestMessage {
      /**
       * Unique identifier of the message
       */
      id: string;

      /**
       * Formatted sender information (name and/or email)
       */
      from_text: string;

      /**
       * Whether the message has any attachments
       */
      has_attachments: boolean;

      /**
       * Whether the message has been read (always true for outbound)
       */
      is_read: boolean;

      /**
       * Whether the message was received (inbound) or sent (outbound)
       */
      type: 'inbound' | 'outbound';

      /**
       * ISO 8601 timestamp of when the message was sent/received
       */
      date?: string | null;

      /**
       * Subject line of the message
       */
      subject?: string | null;

      /**
       * First 200 characters of the message body as a preview
       */
      text_preview?: string | null;
    }
  }
}

export interface ThreadListParams {
  /**
   * Filter threads by email address. Accepts address ID (e.g., 'addr_xxx') or raw
   * email address (e.g., 'user@example.com'). Returns threads where the address is a
   * participant.
   */
  address?: string;

  /**
   * Cursor for pagination. Pass the thread ID from `pagination.next_cursor` of the
   * previous response to get the next page.
   */
  cursor?: string;

  /**
   * Filter threads by domain. Accepts domain ID (e.g., 'dom_xxx') or domain name
   * (e.g., 'example.com'). Returns threads where any participant email matches the
   * domain.
   */
  domain?: string;

  /**
   * Maximum number of threads to return (1-100). Default is 25.
   */
  limit?: string;

  /**
   * Search query to filter threads by subject or participant emails.
   * Case-insensitive partial match.
   */
  search?: string;

  /**
   * Filter by unread status. Set to 'true' to only return threads with unread
   * messages.
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
