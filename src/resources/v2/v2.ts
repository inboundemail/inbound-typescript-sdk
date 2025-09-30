// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as EmailAddressesAPI from './email-addresses';
import {
  EmailAddressDeleteResponse,
  EmailAddressEmailAddressesParams,
  EmailAddressEmailAddressesResponse,
  EmailAddressRetrieveEmailAddressesParams,
  EmailAddressRetrieveEmailAddressesResponse,
  EmailAddressRetrieveResponse,
  EmailAddressUpdateParams,
  EmailAddressUpdateResponse,
  EmailAddresses,
} from './email-addresses';
import * as EndpointsAPI from './endpoints';
import {
  EndpointCreateParams,
  EndpointCreateResponse,
  EndpointDeleteResponse,
  EndpointListParams,
  EndpointListResponse,
  EndpointRetrieveResponse,
  EndpointUpdateParams,
  EndpointUpdateResponse,
  Endpoints,
} from './endpoints';
import * as ThreadsAPI from './threads';
import {
  ThreadActionsParams,
  ThreadActionsResponse,
  ThreadListParams,
  ThreadListResponse,
  ThreadRetrieveResponse,
  Threads,
} from './threads';
import * as DomainsAPI from './domains/domains';
import {
  DomainCreateParams,
  DomainCreateResponse,
  DomainDeleteResponse,
  DomainListParams,
  DomainListResponse,
  DomainRetrieveDNSRecordsResponse,
  DomainRetrieveParams,
  DomainRetrieveResponse,
  DomainUpdateResponse,
  Domains,
} from './domains/domains';
import * as EmailsAPI from './emails/emails';
import {
  AttachmentInput,
  EmailCreateParams,
  EmailCreateResponse,
  EmailReplyParams,
  EmailReplyResponse,
  EmailResendParams,
  EmailResendResponse,
  EmailRetrieveResponse,
  EmailRetryDeliveryParams,
  EmailRetryDeliveryResponse,
  Emails,
} from './emails/emails';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class V2 extends APIResource {
  domains: DomainsAPI.Domains = new DomainsAPI.Domains(this._client);
  emailAddresses: EmailAddressesAPI.EmailAddresses = new EmailAddressesAPI.EmailAddresses(this._client);
  emails: EmailsAPI.Emails = new EmailsAPI.Emails(this._client);
  endpoints: EndpointsAPI.Endpoints = new EndpointsAPI.Endpoints(this._client);
  threads: ThreadsAPI.Threads = new ThreadsAPI.Threads(this._client);

  /**
   * Downloads a specific email attachment by email ID and filename. Retrieves
   * attachment from AWS S3 storage or direct email content, parses MIME structure to
   * extract binary content, and returns file with appropriate headers (Content-Type
   * for MIME type, Content-Disposition for download trigger, Content-Length for
   * size, Cache-Control for caching). Supports all attachment types (PDF, images,
   * Office documents, archives). Filename must be URL-encoded for special
   * characters. Only attachments from emails belonging to the authenticated user can
   * be downloaded. Note: Uses API key authentication.
   *
   * @example
   * ```ts
   * await client.v2.retrieve('filename', { id: 'id' });
   * ```
   */
  retrieve(filename: string, params: V2RetrieveParams, options?: RequestOptions): APIPromise<void> {
    const { id } = params;
    return this._client.get(path`/api/v2/attachments/${id}/${filename}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface V2RetrieveParams {
  /**
   * The structured email ID (nanoid format, required)
   */
  id: string;
}

V2.Domains = Domains;
V2.EmailAddresses = EmailAddresses;
V2.Emails = Emails;
V2.Endpoints = Endpoints;
V2.Threads = Threads;

export declare namespace V2 {
  export { type V2RetrieveParams as V2RetrieveParams };

  export {
    Domains as Domains,
    type DomainCreateResponse as DomainCreateResponse,
    type DomainRetrieveResponse as DomainRetrieveResponse,
    type DomainUpdateResponse as DomainUpdateResponse,
    type DomainListResponse as DomainListResponse,
    type DomainDeleteResponse as DomainDeleteResponse,
    type DomainRetrieveDNSRecordsResponse as DomainRetrieveDNSRecordsResponse,
    type DomainCreateParams as DomainCreateParams,
    type DomainRetrieveParams as DomainRetrieveParams,
    type DomainListParams as DomainListParams,
  };

  export {
    EmailAddresses as EmailAddresses,
    type EmailAddressRetrieveResponse as EmailAddressRetrieveResponse,
    type EmailAddressUpdateResponse as EmailAddressUpdateResponse,
    type EmailAddressDeleteResponse as EmailAddressDeleteResponse,
    type EmailAddressEmailAddressesResponse as EmailAddressEmailAddressesResponse,
    type EmailAddressRetrieveEmailAddressesResponse as EmailAddressRetrieveEmailAddressesResponse,
    type EmailAddressUpdateParams as EmailAddressUpdateParams,
    type EmailAddressEmailAddressesParams as EmailAddressEmailAddressesParams,
    type EmailAddressRetrieveEmailAddressesParams as EmailAddressRetrieveEmailAddressesParams,
  };

  export {
    Emails as Emails,
    type AttachmentInput as AttachmentInput,
    type EmailCreateResponse as EmailCreateResponse,
    type EmailRetrieveResponse as EmailRetrieveResponse,
    type EmailReplyResponse as EmailReplyResponse,
    type EmailResendResponse as EmailResendResponse,
    type EmailRetryDeliveryResponse as EmailRetryDeliveryResponse,
    type EmailCreateParams as EmailCreateParams,
    type EmailReplyParams as EmailReplyParams,
    type EmailResendParams as EmailResendParams,
    type EmailRetryDeliveryParams as EmailRetryDeliveryParams,
  };

  export {
    Endpoints as Endpoints,
    type EndpointCreateResponse as EndpointCreateResponse,
    type EndpointRetrieveResponse as EndpointRetrieveResponse,
    type EndpointUpdateResponse as EndpointUpdateResponse,
    type EndpointListResponse as EndpointListResponse,
    type EndpointDeleteResponse as EndpointDeleteResponse,
    type EndpointCreateParams as EndpointCreateParams,
    type EndpointUpdateParams as EndpointUpdateParams,
    type EndpointListParams as EndpointListParams,
  };

  export {
    Threads as Threads,
    type ThreadRetrieveResponse as ThreadRetrieveResponse,
    type ThreadListResponse as ThreadListResponse,
    type ThreadActionsResponse as ThreadActionsResponse,
    type ThreadListParams as ThreadListParams,
    type ThreadActionsParams as ThreadActionsParams,
  };
}
