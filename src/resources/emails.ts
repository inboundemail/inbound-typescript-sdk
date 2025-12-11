// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { maybeMultipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

export class Emails extends APIResource {
  /**
   * Retrieve a single email by ID. Works for sent, received, and scheduled emails.
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<EmailRetrieveResponse> {
    return this._client.get(path`/api/e2/emails/${id}`, options);
  }

  /**
   * List all email activity (sent, received, and scheduled) with comprehensive
   * filtering options.
   */
  list(
    query: EmailListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EmailListResponse> {
    return this._client.get('/api/e2/emails', { query, ...options });
  }

  /**
   * Cancel a scheduled email by ID. Only works for emails that haven't been sent
   * yet.
   */
  delete(id: string, options?: RequestOptions): APIPromise<EmailDeleteResponse> {
    return this._client.delete(path`/api/e2/emails/${id}`, options);
  }

  /**
   * Reply to an email or thread. Accepts either an email ID or thread ID (replies to
   * latest message in thread). Supports reply all functionality.
   */
  reply(id: string, body: EmailReplyParams, options?: RequestOptions): APIPromise<EmailReplyResponse> {
    return this._client.post(
      path`/api/e2/emails/${id}/reply`,
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Retry delivery of a received email. Can retry to a specific endpoint, retry a
   * specific failed delivery, or retry to all configured endpoints.
   */
  retry(id: string, body: EmailRetryParams, options?: RequestOptions): APIPromise<EmailRetryResponse> {
    return this._client.post(
      path`/api/e2/emails/${id}/retry`,
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Send an email immediately or schedule it for later using the scheduled_at
   * parameter. Supports HTML/text content, attachments, and custom headers.
   */
  send(body: EmailSendParams, options?: RequestOptions): APIPromise<EmailSendResponse> {
    return this._client.post(
      '/api/e2/emails',
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

export interface EmailRetrieveResponse {
  id: string;

  created_at: string;

  from: string;

  has_attachments: boolean;

  object: 'email';

  status: string;

  subject: string;

  to: Array<string>;

  type: 'sent' | 'received' | 'scheduled';

  attachments?: Array<unknown>;

  bcc?: Array<string> | null;

  cc?: Array<string> | null;

  headers?: unknown;

  html?: string | null;

  is_read?: boolean;

  reply_to?: Array<string> | null;

  scheduled_at?: string | null;

  sent_at?: string | null;

  tags?: Array<unknown>;

  text?: string | null;

  thread_id?: string | null;

  thread_position?: number | null;
}

export interface EmailListResponse {
  /**
   * Array of email objects matching the query
   */
  data: Array<EmailListResponse.Data>;

  /**
   * Applied filters for this query
   */
  filters: EmailListResponse.Filters;

  /**
   * Pagination metadata
   */
  pagination: EmailListResponse.Pagination;
}

export namespace EmailListResponse {
  export interface Data {
    /**
     * Unique identifier for the email
     */
    id: string;

    /**
     * ISO 8601 timestamp when the email was created/received
     */
    created_at: string;

    /**
     * Sender email address
     */
    from: string;

    /**
     * Whether the email has any attachments
     */
    has_attachments: boolean;

    /**
     * Current status of the email (delivered, pending, failed, bounced, scheduled,
     * cancelled)
     */
    status: string;

    /**
     * Email subject line
     */
    subject: string;

    /**
     * Array of recipient email addresses
     */
    to: Array<string>;

    type: 'sent' | 'received' | 'scheduled';

    /**
     * Number of attachments on the email
     */
    attachment_count?: number;

    /**
     * Array of CC recipient email addresses
     */
    cc?: Array<string>;

    /**
     * Sender display name if available
     */
    from_name?: string | null;

    /**
     * Whether the email has been archived (only for received emails)
     */
    is_archived?: boolean;

    /**
     * Whether the email has been read (only for received emails)
     */
    is_read?: boolean;

    /**
     * RFC 2822 Message-ID header value
     */
    message_id?: string | null;

    /**
     * First 200 characters of the email body as a preview
     */
    preview?: string | null;

    /**
     * ISO 8601 timestamp when the email was marked as read (only for received emails)
     */
    read_at?: string | null;

    /**
     * ISO 8601 timestamp when the email is scheduled to be sent
     */
    scheduled_at?: string | null;

    /**
     * ISO 8601 timestamp when the email was sent
     */
    sent_at?: string | null;

    /**
     * ID of the thread this email belongs to, if threaded
     */
    thread_id?: string | null;
  }

  /**
   * Applied filters for this query
   */
  export interface Filters {
    /**
     * Applied address filter
     */
    address?: string;

    /**
     * Applied domain filter
     */
    domain?: string;

    /**
     * Applied search query
     */
    search?: string;

    /**
     * Applied status filter
     */
    status?: string;

    /**
     * Applied time range filter
     */
    time_range?: string;

    /**
     * Applied type filter
     */
    type?: string;
  }

  /**
   * Pagination metadata
   */
  export interface Pagination {
    /**
     * Whether there are more results available
     */
    has_more: boolean;

    /**
     * Number of results per page
     */
    limit: number;

    /**
     * Number of results skipped
     */
    offset: number;

    /**
     * Total number of matching emails
     */
    total: number;
  }
}

export interface EmailDeleteResponse {
  id: string;

  message: string;

  success: boolean;
}

export interface EmailReplyResponse {
  id: string;

  aws_message_id: string;

  is_thread_reply: boolean;

  message_id: string;

  replied_to_email_id: string;

  replied_to_thread_id?: string;
}

export interface EmailRetryResponse {
  message: string;

  success: boolean;

  delivery_id?: string;
}

export interface EmailSendResponse {
  id: string;

  message_id?: string;

  scheduled_at?: string;

  status?: 'sent' | 'scheduled';

  timezone?: string;
}

export interface EmailListParams {
  /**
   * Filter by email address. Accepts address ID (e.g., 'addr_xxx') or raw email
   * address (e.g., 'user@example.com').
   */
  address?: string;

  /**
   * Filter by domain. Accepts domain ID (e.g., 'dom_xxx') or domain name (e.g.,
   * 'example.com').
   */
  domain?: string;

  /**
   * Maximum number of emails to return (1-100). Default is 50.
   */
  limit?: string;

  /**
   * Number of emails to skip for pagination. Default is 0.
   */
  offset?: string;

  /**
   * Search query to filter emails by subject, sender, or recipient. Case-insensitive
   * partial match.
   */
  search?: string;

  status?:
    | 'all'
    | 'delivered'
    | 'pending'
    | 'failed'
    | 'bounced'
    | 'scheduled'
    | 'cancelled'
    | 'unread'
    | 'read'
    | 'archived';

  time_range?: '1h' | '24h' | '7d' | '30d' | '90d' | 'all';

  type?: 'all' | 'sent' | 'received' | 'scheduled';
}

export interface EmailReplyParams {
  /**
   * Sender email address
   */
  from: string;

  attachments?: Array<EmailReplyParams.Attachment>;

  /**
   * Custom email headers
   */
  headers?: { [key: string]: string };

  /**
   * HTML content of the email
   */
  html?: string;

  /**
   * Include original CC recipients
   */
  reply_all?: boolean;

  /**
   * Email subject - defaults to Re: original subject
   */
  subject?: string;

  tags?: Array<EmailReplyParams.Tag>;

  /**
   * Plain text content of the email
   */
  text?: string;

  /**
   * Recipient email address(es) - defaults to original sender
   */
  to?: string | Array<string>;
}

export namespace EmailReplyParams {
  export interface Attachment {
    content: string;

    filename: string;

    content_type?: string;

    path?: string;
  }

  export interface Tag {
    name: string;

    value: string;
  }
}

export interface EmailRetryParams {
  /**
   * Specific delivery ID to retry. If provided, retries that specific delivery.
   */
  delivery_id?: string;

  /**
   * Endpoint ID to retry delivery to. If not provided, retries to all configured
   * endpoints.
   */
  endpoint_id?: string;
}

export interface EmailSendParams {
  /**
   * Sender email address
   */
  from: string;

  /**
   * Email subject
   */
  subject: string;

  /**
   * Recipient email address(es)
   */
  to: string | Array<string>;

  attachments?: Array<EmailSendParams.Attachment>;

  bcc?: string | Array<string>;

  cc?: string | Array<string>;

  /**
   * Custom email headers
   */
  headers?: { [key: string]: string };

  /**
   * HTML content of the email
   */
  html?: string;

  reply_to?: string | Array<string>;

  /**
   * ISO 8601 date or natural language for scheduling
   */
  scheduled_at?: string;

  tags?: Array<EmailSendParams.Tag>;

  /**
   * Plain text content of the email
   */
  text?: string;

  /**
   * Timezone for natural language parsing
   */
  timezone?: string;
}

export namespace EmailSendParams {
  export interface Attachment {
    content: string;

    filename: string;

    content_type?: string;

    path?: string;
  }

  export interface Tag {
    name: string;

    value: string;
  }
}

export declare namespace Emails {
  export {
    type EmailRetrieveResponse as EmailRetrieveResponse,
    type EmailListResponse as EmailListResponse,
    type EmailDeleteResponse as EmailDeleteResponse,
    type EmailReplyResponse as EmailReplyResponse,
    type EmailRetryResponse as EmailRetryResponse,
    type EmailSendResponse as EmailSendResponse,
    type EmailListParams as EmailListParams,
    type EmailReplyParams as EmailReplyParams,
    type EmailRetryParams as EmailRetryParams,
    type EmailSendParams as EmailSendParams,
  };
}
