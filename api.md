# Domains

Types:

- <code><a href="./src/resources/domains/domains.ts">DomainCreateResponse</a></code>
- <code><a href="./src/resources/domains/domains.ts">DomainRetrieveResponse</a></code>
- <code><a href="./src/resources/domains/domains.ts">DomainListResponse</a></code>
- <code><a href="./src/resources/domains/domains.ts">DomainDeleteResponse</a></code>
- <code><a href="./src/resources/domains/domains.ts">DomainRetrieveDNSRecordsResponse</a></code>
- <code><a href="./src/resources/domains/domains.ts">DomainUpdateCatchAllResponse</a></code>
- <code><a href="./src/resources/domains/domains.ts">DomainUpgradeMailFromResponse</a></code>

Methods:

- <code title="post /v2/domains">client.domains.<a href="./src/resources/domains/domains.ts">create</a>({ ...params }) -> DomainCreateResponse</code>
- <code title="get /v2/domains/{id}">client.domains.<a href="./src/resources/domains/domains.ts">retrieve</a>(pathID, { ...params }) -> DomainRetrieveResponse</code>
- <code title="get /v2/domains">client.domains.<a href="./src/resources/domains/domains.ts">list</a>({ ...params }) -> DomainListResponse</code>
- <code title="delete /v2/domains/{id}">client.domains.<a href="./src/resources/domains/domains.ts">delete</a>(id) -> DomainDeleteResponse</code>
- <code title="get /v2/domains/{id}/dns-records">client.domains.<a href="./src/resources/domains/domains.ts">retrieveDNSRecords</a>(id) -> DomainRetrieveDNSRecordsResponse</code>
- <code title="put /v2/domains/{id}">client.domains.<a href="./src/resources/domains/domains.ts">updateCatchAll</a>(id, { ...params }) -> DomainUpdateCatchAllResponse</code>
- <code title="patch /v2/domains/{id}">client.domains.<a href="./src/resources/domains/domains.ts">upgradeMailFrom</a>(id, { ...params }) -> DomainUpgradeMailFromResponse</code>

## Auth

Types:

- <code><a href="./src/resources/domains/auth.ts">AuthInitializeResponse</a></code>
- <code><a href="./src/resources/domains/auth.ts">AuthVerifyResponse</a></code>

Methods:

- <code title="post /v2/domains/{id}/auth">client.domains.auth.<a href="./src/resources/domains/auth.ts">initialize</a>(id, { ...params }) -> AuthInitializeResponse</code>
- <code title="patch /v2/domains/{id}/auth">client.domains.auth.<a href="./src/resources/domains/auth.ts">verify</a>(id, { ...params }) -> AuthVerifyResponse</code>

# EmailAddresses

Types:

- <code><a href="./src/resources/email-addresses.ts">EmailAddressCreateResponse</a></code>
- <code><a href="./src/resources/email-addresses.ts">EmailAddressRetrieveResponse</a></code>
- <code><a href="./src/resources/email-addresses.ts">EmailAddressUpdateResponse</a></code>
- <code><a href="./src/resources/email-addresses.ts">EmailAddressListResponse</a></code>
- <code><a href="./src/resources/email-addresses.ts">EmailAddressDeleteResponse</a></code>

Methods:

- <code title="post /v2/email-addresses">client.emailAddresses.<a href="./src/resources/email-addresses.ts">create</a>({ ...params }) -> EmailAddressCreateResponse</code>
- <code title="get /v2/email-addresses/{id}">client.emailAddresses.<a href="./src/resources/email-addresses.ts">retrieve</a>(id) -> EmailAddressRetrieveResponse</code>
- <code title="put /v2/email-addresses/{id}">client.emailAddresses.<a href="./src/resources/email-addresses.ts">update</a>(id, { ...params }) -> EmailAddressUpdateResponse</code>
- <code title="get /v2/email-addresses">client.emailAddresses.<a href="./src/resources/email-addresses.ts">list</a>({ ...params }) -> EmailAddressListResponse</code>
- <code title="delete /v2/email-addresses/{id}">client.emailAddresses.<a href="./src/resources/email-addresses.ts">delete</a>(id) -> EmailAddressDeleteResponse</code>

# Emails

Types:

- <code><a href="./src/resources/emails/emails.ts">EmailRetrieveResponse</a></code>
- <code><a href="./src/resources/emails/emails.ts">EmailReplyResponse</a></code>
- <code><a href="./src/resources/emails/emails.ts">EmailSendResponse</a></code>

Methods:

- <code title="get /v2/emails/{id}">client.emails.<a href="./src/resources/emails/emails.ts">retrieve</a>(id) -> EmailRetrieveResponse</code>
- <code title="post /v2/emails/{id}/reply">client.emails.<a href="./src/resources/emails/emails.ts">reply</a>(id, { ...params }) -> EmailReplyResponse</code>
- <code title="post /v2/emails">client.emails.<a href="./src/resources/emails/emails.ts">send</a>({ ...params }) -> EmailSendResponse</code>

