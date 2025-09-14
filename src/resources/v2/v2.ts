// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as EmailAddressesAPI from './email-addresses';
import {
  EmailAddressCreateParams,
  EmailAddressCreateResponse,
  EmailAddressDeleteResponse,
  EmailAddressListParams,
  EmailAddressListResponse,
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
  EndpointRetrieveParams,
  EndpointRetrieveResponse,
  EndpointTestParams,
  EndpointTestResponse,
  EndpointUpdateParams,
  EndpointUpdateResponse,
  Endpoints,
} from './endpoints';
import * as MailAPI from './mail';
import {
  Mail,
  MailBulkCreateParams,
  MailBulkCreateResponse,
  MailCreateParams,
  MailCreateResponse,
  MailListParams,
  MailListResponse,
  MailRetrieveResponse,
  MailRetrieveThreadResponse,
  MailThreadCountsResponse,
  MailUpdateParams,
  MailUpdateResponse,
} from './mail';
import * as OnboardingAPI from './onboarding';
import {
  Onboarding,
  OnboardingCheckReplyResponse,
  OnboardingDemoResponse,
  OnboardingWebhookResponse,
} from './onboarding';
import * as DomainsAPI from './domains/domains';
import {
  DomainCreateParams,
  DomainCreateResponse,
  DomainDeleteResponse,
  DomainListDNSRecordsResponse,
  DomainListParams,
  DomainListResponse,
  DomainRetrieveParams,
  DomainRetrieveResponse,
  DomainUpdateResponse,
  Domains,
} from './domains/domains';
import * as EmailsAPI from './emails/emails';
import {
  EmailCreateParams,
  EmailCreateResponse,
  EmailReplyParams,
  EmailReplyResponse,
  EmailRetrieveResponse,
  Emails,
} from './emails/emails';

export class V2 extends APIResource {
  domains: DomainsAPI.Domains = new DomainsAPI.Domains(this._client);
  emailAddresses: EmailAddressesAPI.EmailAddresses = new EmailAddressesAPI.EmailAddresses(this._client);
  emails: EmailsAPI.Emails = new EmailsAPI.Emails(this._client);
  endpoints: EndpointsAPI.Endpoints = new EndpointsAPI.Endpoints(this._client);
  mail: MailAPI.Mail = new MailAPI.Mail(this._client);
  onboarding: OnboardingAPI.Onboarding = new OnboardingAPI.Onboarding(this._client);
}

V2.Domains = Domains;
V2.EmailAddresses = EmailAddresses;
V2.Emails = Emails;
V2.Endpoints = Endpoints;
V2.Mail = Mail;
V2.Onboarding = Onboarding;

export declare namespace V2 {
  export {
    Domains as Domains,
    type DomainCreateResponse as DomainCreateResponse,
    type DomainRetrieveResponse as DomainRetrieveResponse,
    type DomainUpdateResponse as DomainUpdateResponse,
    type DomainListResponse as DomainListResponse,
    type DomainDeleteResponse as DomainDeleteResponse,
    type DomainListDNSRecordsResponse as DomainListDNSRecordsResponse,
    type DomainCreateParams as DomainCreateParams,
    type DomainRetrieveParams as DomainRetrieveParams,
    type DomainListParams as DomainListParams,
  };

  export {
    EmailAddresses as EmailAddresses,
    type EmailAddressCreateResponse as EmailAddressCreateResponse,
    type EmailAddressRetrieveResponse as EmailAddressRetrieveResponse,
    type EmailAddressUpdateResponse as EmailAddressUpdateResponse,
    type EmailAddressListResponse as EmailAddressListResponse,
    type EmailAddressDeleteResponse as EmailAddressDeleteResponse,
    type EmailAddressCreateParams as EmailAddressCreateParams,
    type EmailAddressUpdateParams as EmailAddressUpdateParams,
    type EmailAddressListParams as EmailAddressListParams,
  };

  export {
    Emails as Emails,
    type EmailCreateResponse as EmailCreateResponse,
    type EmailRetrieveResponse as EmailRetrieveResponse,
    type EmailReplyResponse as EmailReplyResponse,
    type EmailCreateParams as EmailCreateParams,
    type EmailReplyParams as EmailReplyParams,
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
    type EndpointRetrieveParams as EndpointRetrieveParams,
    type EndpointUpdateParams as EndpointUpdateParams,
    type EndpointListParams as EndpointListParams,
    type EndpointTestParams as EndpointTestParams,
  };

  export {
    Mail as Mail,
    type MailCreateResponse as MailCreateResponse,
    type MailRetrieveResponse as MailRetrieveResponse,
    type MailUpdateResponse as MailUpdateResponse,
    type MailListResponse as MailListResponse,
    type MailBulkCreateResponse as MailBulkCreateResponse,
    type MailRetrieveThreadResponse as MailRetrieveThreadResponse,
    type MailThreadCountsResponse as MailThreadCountsResponse,
    type MailCreateParams as MailCreateParams,
    type MailUpdateParams as MailUpdateParams,
    type MailListParams as MailListParams,
    type MailBulkCreateParams as MailBulkCreateParams,
  };

  export {
    Onboarding as Onboarding,
    type OnboardingCheckReplyResponse as OnboardingCheckReplyResponse,
    type OnboardingDemoResponse as OnboardingDemoResponse,
    type OnboardingWebhookResponse as OnboardingWebhookResponse,
  };
}
