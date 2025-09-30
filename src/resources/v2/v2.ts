// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as EmailsAPI from './emails/emails';
import {
  AttachmentInput,
  EmailReplyParams,
  EmailReplyResponse,
  EmailResendParams,
  EmailResendResponse,
  EmailRetrieveResponse,
  EmailRetryDeliveryParams,
  EmailRetryDeliveryResponse,
  EmailSendParams,
  EmailSendResponse,
  Emails,
} from './emails/emails';

export class V2 extends APIResource {
  emails: EmailsAPI.Emails = new EmailsAPI.Emails(this._client);
}

V2.Emails = Emails;

export declare namespace V2 {
  export {
    Emails as Emails,
    type AttachmentInput as AttachmentInput,
    type EmailRetrieveResponse as EmailRetrieveResponse,
    type EmailReplyResponse as EmailReplyResponse,
    type EmailResendResponse as EmailResendResponse,
    type EmailRetryDeliveryResponse as EmailRetryDeliveryResponse,
    type EmailSendResponse as EmailSendResponse,
    type EmailReplyParams as EmailReplyParams,
    type EmailResendParams as EmailResendParams,
    type EmailRetryDeliveryParams as EmailRetryDeliveryParams,
    type EmailSendParams as EmailSendParams,
  };
}
