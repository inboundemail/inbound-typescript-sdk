import { z } from "zod";
import type { InferSchema, ToolMetadata } from "xmcp";
import { getClientContext } from "../../lib/client";

export const schema = {
	id: z.string().describe("The thread ID to retrieve (e.g., 'thread_xxx')"),
};

export const metadata: ToolMetadata = {
	name: "get_thread",
	description:
		"Get a complete email thread (conversation) with all messages. Returns thread metadata, all messages in chronological order, and participant information.",
	annotations: {
		title: "Get Thread",
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
	},
};

export default async function getThread({ id }: InferSchema<typeof schema>) {
	const { client } = getClientContext();

	const response = await client.mail.retrieve(id);

	const messages = response.messages.map((m) => ({
		id: m.id,
		type: m.type,
		from: m.from,
		from_address: m.from_address,
		from_name: m.from_name,
		to: m.to,
		cc: m.cc,
		bcc: m.bcc,
		subject: m.subject,
		text_body: m.text_body,
		html_body: m.html_body,
		date: m.date,
		is_read: m.is_read,
		has_attachments: m.has_attachments,
		attachments: m.attachments,
		thread_position: m.thread_position,
		status: m.status,
		message_id: m.message_id,
	}));

	return JSON.stringify(
		{
			thread: {
				id: response.thread.id,
				subject: response.thread.normalized_subject,
				message_count: response.thread.message_count,
				participant_emails: response.thread.participant_emails,
				participant_names: response.thread.participant_names,
				created_at: response.thread.created_at,
				last_message_at: response.thread.last_message_at,
			},
			messages,
			total_count: response.total_count,
		},
		null,
		2,
	);
}
