# Domains

Types:

- <code><a href="./src/resources/domains/domains.ts">DomainCreateResponse</a></code>
- <code><a href="./src/resources/domains/domains.ts">DomainRetrieveResponse</a></code>
- <code><a href="./src/resources/domains/domains.ts">DomainUpdateResponse</a></code>
- <code><a href="./src/resources/domains/domains.ts">DomainListResponse</a></code>
- <code><a href="./src/resources/domains/domains.ts">DomainDeleteResponse</a></code>
- <code><a href="./src/resources/domains/domains.ts">DomainListDNSRecordsResponse</a></code>

Methods:

- <code title="post /api/v2/domains">client.domains.<a href="./src/resources/domains/domains.ts">create</a>({ ...params }) -> DomainCreateResponse</code>
- <code title="get /api/v2/domains/{id}">client.domains.<a href="./src/resources/domains/domains.ts">retrieve</a>(pathID, { ...params }) -> DomainRetrieveResponse</code>
- <code title="patch /api/v2/domains/{id}">client.domains.<a href="./src/resources/domains/domains.ts">update</a>(id) -> unknown</code>
- <code title="get /api/v2/domains">client.domains.<a href="./src/resources/domains/domains.ts">list</a>({ ...params }) -> DomainListResponse</code>
- <code title="delete /api/v2/domains/{id}">client.domains.<a href="./src/resources/domains/domains.ts">delete</a>(id) -> DomainDeleteResponse</code>
- <code title="get /api/v2/domains/{id}/dns-records">client.domains.<a href="./src/resources/domains/domains.ts">listDNSRecords</a>(id) -> DomainListDNSRecordsResponse</code>

## Auth

Types:

- <code><a href="./src/resources/domains/auth.ts">AuthCreateResponse</a></code>
- <code><a href="./src/resources/domains/auth.ts">AuthUpdateResponse</a></code>

Methods:

- <code title="post /api/v2/domains/{id}/auth">client.domains.auth.<a href="./src/resources/domains/auth.ts">create</a>(id, { ...params }) -> AuthCreateResponse</code>
- <code title="patch /api/v2/domains/{id}/auth">client.domains.auth.<a href="./src/resources/domains/auth.ts">update</a>(id) -> AuthUpdateResponse</code>

# EmailAddresses

Types:

- <code><a href="./src/resources/email-addresses.ts">EmailAddressCreateResponse</a></code>
- <code><a href="./src/resources/email-addresses.ts">EmailAddressRetrieveResponse</a></code>
- <code><a href="./src/resources/email-addresses.ts">EmailAddressUpdateResponse</a></code>
- <code><a href="./src/resources/email-addresses.ts">EmailAddressListResponse</a></code>
- <code><a href="./src/resources/email-addresses.ts">EmailAddressDeleteResponse</a></code>

Methods:

- <code title="post /api/v2/email-addresses">client.emailAddresses.<a href="./src/resources/email-addresses.ts">create</a>({ ...params }) -> EmailAddressCreateResponse</code>
- <code title="get /api/v2/email-addresses/{id}">client.emailAddresses.<a href="./src/resources/email-addresses.ts">retrieve</a>(id) -> EmailAddressRetrieveResponse</code>
- <code title="put /api/v2/email-addresses/{id}">client.emailAddresses.<a href="./src/resources/email-addresses.ts">update</a>(id, { ...params }) -> EmailAddressUpdateResponse</code>
- <code title="get /api/v2/email-addresses">client.emailAddresses.<a href="./src/resources/email-addresses.ts">list</a>({ ...params }) -> EmailAddressListResponse</code>
- <code title="delete /api/v2/email-addresses/{id}">client.emailAddresses.<a href="./src/resources/email-addresses.ts">delete</a>(id) -> EmailAddressDeleteResponse</code>

# Emails

Types:

- <code><a href="./src/resources/emails/emails.ts">EmailCreateResponse</a></code>
- <code><a href="./src/resources/emails/emails.ts">EmailRetrieveResponse</a></code>
- <code><a href="./src/resources/emails/emails.ts">EmailReplyResponse</a></code>

Methods:

- <code title="post /api/v2/emails">client.emails.<a href="./src/resources/emails/emails.ts">create</a>({ ...params }) -> EmailCreateResponse</code>
- <code title="get /api/v2/emails/{id}">client.emails.<a href="./src/resources/emails/emails.ts">retrieve</a>(id) -> EmailRetrieveResponse</code>
- <code title="post /api/v2/emails/{id}/reply">client.emails.<a href="./src/resources/emails/emails.ts">reply</a>(id, { ...params }) -> EmailReplyResponse</code>

## Schedule

Types:

