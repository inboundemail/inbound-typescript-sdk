// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export {
  Domains,
  type DomainCreateResponse,
  type DomainRetrieveResponse,
  type DomainListResponse,
  type DomainDeleteResponse,
  type DomainRetrieveDNSRecordsResponse,
  type DomainUpdateCatchAllResponse,
  type DomainUpgradeMailFromResponse,
  type DomainCreateParams,
  type DomainRetrieveParams,
  type DomainListParams,
  type DomainUpdateCatchAllParams,
  type DomainUpgradeMailFromParams,
} from './domains/domains';
export {
  EmailAddresses,
  type EmailAddressCreateResponse,
  type EmailAddressRetrieveResponse,
  type EmailAddressUpdateResponse,
  type EmailAddressListResponse,
  type EmailAddressDeleteResponse,
  type EmailAddressCreateParams,
  type EmailAddressUpdateParams,
  type EmailAddressListParams,
} from './email-addresses';
export {
  Emails,
  type EmailRetrieveResponse,
  type EmailReplyResponse,
  type EmailSendResponse,
  type EmailReplyParams,
  type EmailSendParams,
} from './emails/emails';
export {
  Endpoints,
  type EndpointCreateResponse,
  type EndpointRetrieveResponse,
  type EndpointUpdateResponse,
  type EndpointListResponse,
  type EndpointDeleteResponse,
  type EndpointTestResponse,
  type EndpointCreateParams,
  type EndpointUpdateParams,
  type EndpointListParams,
  type EndpointTestParams,
} from './endpoints';
export {
  Mail,
  type MailRetrieveResponse,
  type MailUpdateResponse,
  type MailListResponse,
  type MailBulkUpdateResponse,
  type MailGetThreadResponse,
  type MailGetThreadCountsResponse,
  type MailReplyResponse,
  type MailUpdateParams,
  type MailListParams,
  type MailBulkUpdateParams,
  type MailGetThreadCountsParams,
  type MailReplyParams,
} from './mail';
export {
  Onboarding,
  type OnboardingCheckReplyResponse,
  type OnboardingHandleWebhookResponse,
  type OnboardingSendDemoResponse,
  type OnboardingHandleWebhookParams,
  type OnboardingSendDemoParams,
} from './onboarding';