## Schedule

Types:

- <code><a href="./src/resources/emails/schedule.ts">ScheduleCreateResponse</a></code>
- <code><a href="./src/resources/emails/schedule.ts">ScheduleListResponse</a></code>

Methods:

- <code title="post /v2/emails/schedule">client.emails.schedule.<a href="./src/resources/emails/schedule.ts">create</a>({ ...params }) -> ScheduleCreateResponse</code>
- <code title="get /v2/emails/schedule">client.emails.schedule.<a href="./src/resources/emails/schedule.ts">list</a>({ ...params }) -> ScheduleListResponse</code>

# Endpoints

Types:

- <code><a href="./src/resources/endpoints.ts">EndpointCreateResponse</a></code>
- <code><a href="./src/resources/endpoints.ts">EndpointRetrieveResponse</a></code>
- <code><a href="./src/resources/endpoints.ts">EndpointUpdateResponse</a></code>
- <code><a href="./src/resources/endpoints.ts">EndpointListResponse</a></code>
- <code><a href="./src/resources/endpoints.ts">EndpointDeleteResponse</a></code>
- <code><a href="./src/resources/endpoints.ts">EndpointTestResponse</a></code>

Methods:

- <code title="post /v2/endpoints">client.endpoints.<a href="./src/resources/endpoints.ts">create</a>({ ...params }) -> EndpointCreateResponse</code>
- <code title="get /v2/endpoints/{id}">client.endpoints.<a href="./src/resources/endpoints.ts">retrieve</a>(id) -> EndpointRetrieveResponse</code>
- <code title="put /v2/endpoints/{id}">client.endpoints.<a href="./src/resources/endpoints.ts">update</a>(pathID, { ...params }) -> EndpointUpdateResponse</code>
- <code title="get /v2/endpoints">client.endpoints.<a href="./src/resources/endpoints.ts">list</a>({ ...params }) -> EndpointListResponse</code>
- <code title="delete /v2/endpoints/{id}">client.endpoints.<a href="./src/resources/endpoints.ts">delete</a>(id) -> EndpointDeleteResponse</code>
- <code title="post /v2/endpoints/{id}/test">client.endpoints.<a href="./src/resources/endpoints.ts">test</a>(pathID, { ...params }) -> EndpointTestResponse</code>

# Mail

Types:

- <code><a href="./src/resources/mail.ts">MailRetrieveResponse</a></code>
- <code><a href="./src/resources/mail.ts">MailUpdateResponse</a></code>
- <code><a href="./src/resources/mail.ts">MailListResponse</a></code>
- <code><a href="./src/resources/mail.ts">MailBulkUpdateResponse</a></code>
- <code><a href="./src/resources/mail.ts">MailGetThreadResponse</a></code>
- <code><a href="./src/resources/mail.ts">MailGetThreadCountsResponse</a></code>
- <code><a href="./src/resources/mail.ts">MailReplyResponse</a></code>

Methods:

- <code title="get /v2/mail/{id}">client.mail.<a href="./src/resources/mail.ts">retrieve</a>(id) -> MailRetrieveResponse</code>
- <code title="patch /v2/mail/{id}">client.mail.<a href="./src/resources/mail.ts">update</a>(id, { ...params }) -> MailUpdateResponse</code>
- <code title="get /v2/mail">client.mail.<a href="./src/resources/mail.ts">list</a>({ ...params }) -> MailListResponse</code>
- <code title="post /v2/mail/bulk">client.mail.<a href="./src/resources/mail.ts">bulkUpdate</a>({ ...params }) -> MailBulkUpdateResponse</code>
- <code title="get /v2/mail/{id}/thread">client.mail.<a href="./src/resources/mail.ts">getThread</a>(id) -> MailGetThreadResponse</code>
- <code title="post /v2/mail/thread-counts">client.mail.<a href="./src/resources/mail.ts">getThreadCounts</a>({ ...params }) -> MailGetThreadCountsResponse</code>
- <code title="post /v2/mail">client.mail.<a href="./src/resources/mail.ts">reply</a>({ ...params }) -> MailReplyResponse</code>

# Onboarding

Types:

- <code><a href="./src/resources/onboarding.ts">OnboardingCheckReplyResponse</a></code>
- <code><a href="./src/resources/onboarding.ts">OnboardingHandleWebhookResponse</a></code>
- <code><a href="./src/resources/onboarding.ts">OnboardingSendDemoResponse</a></code>

Methods:

- <code title="get /v2/onboarding/check-reply">client.onboarding.<a href="./src/resources/onboarding.ts">checkReply</a>() -> OnboardingCheckReplyResponse</code>
- <code title="post /v2/onboarding/webhook">client.onboarding.<a href="./src/resources/onboarding.ts">handleWebhook</a>() -> OnboardingHandleWebhookResponse</code>
- <code title="post /v2/onboarding/demo">client.onboarding.<a href="./src/resources/onboarding.ts">sendDemo</a>({ ...params }) -> OnboardingSendDemoResponse</code>
