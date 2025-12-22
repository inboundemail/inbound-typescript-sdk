import Inbound from "inboundemail";
import { headers } from "xmcp/headers";

export interface ClientContext {
	client: Inbound;
	domain: string | null;
}

export function getClientContext(): ClientContext {
	const requestHeaders = headers();
	const apiKeyHeader = requestHeaders["x-inbound-api-key"];
	const domainHeader = requestHeaders["x-inbound-domain"];

	const apiKey = Array.isArray(apiKeyHeader) ? apiKeyHeader[0] : apiKeyHeader;
	const domain = Array.isArray(domainHeader)
		? domainHeader[0]
		: domainHeader || null;

	if (!apiKey) {
		throw new Error("Missing x-inbound-api-key header");
	}

	const client = new Inbound({ apiKey });

	return { client, domain };
}

export function filterByDomain<T extends { domain?: string }>(
	items: T[],
	domain: string | null,
): T[] {
	if (!domain) return items;
	const lowerDomain = domain.toLowerCase();
	return items.filter((item) => item.domain?.toLowerCase() === lowerDomain);
}

export function validateDomainAccess(
	fromAddress: string,
	allowedDomain: string | null,
): void {
	if (!allowedDomain) return;

	const emailDomain = fromAddress.split("@")[1]?.toLowerCase();
	if (emailDomain !== allowedDomain.toLowerCase()) {
		throw new Error(
			`Domain ${emailDomain} is not allowed. Only ${allowedDomain} is permitted.`,
		);
	}
}
