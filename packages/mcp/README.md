# @inbound/mcp

MCP (Model Context Protocol) server for the [Inbound Email API](https://inbound.new). This allows AI assistants like Claude to interact with your Inbound account to manage domains, endpoints, and emails.

## Installation

```bash
npm install @inbound/mcp
# or
pnpm add @inbound/mcp
# or
bun add @inbound/mcp
```

## Configuration

### Claude Desktop (STDIO)

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "inbound": {
      "command": "npx",
      "args": ["-y", "@inbound/mcp"],
      "env": {
        "INBOUND_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Cursor / Other MCP Clients (HTTP)

Start the server:

```bash
INBOUND_API_KEY=your-api-key npx @inbound/mcp start:http
```

Then configure your client:

```json
{
  "mcpServers": {
    "inbound": {
      "url": "http://localhost:3002/mcp",
      "headers": {
        "x-inbound-api-key": "your-api-key"
      }
    }
  }
}
```

## Authentication

The MCP server authenticates using your Inbound API key. You can provide it via:

1. **Environment variable**: `INBOUND_API_KEY`
2. **HTTP header**: `x-inbound-api-key` (for HTTP transport)

### Domain Restriction (Optional)

To restrict all operations to a single domain, set the `x-inbound-domain` header (HTTP) or `INBOUND_DOMAIN` environment variable (STDIO):

```json
{
  "mcpServers": {
    "inbound": {
      "url": "http://localhost:3002/mcp",
      "headers": {
        "x-inbound-api-key": "your-api-key",
        "x-inbound-domain": "example.com"
      }
    }
  }
}
```

## Available Tools

### Domains
- `list_domains` - List all domains in your account
- `create_domain` - Add a new domain (returns DNS records for verification)

### Endpoints
- `list_endpoints` - List webhook and email forwarding endpoints
- `create_endpoint` - Create a webhook, email forward, or email group endpoint

### Emails
- `list_emails` - List sent, received, and scheduled emails
- `get_email` - Get detailed information about a specific email
- `send_email` - Send or schedule an email

### Threads
- `list_threads` - List email conversations
- `get_thread` - Get all messages in a thread

## Available Prompts

- `getting-started` - Learn how to use Inbound Email API

## Development

```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm dev

# Build for production
pnpm build
```

## License

Apache-2.0
