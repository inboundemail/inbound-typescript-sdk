import type { PromptMetadata } from "xmcp";

export const metadata: PromptMetadata = {
	name: "getting-started",
	title: "Get Started with Inbound",
	description:
		"Learn how to use the Inbound Email API for receiving and sending emails programmatically",
};

export default function gettingStarted() {
	return `# Getting Started with Inbound

Inbound is an email API that lets you receive, send, and manage emails programmatically.

## Core Concepts

1. **Domains** - Add and verify your domains to send/receive emails
2. **Endpoints** - Configure where incoming emails are delivered (webhooks, email forwarding)
3. **Emails** - Send emails, view received emails, manage conversations
4. **Threads** - Group related emails into conversations (like Gmail)

## Available Tools

### Domain Management
- \`list_domains\` - View all your domains and their verification status
- \`create_domain\` - Add a new domain (returns DNS records to configure)

### Endpoint Configuration
- \`list_endpoints\` - View webhook and email forwarding endpoints
- \`create_endpoint\` - Create a new endpoint for receiving emails:
  - **webhook**: Receive emails as HTTP POST requests to your URL
  - **email**: Forward emails to another address
  - **email_group**: Forward to multiple addresses

### Email Operations
- \`list_emails\` - Browse sent, received, and scheduled emails
- \`get_email\` - Get full details of a specific email
- \`send_email\` - Send an email (supports scheduling)

### Thread/Conversation View
- \`list_threads\` - View email conversations grouped by thread
- \`get_thread\` - Get all messages in a conversation

## Quick Start Workflows

### Set up email receiving:
1. \`list_domains\` - Check if your domain is verified
2. \`create_endpoint\` with type="webhook" - Set up delivery
3. \`list_emails\` with type="received" - Monitor incoming emails

### Build an inbox:
1. \`list_threads\` - Get conversation list with previews
2. \`get_thread\` - Read full conversation when user selects one
3. \`send_email\` - Reply to customers

### Send a campaign:
1. \`list_domains\` - Verify you have a sending domain
2. \`send_email\` - Send immediately or schedule with \`scheduled_at\`

## Authentication

This MCP server requires the \`x-inbound-api-key\` header with your Inbound API key.

Optionally, set \`x-inbound-domain\` header to restrict all operations to a single domain.

## Learn More

- Documentation: https://docs.inbound.email
- Dashboard: https://inbound.new
`;
}
