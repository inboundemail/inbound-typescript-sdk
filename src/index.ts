// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export { Inbound as default } from "./client";

export { type Uploadable, toFile } from "./core/uploads";
export { APIPromise } from "./core/api-promise";
export { Inbound, type ClientOptions } from "./client";
export {
	InboundError,
	APIError,
	APIConnectionError,
	APIConnectionTimeoutError,
	APIUserAbortError,
	NotFoundError,
	ConflictError,
	RateLimitError,
	BadRequestError,
	AuthenticationError,
	InternalServerError,
	PermissionDeniedError,
	UnprocessableEntityError,
} from "./core/error";
export { render } from "./lib/render";

// Webhook types and helpers
export {
	type InboundWebhookPayload,
	type InboundEmail,
	type InboundEmailAddress,
	type InboundEmailAddressField,
	type InboundAttachment,
	type InboundParsedEmailData,
	type InboundCleanedContent,
	type InboundEndpointInfo,
	isInboundWebhookPayload,
	verifyWebhook,
	verifyWebhookFromHeaders,
} from "./lib/webhook";
