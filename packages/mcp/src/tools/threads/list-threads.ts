import { z } from "zod";
import type { InferSchema, ToolMetadata } from "xmcp";
import { getClientContext } from "../../lib/client";

export const schema = {
	limit: z
		.number()
		.min(1)
		.max(100)
		.optional()
		.describe("Maximum number of threads to return (1-100, default 25)"),
	cursor: z
		.string()
		.optional()
		.describe(
			"Cursor for pagination (pass next_cursor from previous response)",
		),
	search: z
		.string()
		.optional()
		.describe(
			"Search query to filter threads by subject or participant emails",
		),
	unread: z
		.boolean()
		.optional()
		.describe("Set to true to only return threads with unread messages"),
};

export const metadata: ToolMetadata = {
	name: "list_threads",
	description:
		"List email threads (conversations) in your inbox. Threads group related emails together like Gmail conversations. Returns thread metadata, participant list, and latest message preview.",
	annotations: {
		title: "List Threads",
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
	},
};

export default async function listThreads({
	limit,
	cursor,
	search,
	unread,
}: InferSchema<typeof schema>) {
	const { client, domain } = getClientContext();

	const response = await client.mail.list({
		limit: String(limit ?? 25),
		cursor,
		search,
		unread: unread ? "true" : undefined,
		domain: domain ?? undefined,
	});

	const threads = response.threads.map((t) => ({
		id: t.id,
		subject: t.normalized_subject,
		message_count: t.message_count,
		has_unread: t.has_unread,
		unread_count: t.unread_count,
		is_archived: t.is_archived,
		participant_emails: t.participant_emails,
		last_message_at: t.last_message_at,
		latest_message: t.latest_message
			? {
					id: t.latest_message.id,
					from: t.latest_message.from_text,
					subject: t.latest_message.subject,
					preview: t.latest_message.text_preview,
					type: t.latest_message.type,
					is_read: t.latest_message.is_read,
					has_attachments: t.latest_message.has_attachments,
				}
			: null,
	}));

	return JSON.stringify(
		{
			threads,
			pagination: response.pagination,
			filters: {
				...response.filters,
				filteredByDomain: domain,
			},
		},
		null,
		2,
	);
}
