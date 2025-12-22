import { z } from "zod";
import type { InferSchema, ToolMetadata } from "xmcp";
import type { EndpointCreateParams } from "inboundemail/resources/endpoints";
import { getClientContext } from "../../lib/client";

export const schema = {
	name: z.string().describe("A descriptive name for this endpoint"),
	type: z
		.enum(["webhook", "email", "email_group"])
		.describe(
			"Type of endpoint: 'webhook' for HTTP delivery, 'email' for forwarding to a single address, 'email_group' for forwarding to multiple addresses",
		),
	url: z
		.string()
		.optional()
		.describe("Webhook URL (required for webhook type)"),
	forwardTo: z
		.string()
		.optional()
		.describe("Email address to forward to (required for email type)"),
	emails: z
		.array(z.string())
		.optional()
		.describe(
			"List of email addresses to forward to (required for email_group type)",
		),
	preserveHeaders: z
		.boolean()
		.optional()
		.describe(
			"Whether to preserve original email headers when forwarding (for email/email_group types)",
		),
};

export const metadata: ToolMetadata = {
	name: "create_endpoint",
	description:
		"Create a new endpoint for receiving emails. Webhooks deliver emails as HTTP POST requests, email forwards send to another address.",
	annotations: {
		title: "Create Endpoint",
		readOnlyHint: false,
		destructiveHint: false,
		idempotentHint: false,
	},
};

export default async function createEndpoint({
	name,
	type,
	url,
	forwardTo,
	emails,
	preserveHeaders,
}: InferSchema<typeof schema>) {
	const { client } = getClientContext();

	let config: EndpointCreateParams["config"];

	switch (type) {
		case "webhook":
			if (!url) {
				return JSON.stringify({
					error: "URL is required for webhook endpoints",
				});
			}
			config = { url };
			break;
		case "email":
			if (!forwardTo) {
				return JSON.stringify({
					error: "forwardTo is required for email endpoints",
				});
			}
			config = { forwardTo, preserveHeaders };
			break;
		case "email_group":
			if (!emails || emails.length === 0) {
				return JSON.stringify({
					error: "emails array is required for email_group endpoints",
				});
			}
			config = { emails, preserveHeaders };
			break;
		default:
			return JSON.stringify({ error: `Unknown endpoint type: ${type}` });
	}

	const response = await client.endpoints.create({
		name,
		type,
		config,
	});

	return JSON.stringify(
		{
			id: response.id,
			name: response.name,
			type: response.type,
			isActive: response.isActive,
			config: response.config,
			message:
				"Endpoint created successfully. You can now route email addresses to this endpoint.",
		},
		null,
		2,
	);
}
