# E2

Methods:

- <code title="get /api/e2/attachments/{id}/{filename}">client.e2.<a href="./src/resources/e2/e2.ts">retrieve</a>(filename, { ...params }) -> void</code>

## Domains

Types:

- <code><a href="./src/resources/e2/domains.ts">DomainCreateResponse</a></code>
- <code><a href="./src/resources/e2/domains.ts">DomainRetrieveResponse</a></code>
- <code><a href="./src/resources/e2/domains.ts">DomainUpdateResponse</a></code>
- <code><a href="./src/resources/e2/domains.ts">DomainListResponse</a></code>
- <code><a href="./src/resources/e2/domains.ts">DomainDeleteResponse</a></code>

Methods:

- <code title="post /api/e2/domains">client.e2.domains.<a href="./src/resources/e2/domains.ts">create</a>({ ...params }) -> DomainCreateResponse</code>
- <code title="get /api/e2/domains/{id}">client.e2.domains.<a href="./src/resources/e2/domains.ts">retrieve</a>(id, { ...params }) -> DomainRetrieveResponse</code>
- <code title="patch /api/e2/domains/{id}">client.e2.domains.<a href="./src/resources/e2/domains.ts">update</a>(id, { ...params }) -> DomainUpdateResponse</code>
- <code title="get /api/e2/domains">client.e2.domains.<a href="./src/resources/e2/domains.ts">list</a>({ ...params }) -> DomainListResponse</code>
- <code title="delete /api/e2/domains/{id}">client.e2.domains.<a href="./src/resources/e2/domains.ts">delete</a>(id) -> DomainDeleteResponse</code>

## Endpoints

Types:

- <code><a href="./src/resources/e2/endpoints.ts">EndpointCreateResponse</a></code>
- <code><a href="./src/resources/e2/endpoints.ts">EndpointRetrieveResponse</a></code>
- <code><a href="./src/resources/e2/endpoints.ts">EndpointUpdateResponse</a></code>
- <code><a href="./src/resources/e2/endpoints.ts">EndpointListResponse</a></code>
- <code><a href="./src/resources/e2/endpoints.ts">EndpointDeleteResponse</a></code>
- <code><a href="./src/resources/e2/endpoints.ts">EndpointTestResponse</a></code>

Methods:

- <code title="post /api/e2/endpoints">client.e2.endpoints.<a href="./src/resources/e2/endpoints.ts">create</a>({ ...params }) -> EndpointCreateResponse</code>
- <code title="get /api/e2/endpoints/{id}">client.e2.endpoints.<a href="./src/resources/e2/endpoints.ts">retrieve</a>(id) -> EndpointRetrieveResponse</code>
- <code title="put /api/e2/endpoints/{id}">client.e2.endpoints.<a href="./src/resources/e2/endpoints.ts">update</a>(id, { ...params }) -> EndpointUpdateResponse</code>
- <code title="get /api/e2/endpoints">client.e2.endpoints.<a href="./src/resources/e2/endpoints.ts">list</a>({ ...params }) -> EndpointListResponse</code>
- <code title="delete /api/e2/endpoints/{id}">client.e2.endpoints.<a href="./src/resources/e2/endpoints.ts">delete</a>(id) -> EndpointDeleteResponse</code>
- <code title="post /api/e2/endpoints/{id}/test">client.e2.endpoints.<a href="./src/resources/e2/endpoints.ts">test</a>(id, { ...params }) -> EndpointTestResponse</code>

## EmailAddresses

Types:

- <code><a href="./src/resources/e2/email-addresses.ts">EmailAddressRetrieveResponse</a></code>
- <code><a href="./src/resources/e2/email-addresses.ts">EmailAddressUpdateResponse</a></code>
- <code><a href="./src/resources/e2/email-addresses.ts">EmailAddressDeleteResponse</a></code>
- <code><a href="./src/resources/e2/email-addresses.ts">EmailAddressEmailAddressesResponse</a></code>
- <code><a href="./src/resources/e2/email-addresses.ts">EmailAddressRetrieveEmailAddressesResponse</a></code>

