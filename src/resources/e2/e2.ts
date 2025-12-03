// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as DomainsAPI from './domains';
import {
  DomainCreateParams,
  DomainCreateResponse,
  DomainDeleteResponse,
  DomainListParams,
  DomainListResponse,
  DomainRetrieveParams,
  DomainRetrieveResponse,
  DomainUpdateParams,
  DomainUpdateResponse,
  Domains,
} from './domains';
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
import * as EmailsAPI from './emails';
import {
  EmailCreateParams,
  EmailCreateResponse,
  EmailDeleteResponse,
  EmailListParams,
  EmailListResponse,
  EmailReplyParams,
  EmailReplyResponse,
  EmailRetrieveResponse,
  EmailRetryParams,
  EmailRetryResponse,
  Emails,
} from './emails';
import * as EndpointsAPI from './endpoints';
import {
  EndpointCreateParams,
  EndpointCreateResponse,
  EndpointDeleteResponse,
  EndpointListParams,
  EndpointListResponse,
  EndpointRetrieveResponse,
  EndpointTestParams,
  EndpointTestResponse,
  EndpointUpdateParams,
  EndpointUpdateResponse,
  Endpoints,
} from './endpoints';
import * as MailAPI from './mail/mail';
import { Mail, MailListParams, MailListResponse } from './mail/mail';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class E2 extends APIResource {
  domains: DomainsAPI.Domains = new DomainsAPI.Domains(this._client);
  endpoints: EndpointsAPI.Endpoints = new EndpointsAPI.Endpoints(this._client);
  emailAddresses: EmailAddressesAPI.EmailAddresses = new EmailAddressesAPI.EmailAddresses(this._client);
  emails: EmailsAPI.Emails = new EmailsAPI.Emails(this._client);
  mail: MailAPI.Mail = new MailAPI.Mail(this._client);

  /**
   * Download an email attachment by email ID and filename. Returns the binary file
   * content with appropriate Content-Type and Content-Disposition headers.
   */
  retrieve(filename: string, params: E2RetrieveParams, options?: RequestOptions): APIPromise<void> {
    const { id } = params;
    return this._client.get(path`/api/e2/attachments/${id}/${filename}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface E2RetrieveParams {
  id: string;
}

E2.Domains = Domains;
E2.Endpoints = Endpoints;
E2.EmailAddresses = EmailAddresses;
E2.Emails = Emails;
E2.Mail = Mail;

export declare namespace E2 {
  export { type E2RetrieveParams as E2RetrieveParams };

  export {
    Domains as Domains,
    type DomainCreateResponse as DomainCreateResponse,
    type DomainRetrieveResponse as DomainRetrieveResponse,
    type DomainUpdateResponse as DomainUpdateResponse,
    type DomainListResponse as DomainListResponse,
    type DomainDeleteResponse as DomainDeleteResponse,
    type DomainCreateParams as DomainCreateParams,
    type DomainRetrieveParams as DomainRetrieveParams,
    type DomainUpdateParams as DomainUpdateParams,
    type DomainListParams as DomainListParams,
  };

  export {
    Endpoints as Endpoints,
    type EndpointCreateResponse as EndpointCreateResponse,
    type EndpointRetrieveResponse as EndpointRetrieveResponse,
    type EndpointUpdateResponse as EndpointUpdateResponse,
    type EndpointListResponse as EndpointListResponse,
    type EndpointDeleteResponse as EndpointDeleteResponse,
    type EndpointTestResponse as EndpointTestResponse,
    type EndpointCreateParams as EndpointCreateParams,
    type EndpointUpdateParams as EndpointUpdateParams,
    type EndpointListParams as EndpointListParams,
    type EndpointTestParams as EndpointTestParams,
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
    type EmailCreateResponse as EmailCreateResponse,
    type EmailRetrieveResponse as EmailRetrieveResponse,
    type EmailListResponse as EmailListResponse,
    type EmailDeleteResponse as EmailDeleteResponse,
    type EmailReplyResponse as EmailReplyResponse,
    type EmailRetryResponse as EmailRetryResponse,
    type EmailCreateParams as EmailCreateParams,
    type EmailListParams as EmailListParams,
    type EmailReplyParams as EmailReplyParams,
    type EmailRetryParams as EmailRetryParams,
  };

  export { Mail as Mail, type MailListResponse as MailListResponse, type MailListParams as MailListParams };
}
