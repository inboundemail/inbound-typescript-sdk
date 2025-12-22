import { z } from "zod";
import type { InferSchema, ToolMetadata } from "xmcp";
import { getClientContext } from "../../lib/client";

export const schema = {
	type: z
		.enum(["all", "sent", "received", "scheduled"])
		.optional()
		.describe(
			"Filter by email type: 'sent', 'received', 'scheduled', or 'all' (default)",
		),
	status: z
		.enum([
			"all",
			"delivered",
			"pending",
			"failed",
			"bounced",
			"scheduled",
			"cancelled",
			"unread",
			"read",
			"archived",
		])
		.optional()
		.describe("Filter by email status"),
	limit: z
		.number()
		.min(1)
		.max(100)
		.optional()
		.describe("Maximum number of emails to return (1-100, default 50)"),
	offset: z
		.number()
		.min(0)
		.optional()
		.describe("Number of emails to skip for pagination"),
	search: z
		.string()
		.optional()
		.describe("Search query to filter emails by subject, sender, or recipient"),
	time_range: z
		.enum(["1h", "24h", "7d", "30d", "90d", "all"])
		.optional()
		.describe("Filter by time range"),
};

export const metadata: ToolMetadata = {
	name: "list_emails",
	description:
		"List emails in your Inbound account. Filter by type (sent, received, scheduled), status, time range, and more. Returns email metadata including sender, recipient, subject, and status.",
	annotations: {
		title: "List Emails",
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
	},
};

export default async function listEmails({
	type,
	status,
	limit,
	offset,
	search,
	time_range,
}: InferSchema<typeof schema>) {
	const { client, domain } = getClientContext();

	const response = await client.emails.list({
		type,
		status,
		limit: String(limit ?? 50),
		offset: String(offset ?? 0),
		search,
		time_range,
		domain: domain ?? undefined,
	});

	const emails = response.data.map((e) => ({
		id: e.id,
		from: e.from,
		to: e.to,
		subject: e.subject,
		type: e.type,
		status: e.status,
		created_at: e.created_at,
		preview: e.preview,
	}));

	return JSON.stringify(
		{
			emails,
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
