import type { Inbound } from "../client";

/**
 * Represents an email address with optional display name.
 */
export interface InboundEmailAddress {
	name: string | null;
	address: string;
}

/**
 * Represents a collection of email addresses with the raw text representation.
 */
export interface InboundEmailAddressField {
	text: string;
	addresses: InboundEmailAddress[];
}

/**
 * Represents an email attachment in the webhook payload.
 */
export interface InboundAttachment {
	filename: string;
	contentType: string;
	size: number;
	contentId?: string | null;
	contentDisposition?: string;
	downloadUrl: string;
}

/**
 * Represents the parsed email data in the webhook payload.
 */
export interface InboundParsedEmailData {
	messageId: string;
	date: Date | string;
	subject: string;
	from: InboundEmailAddressField;
	to: InboundEmailAddressField;
	cc: InboundEmailAddressField | null;
	bcc: InboundEmailAddressField | null;
	replyTo: InboundEmailAddressField | null;
	inReplyTo?: string;
	references?: string;
	textBody?: string;
	htmlBody?: string;
	raw?: string;
	attachments: InboundAttachment[];
	headers: Record<string, string | string[]>;
	priority?: string;
}

/**
 * Represents cleaned/processed email content.
 */
export interface InboundCleanedContent {
	html?: string;
	text?: string;
	hasHtml: boolean;
	hasText: boolean;
	attachments: InboundAttachment[];
	headers: Record<string, string | string[]>;
}

/**
 * Represents the email object within the webhook payload.
 */
export interface InboundEmail {
	id: string;
	messageId: string;
	from: InboundEmailAddressField;
	to: InboundEmailAddressField;
	recipient: string;
	subject: string;
	receivedAt: string;
	parsedData: InboundParsedEmailData;
	cleanedContent: InboundCleanedContent;
}

/**
 * Represents the endpoint information in the webhook payload.
 */
export interface InboundEndpointInfo {
	id: string;
	name: string;
	type: string;
}

/**
 * The complete webhook payload structure sent by Inbound when an email is received.
 *
 * @example
 * ```ts
 * import type { InboundWebhookPayload } from 'inboundemail';
 *
 * export async function POST(request: Request) {
 *   const payload: InboundWebhookPayload = await request.json();
 *   const { email, endpoint } = payload;
 *
 *   console.log(`Received email from ${email.from.addresses[0].address}`);
 *   console.log(`Subject: ${email.subject}`);
 *
 *   return new Response('OK', { status: 200 });
 * }
 * ```
 */
export interface InboundWebhookPayload {
	event: "email.received" | "webhook_test" | string;
	timestamp: string;
	email: InboundEmail;
	endpoint: InboundEndpointInfo;
}

/**
 * Type guard to check if an object is a valid InboundWebhookPayload.
 *
 * @param payload - The object to check
 * @returns True if the payload is a valid InboundWebhookPayload
 *
 * @example
 * ```ts
 * import { isInboundWebhookPayload } from 'inboundemail';
 *
 * export async function POST(request: Request) {
 *   const data = await request.json();
 *
 *   if (!isInboundWebhookPayload(data)) {
 *     return new Response('Invalid payload', { status: 400 });
 *   }
 *
 *   // data is now typed as InboundWebhookPayload
 *   console.log(data.email.subject);
 * }
 * ```
 */
export function isInboundWebhookPayload(
	payload: unknown,
): payload is InboundWebhookPayload {
	if (typeof payload !== "object" || payload === null) {
		return false;
	}

	const obj = payload as Record<string, unknown>;

	return (
		typeof obj["event"] === "string" &&
		typeof obj["timestamp"] === "string" &&
		typeof obj["email"] === "object" &&
		obj["email"] !== null &&
		typeof obj["endpoint"] === "object" &&
		obj["endpoint"] !== null
	);
}

/**
 * Verifies a webhook request using the endpoint ID and verification token from headers.
 *
 * This function fetches the endpoint configuration from the Inbound API and compares
 * the verification token to ensure the webhook request is legitimate.
 *
 * @param endpointId - The endpoint ID from the `X-Endpoint-ID` header
 * @param verificationToken - The token from the `X-Webhook-Verification-Token` header
 * @param client - An initialized Inbound client instance
 * @returns Promise<boolean> - True if the webhook is verified, false otherwise
 *
 * @example
 * ```ts
 * import { Inbound, verifyWebhook } from 'inboundemail';
 *
 * const inbound = new Inbound(process.env.INBOUND_API_KEY!);
 *
 * export async function POST(request: Request) {
 *   const endpointId = request.headers.get('X-Endpoint-ID');
 *   const verificationToken = request.headers.get('X-Webhook-Verification-Token');
 *
 *   if (!endpointId || !verificationToken) {
 *     return new Response('Missing headers', { status: 401 });
 *   }
 *
 *   const isValid = await verifyWebhook(endpointId, verificationToken, inbound);
 *
 *   if (!isValid) {
 *     return new Response('Unauthorized', { status: 401 });
 *   }
 *
 *   // Process the verified webhook...
 * }
 * ```
 */
export async function verifyWebhook(
	endpointId: string,
	verificationToken: string,
	client: Inbound,
): Promise<boolean> {
	try {
		const endpoint = await client.endpoints.retrieve(endpointId);

		if (!endpoint || !endpoint.config) {
			return false;
		}

		// The verificationToken is stored in the config object for webhook endpoints
		const config = endpoint.config as Record<string, unknown>;
		const storedToken = config["verificationToken"];

		if (typeof storedToken !== "string") {
			return false;
		}

		return storedToken === verificationToken;
	} catch {
		return false;
	}
}

/**
 * Verifies a webhook request by extracting headers and validating against the Inbound API.
 *
 * This is a convenience function that extracts the `X-Endpoint-ID` and
 * `X-Webhook-Verification-Token` headers and calls `verifyWebhook`.
 *
 * @param headers - The request headers (Headers object or plain object)
 * @param client - An initialized Inbound client instance
 * @returns Promise<boolean> - True if the webhook is verified, false otherwise
 *
 * @example
 * ```ts
 * import { Inbound, verifyWebhookFromHeaders, type InboundWebhookPayload } from 'inboundemail';
 *
 * const inbound = new Inbound(process.env.INBOUND_API_KEY!);
 *
 * export async function POST(request: Request) {
 *   const isValid = await verifyWebhookFromHeaders(request.headers, inbound);
 *
 *   if (!isValid) {
 *     return new Response('Unauthorized', { status: 401 });
 *   }
 *
 *   const payload: InboundWebhookPayload = await request.json();
 *   console.log(`Received verified email: ${payload.email.subject}`);
 *
 *   return new Response('OK', { status: 200 });
 * }
 * ```
 */
export async function verifyWebhookFromHeaders(
	headers: Headers | Record<string, string | undefined>,
	client: Inbound,
): Promise<boolean> {
	let endpointId: string | null | undefined;
	let verificationToken: string | null | undefined;

	if (headers instanceof Headers) {
		endpointId = headers.get("X-Endpoint-ID");
		verificationToken = headers.get("X-Webhook-Verification-Token");
	} else {
		endpointId = headers["X-Endpoint-ID"] || headers["x-endpoint-id"];
		verificationToken =
			headers["X-Webhook-Verification-Token"] ||
			headers["x-webhook-verification-token"];
	}

	if (!endpointId || !verificationToken) {
		return false;
	}

	return verifyWebhook(endpointId, verificationToken, client);
}
