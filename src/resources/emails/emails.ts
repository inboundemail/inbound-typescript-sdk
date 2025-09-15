// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as ScheduleAPI from './schedule';
import {
  Schedule,
  ScheduleCreateParams,
  ScheduleCreateResponse,
  ScheduleListParams,
  ScheduleListResponse,
} from './schedule';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Emails extends APIResource {
  schedule: ScheduleAPI.Schedule = new ScheduleAPI.Schedule(this._client);

  /**
   * Retrieve details of a specific sent email by its ID. Compatible with Resend API
   * format.
   *
   * @example
   * ```ts
   * const email = await client.emails.retrieve('123');
   * ```
   */
  retrieve(id: string, options?: RequestOptions): APIPromise<EmailRetrieveResponse> {
    return this._client.get(path`/v2/emails/${id}`, options);
  }

  /**
   * Reply to an inbound email with proper threading support. Supports both simple
   * mode (faster) and full mode (with attachments and original message quoting).
   *
   * @example
   * ```ts
   * const response = await client.emails.reply('123');
   * ```
   */
  reply(
    id: string,
    body: EmailReplyParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EmailReplyResponse> {
    return this._client.post(path`/v2/emails/${id}/reply`, { body, ...options });
  }

  /**
   * Send a single email through the Inbound API. Supports both simple text/HTML
   * emails and emails with attachments. Compatible with Resend API format for easy
   * migration.
   *
   * @example
   * ```ts
   * const response = await client.emails.send();
   * ```
   */
  send(
    body: EmailSendParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<EmailSendResponse> {
    return this._client.post('/v2/emails', { body, ...options });
  }
}

export interface EmailRetrieveResponse {
  id?: string;

  bcc?: Array<unknown>;

  cc?: Array<unknown>;

  created_at?: string;

  from?: string;

  html?: string | null;

  last_event?: string;

  object?: 'email';

  reply_to?: Array<unknown>;

  subject?: string;

  text?: string | null;

  to?: Array<string>;
}

export interface EmailReplyResponse {
  id?: string;

  /**
   * AWS SES Message ID
   */
  awsMessageId?: string;

  /**
   * Inbound message ID (used for threading)
   */
  messageId?: string;
}

export interface EmailSendResponse {
  id?: string;

  /**
   * AWS SES Message ID
   */
  messageId?: string;
}

export interface EmailReplyParams {
  attachments?: Array<EmailReplyParams.Attachment> | null;

  bcc?: string | Array<string> | null;

  cc?: string | Array<string> | null;

  from?: string;

  /**
   * Optional sender name for display
   */
  from_name?: string | null;

  headers?: { [key: string]: string } | null;

  html?: string | null;

  /**
   * snake_case (legacy)
   */
  include_original?: boolean | null;

  /**
   * camelCase (Resend-compatible)
   */
  includeOriginal?: boolean | null;

  /**
   * snake_case (legacy)
   */
  reply_to?: string | Array<string> | null;

  /**
   * camelCase (Resend-compatible)
   */
  replyTo?: string | Array<string> | null;

  /**
   * Use simplified reply mode (faster, lighter)
   */
  simple?: boolean | null;

  /**
   * Optional - will add "Re: " to original subject if not provided
   */
  subject?: string | null;

  tags?: Array<EmailReplyParams.Tag> | null;

  text?: string | null;

  /**
   * Optional - will use original sender if not provided
   */
  to?: string | Array<string> | null;
}

export namespace EmailReplyParams {
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

export interface EmailSendParams {
  attachments?: Array<EmailSendParams.Attachment> | null;

  bcc?: string | Array<string> | null;

  cc?: string | Array<string> | null;

  /**
   * Now supports both "email@domain.com" and "Display Name <email@domain.com>"
   * formats
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

  subject?: string;

  tags?: Array<EmailSendParams.Tag> | null;

  text?: string | null;

  to?: string | Array<string>;
}

export namespace EmailSendParams {
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

Emails.Schedule = Schedule;

export declare namespace Emails {
  export {
    type EmailRetrieveResponse as EmailRetrieveResponse,
    type EmailReplyResponse as EmailReplyResponse,
    type EmailSendResponse as EmailSendResponse,
    type EmailReplyParams as EmailReplyParams,
    type EmailSendParams as EmailSendParams,
  };

  export {
    Schedule as Schedule,
    type ScheduleCreateResponse as ScheduleCreateResponse,
    type ScheduleListResponse as ScheduleListResponse,
    type ScheduleCreateParams as ScheduleCreateParams,
    type ScheduleListParams as ScheduleListParams,
  };
}