- <code><a href="./src/resources/emails/schedule.ts">ScheduleCreateResponse</a></code>
- <code><a href="./src/resources/emails/schedule.ts">ScheduleRetrieveResponse</a></code>
- <code><a href="./src/resources/emails/schedule.ts">ScheduleListResponse</a></code>
- <code><a href="./src/resources/emails/schedule.ts">ScheduleDeleteResponse</a></code>

Methods:

- <code title="post /api/v2/emails/schedule">client.emails.schedule.<a href="./src/resources/emails/schedule.ts">create</a>({ ...params }) -> ScheduleCreateResponse</code>
- <code title="get /api/v2/emails/schedule/{id}">client.emails.schedule.<a href="./src/resources/emails/schedule.ts">retrieve</a>(id) -> ScheduleRetrieveResponse</code>
- <code title="get /api/v2/emails/schedule">client.emails.schedule.<a href="./src/resources/emails/schedule.ts">list</a>({ ...params }) -> ScheduleListResponse</code>
- <code title="delete /api/v2/emails/schedule/{id}">client.emails.schedule.<a href="./src/resources/emails/schedule.ts">delete</a>(id) -> ScheduleDeleteResponse</code>

# Endpoints

Types:

- <code><a href="./src/resources/endpoints.ts">EndpointCreateResponse</a></code>
- <code><a href="./src/resources/endpoints.ts">EndpointRetrieveResponse</a></code>
- <code><a href="./src/resources/endpoints.ts">EndpointUpdateResponse</a></code>
- <code><a href="./src/resources/endpoints.ts">EndpointListResponse</a></code>
- <code><a href="./src/resources/endpoints.ts">EndpointDeleteResponse</a></code>
- <code><a href="./src/resources/endpoints.ts">EndpointTestResponse</a></code>

Methods:

- <code title="post /api/v2/endpoints">client.endpoints.<a href="./src/resources/endpoints.ts">create</a>({ ...params }) -> EndpointCreateResponse</code>
- <code title="get /api/v2/endpoints/{id}">client.endpoints.<a href="./src/resources/endpoints.ts">retrieve</a>(pathID, { ...params }) -> EndpointRetrieveResponse</code>
- <code title="put /api/v2/endpoints/{id}">client.endpoints.<a href="./src/resources/endpoints.ts">update</a>(pathID, { ...params }) -> EndpointUpdateResponse</code>
- <code title="get /api/v2/endpoints">client.endpoints.<a href="./src/resources/endpoints.ts">list</a>({ ...params }) -> EndpointListResponse</code>
- <code title="delete /api/v2/endpoints/{id}">client.endpoints.<a href="./src/resources/endpoints.ts">delete</a>(id) -> EndpointDeleteResponse</code>
- <code title="post /api/v2/endpoints/{id}/test">client.endpoints.<a href="./src/resources/endpoints.ts">test</a>(pathID, { ...params }) -> EndpointTestResponse</code>

# Mail

Types:

- <code><a href="./src/resources/mail.ts">MailCreateResponse</a></code>
- <code><a href="./src/resources/mail.ts">MailRetrieveResponse</a></code>
- <code><a href="./src/resources/mail.ts">MailUpdateResponse</a></code>
- <code><a href="./src/resources/mail.ts">MailListResponse</a></code>
- <code><a href="./src/resources/mail.ts">MailBulkCreateResponse</a></code>
- <code><a href="./src/resources/mail.ts">MailRetrieveThreadResponse</a></code>
- <code><a href="./src/resources/mail.ts">MailThreadCountsResponse</a></code>

Methods:

- <code title="post /api/v2/mail">client.mail.<a href="./src/resources/mail.ts">create</a>({ ...params }) -> MailCreateResponse</code>
- <code title="get /api/v2/mail/{id}">client.mail.<a href="./src/resources/mail.ts">retrieve</a>(id) -> MailRetrieveResponse</code>
- <code title="patch /api/v2/mail/{id}">client.mail.<a href="./src/resources/mail.ts">update</a>(id, { ...params }) -> MailUpdateResponse</code>
- <code title="get /api/v2/mail">client.mail.<a href="./src/resources/mail.ts">list</a>({ ...params }) -> MailListResponse</code>
- <code title="post /api/v2/mail/bulk">client.mail.<a href="./src/resources/mail.ts">bulkCreate</a>({ ...params }) -> MailBulkCreateResponse</code>
- <code title="get /api/v2/mail/{id}/thread">client.mail.<a href="./src/resources/mail.ts">retrieveThread</a>(id) -> MailRetrieveThreadResponse</code>
- <code title="post /api/v2/mail/thread-counts">client.mail.<a href="./src/resources/mail.ts">threadCounts</a>() -> unknown</code>
