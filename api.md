# V2

Methods:

- <code title="get /api/v2/attachments/{id}/{filename}">client.v2.<a href="./src/resources/v2/v2.ts">retrieve</a>(filename, { ...params }) -> void</code>

## Domains

Types:

- <code><a href="./src/resources/v2/domains/domains.ts">DomainCreateResponse</a></code>
- <code><a href="./src/resources/v2/domains/domains.ts">DomainRetrieveResponse</a></code>
- <code><a href="./src/resources/v2/domains/domains.ts">DomainUpdateResponse</a></code>
- <code><a href="./src/resources/v2/domains/domains.ts">DomainListResponse</a></code>
- <code><a href="./src/resources/v2/domains/domains.ts">DomainDeleteResponse</a></code>
- <code><a href="./src/resources/v2/domains/domains.ts">DomainRetrieveDNSRecordsResponse</a></code>

Methods:

- <code title="post /api/v2/domains">client.v2.domains.<a href="./src/resources/v2/domains/domains.ts">create</a>({ ...params }) -> DomainCreateResponse</code>
- <code title="get /api/v2/domains/{id}">client.v2.domains.<a href="./src/resources/v2/domains/domains.ts">retrieve</a>(id, { ...params }) -> DomainRetrieveResponse</code>
- <code title="patch /api/v2/domains/{id}">client.v2.domains.<a href="./src/resources/v2/domains/domains.ts">update</a>(id) -> unknown</code>
- <code title="get /api/v2/domains">client.v2.domains.<a href="./src/resources/v2/domains/domains.ts">list</a>({ ...params }) -> DomainListResponse</code>
- <code title="delete /api/v2/domains/{id}">client.v2.domains.<a href="./src/resources/v2/domains/domains.ts">delete</a>(id) -> DomainDeleteResponse</code>
- <code title="get /api/v2/domains/{id}/dns-records">client.v2.domains.<a href="./src/resources/v2/domains/domains.ts">retrieveDNSRecords</a>(id) -> DomainRetrieveDNSRecordsResponse</code>

### Auth

Types:

- <code><a href="./src/resources/v2/domains/auth.ts">AuthCreateResponse</a></code>
- <code><a href="./src/resources/v2/domains/auth.ts">AuthPatchAllResponse</a></code>

Methods:

- <code title="post /api/v2/domains/{id}/auth">client.v2.domains.auth.<a href="./src/resources/v2/domains/auth.ts">create</a>(id, { ...params }) -> AuthCreateResponse</code>
- <code title="patch /api/v2/domains/{id}/auth">client.v2.domains.auth.<a href="./src/resources/v2/domains/auth.ts">patchAll</a>(id) -> AuthPatchAllResponse</code>

## EmailAddresses

Types:

- <code><a href="./src/resources/v2/email-addresses.ts">EmailAddressRetrieveResponse</a></code>
- <code><a href="./src/resources/v2/email-addresses.ts">EmailAddressUpdateResponse</a></code>
- <code><a href="./src/resources/v2/email-addresses.ts">EmailAddressDeleteResponse</a></code>
- <code><a href="./src/resources/v2/email-addresses.ts">EmailAddressEmailAddressesResponse</a></code>
- <code><a href="./src/resources/v2/email-addresses.ts">EmailAddressRetrieveEmailAddressesResponse</a></code>

Methods:

- <code title="get /api/v2/email-addresses/{id}">client.v2.emailAddresses.<a href="./src/resources/v2/email-addresses.ts">retrieve</a>(id) -> EmailAddressRetrieveResponse</code>
- <code title="put /api/v2/email-addresses/{id}">client.v2.emailAddresses.<a href="./src/resources/v2/email-addresses.ts">update</a>(id, { ...params }) -> EmailAddressUpdateResponse</code>
- <code title="delete /api/v2/email-addresses/{id}">client.v2.emailAddresses.<a href="./src/resources/v2/email-addresses.ts">delete</a>(id) -> EmailAddressDeleteResponse</code>
- <code title="post /api/v2/email-addresses">client.v2.emailAddresses.<a href="./src/resources/v2/email-addresses.ts">emailAddresses</a>({ ...params }) -> EmailAddressEmailAddressesResponse</code>
- <code title="get /api/v2/email-addresses">client.v2.emailAddresses.<a href="./src/resources/v2/email-addresses.ts">retrieveEmailAddresses</a>({ ...params }) -> EmailAddressRetrieveEmailAddressesResponse</code>

## Emails

Types:

- <code><a href="./src/resources/v2/emails/emails.ts">AttachmentInput</a></code>
- <code><a href="./src/resources/v2/emails/emails.ts">EmailCreateResponse</a></code>
- <code><a href="./src/resources/v2/emails/emails.ts">EmailRetrieveResponse</a></code>
- <code><a href="./src/resources/v2/emails/emails.ts">EmailReplyResponse</a></code>
- <code><a href="./src/resources/v2/emails/emails.ts">EmailResendResponse</a></code>
- <code><a href="./src/resources/v2/emails/emails.ts">EmailRetryDeliveryResponse</a></code>

