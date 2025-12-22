import { z } from "zod";
import type { InferSchema, ToolMetadata } from "xmcp";
import { getClientContext } from "../../lib/client";

export const schema = {
	limit: z
		.number()
		.min(1)
		.max(100)
		.optional()
		.describe("Maximum number of endpoints to return (1-100, default 50)"),
	offset: z
		.number()
		.min(0)
		.optional()
		.describe("Number of endpoints to skip for pagination"),
	type: z
		.enum(["webhook", "email", "email_group"])
		.optional()
		.describe("Filter by endpoint type"),
};

export const metadata: ToolMetadata = {
	name: "list_endpoints",
	description:
		"List all endpoints (webhooks and email forwards) in your account. Endpoints define where incoming emails are delivered.",
	annotations: {
		title: "List Endpoints",
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
	},
};

export default async function listEndpoints({
	limit,
	offset,
	type,
}: InferSchema<typeof schema>) {
	const { client, domain } = getClientContext();

	const response = await client.endpoints.list({
		limit: limit ?? 50,
		offset: offset ?? 0,
		type,
	});

	let endpoints = response.data.map((e) => ({
		id: e.id,
		name: e.name,
		type: e.type,
		isActive: e.isActive,
		deliveryStats: e.deliveryStats,
		createdAt: e.createdAt,
		config: e.config,
	}));

	if (domain) {
		endpoints = endpoints.filter((e) => {
			const name = e.name?.toLowerCase() ?? "";
			return name.includes(domain.toLowerCase());
		});
	}

	return JSON.stringify(
		{
			endpoints,
			pagination: response.pagination,
			filteredByDomain: domain,
		},
		null,
		2,
	);
}