Methods:

- <code title="get /api/e2/email-addresses/{id}">client.e2.emailAddresses.<a href="./src/resources/e2/email-addresses.ts">retrieve</a>(id) -> EmailAddressRetrieveResponse</code>
- <code title="put /api/e2/email-addresses/{id}">client.e2.emailAddresses.<a href="./src/resources/e2/email-addresses.ts">update</a>(id, { ...params }) -> EmailAddressUpdateResponse</code>
- <code title="delete /api/e2/email-addresses/{id}">client.e2.emailAddresses.<a href="./src/resources/e2/email-addresses.ts">delete</a>(id) -> EmailAddressDeleteResponse</code>
- <code title="post /api/e2/email-addresses">client.e2.emailAddresses.<a href="./src/resources/e2/email-addresses.ts">emailAddresses</a>({ ...params }) -> EmailAddressEmailAddressesResponse</code>
- <code title="get /api/e2/email-addresses">client.e2.emailAddresses.<a href="./src/resources/e2/email-addresses.ts">retrieveEmailAddresses</a>({ ...params }) -> EmailAddressRetrieveEmailAddressesResponse</code>

## Emails

Types:

- <code><a href="./src/resources/e2/emails.ts">EmailCreateResponse</a></code>
- <code><a href="./src/resources/e2/emails.ts">EmailRetrieveResponse</a></code>
- <code><a href="./src/resources/e2/emails.ts">EmailListResponse</a></code>
- <code><a href="./src/resources/e2/emails.ts">EmailDeleteResponse</a></code>
- <code><a href="./src/resources/e2/emails.ts">EmailReplyResponse</a></code>
- <code><a href="./src/resources/e2/emails.ts">EmailRetryResponse</a></code>

Methods:

- <code title="post /api/e2/emails">client.e2.emails.<a href="./src/resources/e2/emails.ts">create</a>({ ...params }) -> EmailCreateResponse</code>
- <code title="get /api/e2/emails/{id}">client.e2.emails.<a href="./src/resources/e2/emails.ts">retrieve</a>(id) -> EmailRetrieveResponse</code>
- <code title="get /api/e2/emails">client.e2.emails.<a href="./src/resources/e2/emails.ts">list</a>({ ...params }) -> EmailListResponse</code>
- <code title="delete /api/e2/emails/{id}">client.e2.emails.<a href="./src/resources/e2/emails.ts">delete</a>(id) -> EmailDeleteResponse</code>
- <code title="post /api/e2/emails/{id}/reply">client.e2.emails.<a href="./src/resources/e2/emails.ts">reply</a>(id, { ...params }) -> EmailReplyResponse</code>
- <code title="post /api/e2/emails/{id}/retry">client.e2.emails.<a href="./src/resources/e2/emails.ts">retry</a>(id, { ...params }) -> EmailRetryResponse</code>

## Mail

Types:

- <code><a href="./src/resources/e2/mail/mail.ts">MailListResponse</a></code>

Methods:

- <code title="get /api/e2/mail">client.e2.mail.<a href="./src/resources/e2/mail/mail.ts">list</a>({ ...params }) -> MailListResponse</code>

### Threads

Types:

- <code><a href="./src/resources/e2/mail/threads.ts">ThreadRetrieveResponse</a></code>
- <code><a href="./src/resources/e2/mail/threads.ts">ThreadListResponse</a></code>

Methods:

- <code title="get /api/e2/mail/threads/{id}">client.e2.mail.threads.<a href="./src/resources/e2/mail/threads.ts">retrieve</a>(id) -> ThreadRetrieveResponse</code>
- <code title="get /api/e2/mail/threads">client.e2.mail.threads.<a href="./src/resources/e2/mail/threads.ts">list</a>({ ...params }) -> ThreadListResponse</code>