Methods:

- <code title="post /api/v2/emails">client.v2.emails.<a href="./src/resources/v2/emails/emails.ts">create</a>({ ...params }) -> EmailCreateResponse</code>
- <code title="get /api/v2/emails/{id}">client.v2.emails.<a href="./src/resources/v2/emails/emails.ts">retrieve</a>(id) -> EmailRetrieveResponse</code>
- <code title="post /api/v2/emails/{id}/reply">client.v2.emails.<a href="./src/resources/v2/emails/emails.ts">reply</a>(id, { ...params }) -> EmailReplyResponse</code>
- <code title="post /api/v2/emails/{id}/resend">client.v2.emails.<a href="./src/resources/v2/emails/emails.ts">resend</a>(id, { ...params }) -> EmailResendResponse</code>
- <code title="post /api/v2/emails/{id}/retry-delivery">client.v2.emails.<a href="./src/resources/v2/emails/emails.ts">retryDelivery</a>(id, { ...params }) -> EmailRetryDeliveryResponse</code>

### Schedule

Types:

- <code><a href="./src/resources/v2/emails/schedule.ts">ScheduleCreateResponse</a></code>
- <code><a href="./src/resources/v2/emails/schedule.ts">ScheduleRetrieveResponse</a></code>
- <code><a href="./src/resources/v2/emails/schedule.ts">ScheduleListResponse</a></code>
- <code><a href="./src/resources/v2/emails/schedule.ts">ScheduleDeleteResponse</a></code>

Methods:

- <code title="post /api/v2/emails/schedule">client.v2.emails.schedule.<a href="./src/resources/v2/emails/schedule.ts">create</a>({ ...params }) -> ScheduleCreateResponse</code>
- <code title="get /api/v2/emails/schedule/{id}">client.v2.emails.schedule.<a href="./src/resources/v2/emails/schedule.ts">retrieve</a>(id) -> ScheduleRetrieveResponse</code>
- <code title="get /api/v2/emails/schedule">client.v2.emails.schedule.<a href="./src/resources/v2/emails/schedule.ts">list</a>({ ...params }) -> ScheduleListResponse</code>
- <code title="delete /api/v2/emails/schedule/{id}">client.v2.emails.schedule.<a href="./src/resources/v2/emails/schedule.ts">delete</a>(id) -> ScheduleDeleteResponse</code>

## Endpoints

Types:

- <code><a href="./src/resources/v2/endpoints.ts">EndpointCreateResponse</a></code>
- <code><a href="./src/resources/v2/endpoints.ts">EndpointRetrieveResponse</a></code>
- <code><a href="./src/resources/v2/endpoints.ts">EndpointUpdateResponse</a></code>
- <code><a href="./src/resources/v2/endpoints.ts">EndpointListResponse</a></code>
- <code><a href="./src/resources/v2/endpoints.ts">EndpointDeleteResponse</a></code>

Methods:

- <code title="post /api/v2/endpoints">client.v2.endpoints.<a href="./src/resources/v2/endpoints.ts">create</a>({ ...params }) -> EndpointCreateResponse</code>
- <code title="get /api/v2/endpoints/{id}">client.v2.endpoints.<a href="./src/resources/v2/endpoints.ts">retrieve</a>(id) -> EndpointRetrieveResponse</code>
- <code title="put /api/v2/endpoints/{id}">client.v2.endpoints.<a href="./src/resources/v2/endpoints.ts">update</a>(id, { ...params }) -> EndpointUpdateResponse</code>
- <code title="get /api/v2/endpoints">client.v2.endpoints.<a href="./src/resources/v2/endpoints.ts">list</a>({ ...params }) -> EndpointListResponse</code>
- <code title="delete /api/v2/endpoints/{id}">client.v2.endpoints.<a href="./src/resources/v2/endpoints.ts">delete</a>(id) -> EndpointDeleteResponse</code>

## Threads

Types:

- <code><a href="./src/resources/v2/threads.ts">ThreadRetrieveResponse</a></code>
- <code><a href="./src/resources/v2/threads.ts">ThreadListResponse</a></code>
- <code><a href="./src/resources/v2/threads.ts">ThreadActionsResponse</a></code>

Methods:

- <code title="get /api/v2/threads/{id}">client.v2.threads.<a href="./src/resources/v2/threads.ts">retrieve</a>(id) -> ThreadRetrieveResponse</code>
- <code title="get /api/v2/threads">client.v2.threads.<a href="./src/resources/v2/threads.ts">list</a>({ ...params }) -> ThreadListResponse</code>
- <code title="post /api/v2/threads/{id}/actions">client.v2.threads.<a href="./src/resources/v2/threads.ts">actions</a>(id, { ...params }) -> ThreadActionsResponse</code>
