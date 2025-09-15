// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Mail extends APIResource {
  /**
   * Retrieve detailed information about a specific received email including content,
   * attachments, headers, and security information.
   *
   * @example
   * ```ts
   * const mail = await client.mail.retrieve('123');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<MailRetrieveResponse> {
    return this._client.get(path`/v2/mail/${id}`, options);
  }

  /**
   * Update an email's read status, archive status, or other properties.
   *
   * @example
   * ```ts
   * const mail = await client.mail.update('123');
   * ```
   */
  update(
    id: string,
    body: MailUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MailUpdateResponse> {
    return this._client.patch(path`/v2/mail/${id}`, { body, ...options });
  }

  /**
   * Retrieve all received emails for the authenticated user with filtering, search,
   * and pagination options.
   *
   * @example
   * ```ts
   * const mail = await client.mail.list();
   * ```
   */
  list(
    query: MailListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MailListResponse> {
    return this._client.get('/v2/mail', { query, ...options });
  }

  /**
   * Update multiple emails at once (mark as read, archive, etc.). Limited to 100
   * emails per request.
   *
   * @example
   * ```ts
   * const response = await client.mail.bulkUpdate();
   * ```
   */
  bulkUpdate(
    body: MailBulkUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MailBulkUpdateResponse> {
    return this._client.post('/v2/mail/bulk', { body, ...options });
  }

  /**
   * Retrieve all emails in a conversation thread for a given email ID. Uses RFC 2822
   * threading with subject-based fallback.
   *
   * @example
   * ```ts
   * const response = await client.mail.getThread('123');
   * ```
   */
  getThread(id: string, options?: RequestOptions): APIPromise<MailGetThreadResponse> {
    return this._client.get(path`/v2/mail/${id}/thread`, options);
  }

  /**
   * Calculate conversation thread sizes for multiple emails in batch. Useful for
   * inbox listings to show conversation counts.
   *
   * @example
   * ```ts
   * const response = await client.mail.getThreadCounts();
   * ```
   */
  getThreadCounts(
    body: MailGetThreadCountsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MailGetThreadCountsResponse> {
    return this._client.post('/v2/mail/thread-counts', { body, ...options });
  }

  /**
   * Create a reply to a received email. This is a convenience endpoint that calls
   * the dedicated reply endpoint internally.
   *
   * @example
   * ```ts
   * const response = await client.mail.reply();
   * ```
   */
  reply(
    body: MailReplyParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MailReplyResponse> {
    return this._client.post('/v2/mail', { body, ...options });
  }
}

export interface MailRetrieveResponse {
  id?: string;

  addresses?: MailRetrieveResponse.Addresses;

  bcc?: string | null;

  cc?: string | null;

  content?: MailRetrieveResponse.Content;

  createdAt?: string | null;

  emailId?: string;

  from?: string;

  fromName?: string | null;

  isRead?: boolean;

  messageId?: string | null;

  metadata?: MailRetrieveResponse.Metadata;

  processing?: MailRetrieveResponse.Processing;

  readAt?: string | null;

  receivedAt?: string | null;

  recipient?: string;

  replyTo?: string | null;

  security?: MailRetrieveResponse.Security;

  subject?: string | null;

  to?: string;

  updatedAt?: string | null;
}

export namespace MailRetrieveResponse {
  export interface Addresses {
    bcc?: Addresses.Bcc | null;

    cc?: Addresses.Cc | null;

    from?: Addresses.From | null;

    replyTo?: Addresses.ReplyTo | null;

    to?: Addresses.To | null;
  }

  export namespace Addresses {
    export interface Bcc {
      addresses?: Array<Bcc.Address>;

      text?: string;
    }

    export namespace Bcc {
      export interface Address {
        address?: string | null;

        name?: string | null;
      }
    }

    export interface Cc {
      addresses?: Array<Cc.Address>;

      text?: string;
    }

    export namespace Cc {
      export interface Address {
        address?: string | null;

        name?: string | null;
      }
    }

    export interface From {
      addresses?: Array<From.Address>;

      text?: string;
    }

    export namespace From {
      export interface Address {
        address?: string | null;

        name?: string | null;
      }
    }

    export interface ReplyTo {
      addresses?: Array<ReplyTo.Address>;

      text?: string;
    }

    export namespace ReplyTo {
      export interface Address {
        address?: string | null;

        name?: string | null;
      }
    }

    export interface To {
      addresses?: Array<To.Address>;

      text?: string;
    }

    export namespace To {
      export interface Address {
        address?: string | null;

        name?: string | null;
      }
    }
  }

  export interface Content {
    attachments?: Array<Content.Attachment>;

    headers?: { [key: string]: unknown };

    htmlBody?: string | null;

    rawContent?: string | null;

    textBody?: string | null;
  }

  export namespace Content {
    export interface Attachment {
      contentDisposition?: string | null;

      contentId?: string | null;

      contentType?: string | null;

      filename?: string | null;

      size?: number | null;
    }
  }

  export interface Metadata {
    attachmentCount?: number;

    hasAttachments?: boolean;

    hasHtmlBody?: boolean;

    hasTextBody?: boolean;

    inReplyTo?: string | null;

    parseError?: string | null;

    parseSuccess?: boolean | null;

    priority?: string | null;

    references?: Array<string>;
  }

  export interface Processing {
    actionType?: string | null;

    commonHeaders?: { [key: string]: unknown } | null;

    processingTimeMs?: number | null;

    receiptTimestamp?: string | null;

    s3Info?: Processing.S3Info;

    timestamp?: string | null;
  }

  export namespace Processing {
    export interface S3Info {
      bucketName?: string | null;

      contentFetched?: boolean | null;

      contentSize?: number | null;

      error?: string | null;

      objectKey?: string | null;
    }
  }

  export interface Security {
    dkim?: string;

    dmarc?: string;

    spam?: string;

    spf?: string;

    virus?: string;
  }
}

export interface MailUpdateResponse {
  id?: string;

  archivedAt?: string | null;

  isArchived?: boolean;

  isRead?: boolean;

  readAt?: string | null;
}

export interface MailListResponse {
  emails?: Array<MailListResponse.Email>;

  filters?: MailListResponse.Filters;

  pagination?: MailListResponse.Pagination;
}

export namespace MailListResponse {
  export interface Email {
    id?: string;

    archivedAt?: string | null;

    attachmentCount?: number;

    createdAt?: string;

    emailId?: string;

    from?: string;

    fromName?: string | null;

    hasAttachments?: boolean;

    isArchived?: boolean;

    isRead?: boolean;

    messageId?: string | null;

    parseError?: string | null;

    parseSuccess?: boolean | null;

    preview?: string;

    readAt?: string | null;

    receivedAt?: string;

    recipient?: string;

    subject?: string;
  }

  export interface Filters {
    uniqueDomains?: Array<string>;
  }

  export interface Pagination {
    hasMore?: boolean;

    limit?: number;

    offset?: number;

    total?: number;
  }
}

export interface MailBulkUpdateResponse {
  emails?: Array<MailBulkUpdateResponse.Email>;

  updatedCount?: number;
}

export namespace MailBulkUpdateResponse {
  export interface Email {
    id?: string;

    isArchived?: boolean;

    isRead?: boolean;
  }
}

export interface MailGetThreadResponse {
  messages?: Array<MailGetThreadResponse.Message>;

  /**
   * The root message ID of the thread
   */
  threadId?: string;

  totalCount?: number;
}

export namespace MailGetThreadResponse {
  export interface Message {
    id?: string;

    addresses?: Message.Addresses;

    content?: Message.Content;

    from?: string;

    fromName?: string | null;

    isRead?: boolean;

    messageId?: string | null;

    metadata?: Message.Metadata;

    readAt?: string | null;

    receivedAt?: string | null;

    sentAt?: string | null;

    subject?: string | null;

    to?: string;

    type?: 'inbound' | 'outbound';
  }

  export namespace Message {
    export interface Addresses {
      from?: Addresses.From | null;

      to?: Addresses.To | null;
    }

    export namespace Addresses {
      export interface From {
        addresses?: Array<From.Address>;

        text?: string;
      }

      export namespace From {
        export interface Address {
          address?: string | null;

          name?: string | null;
        }
      }

      export interface To {
        addresses?: Array<To.Address>;

        text?: string;
      }

      export namespace To {
        export interface Address {
          address?: string | null;

          name?: string | null;
        }
      }
    }

    export interface Content {
      attachments?: Array<Content.Attachment>;

      htmlBody?: string | null;

      textBody?: string | null;
    }

    export namespace Content {
      export interface Attachment {
        contentDisposition?: string;

        contentId?: string;

        contentType?: string;

        filename?: string;

        size?: number;
      }
    }

    export interface Metadata {
      inReplyTo?: string | null;

      parseError?: string | null;

      parseSuccess?: boolean | null;

      references?: Array<string>;
    }
  }
}

export interface MailGetThreadCountsResponse {
  data?: Array<MailGetThreadCountsResponse.Data>;

  error?: string;

  success?: boolean;
}

export namespace MailGetThreadCountsResponse {
  export interface Data {
    emailId?: string;

    /**
     * true if thread count > 1
     */
    hasThread?: boolean;

    threadCount?: number;
  }
}

export interface MailReplyResponse {
  message?: string;

  originalEmailId?: string;

  replyData?: MailReplyResponse.ReplyData;

  status?: string;
}

export namespace MailReplyResponse {
  export interface ReplyData {
    attachmentCount?: number;

    hasHtmlBody?: boolean;

    hasTextBody?: boolean;

    subject?: string;

    to?: string;
  }
}

export interface MailUpdateParams {
  isArchived?: boolean | null;

  isRead?: boolean | null;
}

export interface MailListParams {
  domain?: string;

  emailAddress?: string;

  emailId?: string;

  includeArchived?: boolean;

  limit?: number;

  offset?: number;

  search?: string;

  status?: 'all' | 'processed' | 'failed';

  timeRange?: '24h' | '7d' | '30d' | '90d';
}

export interface MailBulkUpdateParams {
  emailIds?: Array<string>;

  updates?: MailBulkUpdateParams.Updates;
}

export namespace MailBulkUpdateParams {
  export interface Updates {
    isArchived?: boolean;

    isRead?: boolean;
  }
}

export interface MailGetThreadCountsParams {
  emailIds?: Array<string>;
}

export interface MailReplyParams {
  attachments?: Array<MailReplyParams.Attachment> | null;

  emailId?: string;

  htmlBody?: string | null;

  subject?: string;

  textBody?: string | null;

  to?: string;
}

export namespace MailReplyParams {
  export interface Attachment {
    content?: string;

    contentType?: string;

    filename?: string;
  }
}

export declare namespace Mail {
  export {
    type MailRetrieveResponse as MailRetrieveResponse,
    type MailUpdateResponse as MailUpdateResponse,
    type MailListResponse as MailListResponse,
    type MailBulkUpdateResponse as MailBulkUpdateResponse,
    type MailGetThreadResponse as MailGetThreadResponse,
    type MailGetThreadCountsResponse as MailGetThreadCountsResponse,
    type MailReplyResponse as MailReplyResponse,
    type MailUpdateParams as MailUpdateParams,
    type MailListParams as MailListParams,
    type MailBulkUpdateParams as MailBulkUpdateParams,
    type MailGetThreadCountsParams as MailGetThreadCountsParams,
    type MailReplyParams as MailReplyParams,
  };
}
