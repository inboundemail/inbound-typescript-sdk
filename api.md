# Attachments

Methods:

- <code title="get /api/e2/attachments/{id}/{filename}">client.attachments.<a href="./src/resources/attachments.ts">retrieve</a>(filename, { ...params }) -> void</code>

# Domains

Types:

- <code><a href="./src/resources/domains.ts">DomainCreateResponse</a></code>
- <code><a href="./src/resources/domains.ts">DomainRetrieveResponse</a></code>
- <code><a href="./src/resources/domains.ts">DomainUpdateResponse</a></code>
- <code><a href="./src/resources/domains.ts">DomainListResponse</a></code>
- <code><a href="./src/resources/domains.ts">DomainDeleteResponse</a></code>

Methods:

- <code title="post /api/e2/domains">client.domains.<a href="./src/resources/domains.ts">create</a>({ ...params }) -> DomainCreateResponse</code>
- <code title="get /api/e2/domains/{id}">client.domains.<a href="./src/resources/domains.ts">retrieve</a>(id, { ...params }) -> DomainRetrieveResponse</code>
- <code title="patch /api/e2/domains/{id}">client.domains.<a href="./src/resources/domains.ts">update</a>(id, { ...params }) -> DomainUpdateResponse</code>
- <code title="get /api/e2/domains">client.domains.<a href="./src/resources/domains.ts">list</a>({ ...params }) -> DomainListResponse</code>
- <code title="delete /api/e2/domains/{id}">client.domains.<a href="./src/resources/domains.ts">delete</a>(id) -> DomainDeleteResponse</code>

# Endpoints

Types:

- <code><a href="./src/resources/endpoints.ts">EndpointCreateResponse</a></code>
- <code><a href="./src/resources/endpoints.ts">EndpointRetrieveResponse</a></code>
- <code><a href="./src/resources/endpoints.ts">EndpointUpdateResponse</a></code>
- <code><a href="./src/resources/endpoints.ts">EndpointListResponse</a></code>
- <code><a href="./src/resources/endpoints.ts">EndpointDeleteResponse</a></code>
- <code><a href="./src/resources/endpoints.ts">EndpointTestResponse</a></code>

Methods:

- <code title="post /api/e2/endpoints">client.endpoints.<a href="./src/resources/endpoints.ts">create</a>({ ...params }) -> EndpointCreateResponse</code>
- <code title="get /api/e2/endpoints/{id}">client.endpoints.<a href="./src/resources/endpoints.ts">retrieve</a>(id) -> EndpointRetrieveResponse</code>
- <code title="put /api/e2/endpoints/{id}">client.endpoints.<a href="./src/resources/endpoints.ts">update</a>(id, { ...params }) -> EndpointUpdateResponse</code>
- <code title="get /api/e2/endpoints">client.endpoints.<a href="./src/resources/endpoints.ts">list</a>({ ...params }) -> EndpointListResponse</code>
- <code title="delete /api/e2/endpoints/{id}">client.endpoints.<a href="./src/resources/endpoints.ts">delete</a>(id) -> EndpointDeleteResponse</code>
- <code title="post /api/e2/endpoints/{id}/test">client.endpoints.<a href="./src/resources/endpoints.ts">test</a>(id, { ...params }) -> EndpointTestResponse</code>

# EmailAddresses

Types:

- <code><a href="./src/resources/email-addresses.ts">EmailAddressCreateResponse</a></code>
- <code><a href="./src/resources/email-addresses.ts">EmailAddressRetrieveResponse</a></code>
- <code><a href="./src/resources/email-addresses.ts">EmailAddressUpdateResponse</a></code>
- <code><a href="./src/resources/email-addresses.ts">EmailAddressListResponse</a></code>
- <code><a href="./src/resources/email-addresses.ts">EmailAddressDeleteResponse</a></code>

Methods:

- <code title="post /api/e2/email-addresses">client.emailAddresses.<a href="./src/resources/email-addresses.ts">create</a>({ ...params }) -> EmailAddressCreateResponse</code>
- <code title="get /api/e2/email-addresses/{id}">client.emailAddresses.<a href="./src/resources/email-addresses.ts">retrieve</a>(id) -> EmailAddressRetrieveResponse</code>
- <code title="put /api/e2/email-addresses/{id}">client.emailAddresses.<a href="./src/resources/email-addresses.ts">update</a>(id, { ...params }) -> EmailAddressUpdateResponse</code>
- <code title="get /api/e2/email-addresses">client.emailAddresses.<a href="./src/resources/email-addresses.ts">list</a>({ ...params }) -> EmailAddressListResponse</code>
- <code title="delete /api/e2/email-addresses/{id}">client.emailAddresses.<a href="./src/resources/email-addresses.ts">delete</a>(id) -> EmailAddressDeleteResponse</code>

# Emails

Types:

- <code><a href="./src/resources/emails.ts">EmailRetrieveResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailListResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailDeleteResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailReplyResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailRetryResponse</a></code>
- <code><a href="./src/resources/emails.ts">EmailSendResponse</a></code>

Methods:

- <code title="get /api/e2/emails/{id}">client.emails.<a href="./src/resources/emails.ts">retrieve</a>(id) -> EmailRetrieveResponse</code>
- <code title="get /api/e2/emails">client.emails.<a href="./src/resources/emails.ts">list</a>({ ...params }) -> EmailListResponse</code>
- <code title="delete /api/e2/emails/{id}">client.emails.<a href="./src/resources/emails.ts">delete</a>(id) -> EmailDeleteResponse</code>
- <code title="post /api/e2/emails/{id}/reply">client.emails.<a href="./src/resources/emails.ts">reply</a>(id, { ...params }) -> EmailReplyResponse</code>
- <code title="post /api/e2/emails/{id}/retry">client.emails.<a href="./src/resources/emails.ts">retry</a>(id, { ...params }) -> EmailRetryResponse</code>
- <code title="post /api/e2/emails">client.emails.<a href="./src/resources/emails.ts">send</a>({ ...params }) -> EmailSendResponse</code>

# Mail

Types:

- <code><a href="./src/resources/mail/mail.ts">MailListResponse</a></code>

Methods:

- <code title="get /api/e2/mail">client.mail.<a href="./src/resources/mail/mail.ts">list</a>({ ...params }) -> MailListResponse</code>

## Threads

Types:

- <code><a href="./src/resources/mail/threads.ts">ThreadRetrieveResponse</a></code>
- <code><a href="./src/resources/mail/threads.ts">ThreadListResponse</a></code>

Methods:

- <code title="get /api/e2/mail/threads/{id}">client.mail.threads.<a href="./src/resources/mail/threads.ts">retrieve</a>(id) -> ThreadRetrieveResponse</code>
- <code title="get /api/e2/mail/threads">client.mail.threads.<a href="./src/resources/mail/threads.ts">list</a>({ ...params }) -> ThreadListResponse</code>
