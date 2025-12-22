import type { XmcpConfig } from "xmcp";

const config: XmcpConfig = {
	http: {
		port: 5454,
		endpoint: "/mcp",
		cors: {
			origin: "*",
			methods: ["GET", "POST"],
			allowedHeaders: [
				"Content-Type",
				"x-inbound-api-key",
				"x-inbound-domain",
				"mcp-session-id",
				"mcp-protocol-version",
			],
			exposedHeaders: ["Content-Type", "mcp-session-id"],
			credentials: false,
			maxAge: 86400,
		},
	},
	stdio: true,
	paths: {
		tools: "src/tools",
		prompts: "src/prompts",
		resources: false,
	},
};

export default config;
