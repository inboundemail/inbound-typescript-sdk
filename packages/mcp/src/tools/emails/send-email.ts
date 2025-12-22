import { z } from "zod";
import type { InferSchema, ToolMetadata } from "xmcp";
import { getClientContext, validateDomainAccess } from "../../lib/client";

export const schema = {
	from: z
		.string()
		.describe("Sender email address (must be from a verified domain)"),
	to: z
		.union([z.string(), z.array(z.string())])
		.describe("Recipient email address(es)"),
	subject: z.string().describe("Email subject line"),
	html: z.string().optional().describe("HTML content of the email"),
	text: z.string().optional().describe("Plain text content of the email"),
	cc: z
		.union([z.string(), z.array(z.string())])
		.optional()
		.describe("CC recipient email address(es)"),
	bcc: z
		.union([z.string(), z.array(z.string())])
		.optional()
		.describe("BCC recipient email address(es)"),
	reply_to: z
		.union([z.string(), z.array(z.string())])
		.optional()
		.describe("Reply-to email address(es)"),
	scheduled_at: z
		.string()
		.optional()
		.describe(
			"ISO 8601 date or natural language time to schedule email (e.g., 'tomorrow at 9am')",
		),
	timezone: z
		.string()
		.optional()
		.describe(
			"Timezone for natural language scheduling (e.g., 'America/New_York')",
		),
};

export const metadata: ToolMetadata = {
	name: "send_email",
	description:
		"Send an email from your verified domain. Supports HTML and plain text content, CC/BCC, and scheduled sending with natural language times.",
	annotations: {
		title: "Send Email",
		readOnlyHint: false,
		destructiveHint: false,
		idempotentHint: false,
	},
};

export default async function sendEmail({
	from,
	to,
	subject,
	html,
	text,
	cc,
	bcc,
	reply_to,
	scheduled_at,
	timezone,
}: InferSchema<typeof schema>) {
	const { client, domain } = getClientContext();

	try {
		validateDomainAccess(from, domain);
	} catch (error) {
		return JSON.stringify({
			error:
				error instanceof Error
					? error.message
					: "Domain access validation failed",
		});
	}

	if (!html && !text) {
		return JSON.stringify({
			error: "Either 'html' or 'text' content is required",
		});
	}

	const response = await client.emails.send({
		from,
		to,
		subject,
		html,
		text,
		cc,
		bcc,
		reply_to,
		scheduled_at,
		timezone,
	});

	return JSON.stringify(
		{
			id: response.id,
			message_id: response.message_id,
			message: scheduled_at
				? "Email scheduled successfully"
				: "Email sent successfully",
		},
		null,
		2,
	);
}
