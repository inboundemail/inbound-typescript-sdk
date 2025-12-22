import { z } from "zod";
import type { InferSchema, ToolMetadata } from "xmcp";
import { getClientContext } from "../../lib/client";

export const schema = {
	id: z.string().describe("The email ID to retrieve (e.g., 'email_xxx')"),
};

export const metadata: ToolMetadata = {
	name: "get_email",
	description:
		"Get detailed information about a specific email including full content, headers, attachments, and delivery status.",
	annotations: {
		title: "Get Email",
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
	},
};

export default async function getEmail({ id }: InferSchema<typeof schema>) {
	const { client } = getClientContext();

	const email = await client.emails.retrieve(id);

	return JSON.stringify(
		{
			id: email.id,
			type: email.type,
			from: email.from,
			to: email.to,
			cc: email.cc,
			bcc: email.bcc,
			subject: email.subject,
			status: email.status,
			html: email.html,
			text: email.text,
			attachments: email.attachments,
			headers: email.headers,
			sent_at: email.sent_at,
			scheduled_at: email.scheduled_at,
			is_read: email.is_read,
			thread_id: email.thread_id,
			created_at: email.created_at,
		},
		null,
		2,
	);
}
