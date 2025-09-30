# V2

## Emails

Types:

- <code><a href="./src/resources/v2/emails/emails.ts">AttachmentInput</a></code>
- <code><a href="./src/resources/v2/emails/emails.ts">EmailRetrieveResponse</a></code>
- <code><a href="./src/resources/v2/emails/emails.ts">EmailReplyResponse</a></code>
- <code><a href="./src/resources/v2/emails/emails.ts">EmailResendResponse</a></code>
- <code><a href="./src/resources/v2/emails/emails.ts">EmailRetryDeliveryResponse</a></code>
- <code><a href="./src/resources/v2/emails/emails.ts">EmailSendResponse</a></code>

Methods:

- <code title="get /api/v2/emails/{id}">client.v2.emails.<a href="./src/resources/v2/emails/emails.ts">retrieve</a>(id) -> EmailRetrieveResponse</code>
- <code title="post /api/v2/emails/{id}/reply">client.v2.emails.<a href="./src/resources/v2/emails/emails.ts">reply</a>(id, { ...params }) -> EmailReplyResponse</code>
- <code title="post /api/v2/emails/{id}/resend">client.v2.emails.<a href="./src/resources/v2/emails/emails.ts">resend</a>(id, { ...params }) -> EmailResendResponse</code>
- <code title="post /api/v2/emails/{id}/retry-delivery">client.v2.emails.<a href="./src/resources/v2/emails/emails.ts">retryDelivery</a>(id, { ...params }) -> EmailRetryDeliveryResponse</code>
- <code title="post /api/v2/emails">client.v2.emails.<a href="./src/resources/v2/emails/emails.ts">send</a>({ ...params }) -> EmailSendResponse</code>

### Schedule

Types:

- <code><a href="./src/resources/v2/emails/schedule.ts">ScheduleCreateResponse</a></code>
- <code><a href="./src/resources/v2/emails/schedule.ts">ScheduleRetrieveResponse</a></code>
- <code><a href="./src/resources/v2/emails/schedule.ts">ScheduleListResponse</a></code>
- <code><a href="./src/resources/v2/emails/schedule.ts">ScheduleCancelResponse</a></code>

Methods:

- <code title="post /api/v2/emails/schedule">client.v2.emails.schedule.<a href="./src/resources/v2/emails/schedule.ts">create</a>({ ...params }) -> ScheduleCreateResponse</code>
- <code title="get /api/v2/emails/schedule/{id}">client.v2.emails.schedule.<a href="./src/resources/v2/emails/schedule.ts">retrieve</a>(id) -> ScheduleRetrieveResponse</code>
- <code title="get /api/v2/emails/schedule">client.v2.emails.schedule.<a href="./src/resources/v2/emails/schedule.ts">list</a>({ ...params }) -> ScheduleListResponse</code>
- <code title="delete /api/v2/emails/schedule/{id}">client.v2.emails.schedule.<a href="./src/resources/v2/emails/schedule.ts">cancel</a>(id) -> ScheduleCancelResponse</code>
