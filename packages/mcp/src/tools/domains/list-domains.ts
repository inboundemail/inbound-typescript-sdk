import { z } from "zod";
import type { InferSchema, ToolMetadata } from "xmcp";
import { getClientContext } from "../../lib/client";

export const schema = {
	limit: z
		.number()
		.min(1)
		.max(100)
		.optional()
		.describe("Maximum number of domains to return (1-100, default 50)"),
	offset: z
		.number()
		.min(0)
		.optional()
		.describe("Number of domains to skip for pagination"),
};

export const metadata: ToolMetadata = {
	name: "list_domains",
	description:
		"List all domains in your Inbound account. Returns domain verification status, DNS records needed, and whether the domain can receive emails.",
	annotations: {
		title: "List Domains",
		readOnlyHint: true,
		destructiveHint: false,
		idempotentHint: true,
	},
};

export default async function listDomains({
	limit,
	offset,
}: InferSchema<typeof schema>) {
	const { client, domain: domainFilter } = getClientContext();

	const response = await client.domains.list({
		limit: limit ?? 50,
		offset: offset ?? 0,
	});

	const domains = response.data.map((d) => ({
		id: d.id,
		domain: d.domain,
		status: d.status,
		canReceiveEmails: d.canReceiveEmails,
		hasMxRecords: d.hasMxRecords,
		createdAt: d.createdAt,
	}));

	// If domain filter is set, show exact match OR subdomains of that domain
	let filteredDomains = domains;
	if (domainFilter) {
		const lowerFilter = domainFilter.toLowerCase();
		filteredDomains = domains.filter((d) => {
			const domainLower = d.domain.toLowerCase();
			// Match exact domain or subdomains (e.g., "mail.inbound.new" matches filter "inbound.new")
			return (
				domainLower === lowerFilter || domainLower.endsWith(`.${lowerFilter}`)
			);
		});
	}

	return JSON.stringify(
		{
			domains: filteredDomains,
			pagination: response.pagination,
			filteredByDomain: domainFilter,
		},
		null,
		2,
	);
}
