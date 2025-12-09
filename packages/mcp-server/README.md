# Inbound TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Direct invocation

You can run the MCP Server directly via `npx`:

```sh
export INBOUND_API_KEY="My API Key"
npx -y inbound-docs-mcp@latest
```

### Via MCP Client

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "inboundemail_api": {
      "command": "npx",
      "args": ["-y", "inbound-docs-mcp", "--client=claude", "--tools=dynamic"],
      "env": {
        "INBOUND_API_KEY": "My API Key"
      }
    }
  }
}
```

### Cursor

If you use Cursor, you can install the MCP server by using the button below. You will need to set your environment variables
in Cursor's `mcp.json`, which can be found in Cursor Settings > Tools & MCP > New MCP Server.

[![Add to Cursor](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/en-US/install-mcp?name=inbound-docs-mcp&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsImluYm91bmQtZG9jcy1tY3AiXSwiZW52Ijp7IklOQk9VTkRfQVBJX0tFWSI6IlNldCB5b3VyIElOQk9VTkRfQVBJX0tFWSBoZXJlLiJ9fQ)

### VS Code

If you use MCP, you can install the MCP server by clicking the link below. You will need to set your environment variables
in VS Code's `mcp.json`, which can be found via Command Palette > MCP: Open User Configuration.

[Open VS Code](https://vscode.stainless.com/mcp/%7B%22name%22%3A%22inbound-docs-mcp%22%2C%22command%22%3A%22npx%22%2C%22args%22%3A%5B%22-y%22%2C%22inbound-docs-mcp%22%5D%2C%22env%22%3A%7B%22INBOUND_API_KEY%22%3A%22Set%20your%20INBOUND_API_KEY%20here.%22%7D%7D)

### Claude Code

If you use Claude Code, you can install the MCP server by running the command below in your terminal. You will need to set your
environment variables in Claude Code's `.claude.json`, which can be found in your home directory.

```
claude mcp add --transport stdio inboundemail_api --env INBOUND_API_KEY="Your INBOUND_API_KEY here." -- npx -y inbound-docs-mcp
```

## Exposing endpoints to your MCP Client

There are three ways to expose endpoints as tools in the MCP server:

1. Exposing one tool per endpoint, and filtering as necessary
2. Exposing a set of tools to dynamically discover and invoke endpoints from the API
3. Exposing a docs search tool and a code execution tool, allowing the client to write code to be executed against the TypeScript client

### Filtering endpoints and tools

You can run the package on the command line to discover and filter the set of tools that are exposed by the
MCP Server. This can be helpful for large APIs where including all endpoints at once is too much for your AI's
context window.

You can filter by multiple aspects:

- `--tool` includes a specific tool by name
- `--resource` includes all tools under a specific resource, and can have wildcards, e.g. `my.resource*`
- `--operation` includes just read (get/list) or just write operations

### Dynamic tools

If you specify `--tools=dynamic` to the MCP server, instead of exposing one tool per endpoint in the API, it will
expose the following tools:

1. `list_api_endpoints` - Discovers available endpoints, with optional filtering by search query
2. `get_api_endpoint_schema` - Gets detailed schema information for a specific endpoint
3. `invoke_api_endpoint` - Executes any endpoint with the appropriate parameters

This allows you to have the full set of API endpoints available to your MCP Client, while not requiring that all
of their schemas be loaded into context at once. Instead, the LLM will automatically use these tools together to
search for, look up, and invoke endpoints dynamically. However, due to the indirect nature of the schemas, it
can struggle to provide the correct properties a bit more than when tools are imported explicitly. Therefore,
you can opt-in to explicit tools, the dynamic tools, or both.

See more information with `--help`.

All of these command-line options can be repeated, combined together, and have corresponding exclusion versions (e.g. `--no-tool`).

Use `--list` to see the list of available tools, or see below.

### Code execution

If you specify `--tools=code` to the MCP server, it will expose just two tools:

- `search_docs` - Searches the API documentation and returns a list of markdown results
- `execute` - Runs code against the TypeScript client

This allows the LLM to implement more complex logic by chaining together many API calls without loading
intermediary results into its context window.

The code execution itself happens in a Deno sandbox that has network access only to the base URL for the API.

### Specifying the MCP Client

Different clients have varying abilities to handle arbitrary tools and schemas.

You can specify the client you are using with the `--client` argument, and the MCP server will automatically
serve tools and schemas that are more compatible with that client.

- `--client=<type>`: Set all capabilities based on a known MCP client

  - Valid values: `openai-agents`, `claude`, `claude-code`, `cursor`
  - Example: `--client=cursor`

Additionally, if you have a client not on the above list, or the client has gotten better
over time, you can manually enable or disable certain capabilities:

- `--capability=<name>`: Specify individual client capabilities
  - Available capabilities:
    - `top-level-unions`: Enable support for top-level unions in tool schemas
    - `valid-json`: Enable JSON string parsing for arguments
    - `refs`: Enable support for $ref pointers in schemas
    - `unions`: Enable support for union types (anyOf) in schemas
    - `formats`: Enable support for format validations in schemas (e.g. date-time, email)
    - `tool-name-length=N`: Set maximum tool name length to N characters
  - Example: `--capability=top-level-unions --capability=tool-name-length=40`
  - Example: `--capability=top-level-unions,tool-name-length=40`

### Examples

1. Filter for read operations on cards:

```bash
--resource=cards --operation=read
```

2. Exclude specific tools while including others:

```bash
--resource=cards --no-tool=create_cards
```

3. Configure for Cursor client with custom max tool name length:

```bash
--client=cursor --capability=tool-name-length=40
```

4. Complex filtering with multiple criteria:

```bash
--resource=cards,accounts --operation=read --tag=kyc --no-tool=create_cards
```

## Running remotely

Launching the client with `--transport=http` launches the server as a remote server using Streamable HTTP transport. The `--port` setting can choose the port it will run on, and the `--socket` setting allows it to run on a Unix socket.

Authorization can be provided via the `Authorization` header using the Bearer scheme.

Additionally, authorization can be provided via the following headers:
| Header | Equivalent client option | Security scheme |
| ------------------- | ------------------------ | --------------- |
| `x-inbound-api-key` | `apiKey` | bearerAuth |

A configuration JSON for this server might look like this, assuming the server is hosted at `http://localhost:3000`:

```json
{
  "mcpServers": {
    "inboundemail_api": {
      "url": "http://localhost:3000",
      "headers": {
        "Authorization": "Bearer <auth value>"
      }
    }
  }
}
```

The command-line arguments for filtering tools and specifying clients can also be used as query parameters in the URL.
For example, to exclude specific tools while including others, use the URL:

```
http://localhost:3000?resource=cards&resource=accounts&no_tool=create_cards
```

Or, to configure for the Cursor client, with a custom max tool name length, use the URL:

```
http://localhost:3000?client=cursor&capability=tool-name-length%3D40
```

## Importing the tools and server individually

```js
// Import the server, generated endpoints, or the init function
import { server, endpoints, init } from "inbound-docs-mcp/server";

// import a specific tool
import retrieveAttachments from "inbound-docs-mcp/tools/attachments/retrieve-attachments";

// initialize the server and all endpoints
init({ server, endpoints });

// manually start server
const transport = new StdioServerTransport();
await server.connect(transport);

// or initialize your own server with specific tools
const myServer = new McpServer(...);

// define your own endpoint
const myCustomEndpoint = {
  tool: {
    name: 'my_custom_tool',
    description: 'My custom tool',
    inputSchema: zodToJsonSchema(z.object({ a_property: z.string() })),
  },
  handler: async (client: client, args: any) => {
    return { myResponse: 'Hello world!' };
  })
};

// initialize the server with your custom endpoints
init({ server: myServer, endpoints: [retrieveAttachments, myCustomEndpoint] });
```

## Available Tools

The following tools are available in this MCP server.

### Resource `attachments`:

- `retrieve_attachments` (`read`): Download an email attachment by email ID and filename. Returns the binary file content with appropriate Content-Type and Content-Disposition headers.

### Resource `domains`:

- `create_domains` (`write`): Add a new domain for email receiving. Automatically initiates SES verification and returns required DNS records. Subdomains inherit verification from their verified parent domain.
- `retrieve_domains` (`read`): Get detailed information about a specific domain including DNS records. Use `?check=true` for live DNS and SES verification.
- `update_domains` (`write`): Update catch-all email settings for a domain. Catch-all receives emails sent to any address on your domain. Domain must be verified first.
- `list_domains` (`read`): Get paginated list of domains for authenticated user with optional filtering.
- `delete_domains` (`write`): Delete a domain and all associated resources including email addresses, DNS records, and SES configurations. Root domains with subdomains must have subdomains deleted first.

### Resource `endpoints`:

- `create_endpoints` (`write`): Create a new endpoint (webhook, email, or email_group) for the authenticated user
- `retrieve_endpoints` (`read`): Get detailed information about a specific endpoint including delivery stats, recent deliveries, associated emails, and catch-all domains
- `update_endpoints` (`write`): Update an existing endpoint's name, description, active status, config, or webhook format
- `list_endpoints` (`read`): Get paginated list of endpoints for authenticated user with optional filtering by type, active status, sort order, and search by name
- `delete_endpoints` (`write`): Delete an endpoint and clean up associated resources (email addresses become store-only, domains lose catch-all config, group entries and delivery history are deleted)
- `test_endpoints` (`write`): Test an endpoint by sending a test payload. For webhooks, supports inbound, discord, and slack formats. For email endpoints, simulates the forwarding process.

### Resource `email_addresses`:

- `create_email_addresses` (`write`): Create a new email address for an authenticated user's domain. Automatically configures AWS SES receipt rules.
- `retrieve_email_addresses` (`read`): Get a specific email address by ID with detailed information including routing configuration
- `update_email_addresses` (`write`): Update an email address's routing (endpoint/webhook) or active status. Cannot have both endpoint and webhook.
- `list_email_addresses` (`read`): Get paginated list of email addresses for authenticated user with optional filtering by domain, active status, and receipt rule configuration
- `delete_email_addresses` (`write`): Delete an email address and clean up associated SES receipt rules. Returns cleanup status.

### Resource `emails`:

- `retrieve_emails` (`read`): Retrieve a single email by ID. Works for sent, received, and scheduled emails.
- `list_emails` (`read`): List all email activity (sent, received, and scheduled) with comprehensive filtering options.

  **Type Filtering:**

  - `all` - Returns sent, received, and scheduled emails combined (default)
  - `sent` - Only outbound emails you've sent
  - `received` - Only inbound emails you've received
  - `scheduled` - Only emails scheduled for future delivery

  **Status Filtering:**

  - `delivered` - Successfully delivered emails
  - `pending` - Emails currently being processed
  - `failed` - Emails that failed to deliver
  - `bounced` - Emails that bounced (sent only)
  - `scheduled` - Emails scheduled for future delivery
  - `cancelled` - Cancelled scheduled emails
  - `unread` - Unread received emails
  - `read` - Read received emails
  - `archived` - Archived received emails

  **Time Range Filtering:**

  - `1h` - Last hour
  - `24h` - Last 24 hours
  - `7d` - Last 7 days
  - `30d` - Last 30 days (default)
  - `90d` - Last 90 days
  - `all` - All time

  **Address Filtering:**
  Supports filtering by domain ID, domain name, address ID, or raw email address (e.g., 'user@example.com').

- `delete_emails` (`write`): Cancel a scheduled email by ID. Only works for emails that haven't been sent yet.
- `reply_emails` (`write`): Reply to an email or thread. Accepts either an email ID or thread ID (replies to latest message in thread). Supports reply all functionality.
- `retry_emails` (`write`): Retry delivery of a received email. Can retry to a specific endpoint, retry a specific failed delivery, or retry to all configured endpoints.
- `send_emails` (`write`): Send an email immediately or schedule it for later using the scheduled_at parameter. Supports HTML/text content, attachments, and custom headers.

### Resource `mail`:

- `retrieve_mail` (`read`): Retrieve a complete email thread (conversation) with all messages.

  **What You Get:**

  - Thread metadata (subject, participants, timestamps)
  - All messages in the thread (both inbound and outbound)
  - Messages sorted chronologically by thread position

  **Message Types:**

  - `inbound` - Emails you received
  - `outbound` - Emails you sent (includes delivery status)

  **Message Content:**
  Each message includes:

  - Full body content (text and HTML)
  - Sender and recipient information
  - Attachments metadata
  - Read status and timestamps
  - Threading headers (In-Reply-To, References)

  **Typical Workflow:**

  1. List threads using `GET /mail/threads`
  2. User clicks a thread
  3. Fetch full thread using this endpoint
  4. Display conversation view with all messages

- `list_mail` (`read`): List email threads (conversations) for your inbox with cursor-based pagination. This is the primary endpoint for building an inbox UI.

  **What is a Thread?**
  A thread groups related emails together based on the In-Reply-To and References headers, similar to how Gmail groups conversations. Each thread contains both inbound (received) and outbound (sent) messages.

  **Filtering:**

  - `domain` - Filter by domain ID or name (e.g., 'example.com'). Returns threads where any participant matches the domain.
  - `address` - Filter by email address (e.g., 'user@example.com'). Returns threads where the address is a participant.
  - `search` - Search in subject lines and participant emails.
  - `unread` - Set to 'true' to only return threads with unread messages.

  **Pagination:**
  Uses cursor-based pagination for efficient infinite scroll. Pass `pagination.next_cursor` from the response as the `cursor` parameter to get the next page.

  **Response:**
  Each thread includes:

  - Thread metadata (subject, participants, message count)
  - `latest_message` - Preview of the most recent message (inbound or outbound)
  - `has_unread` - Whether there are unread inbound messages
  - `unread_count` - Number of unread messages

  **Use with /mail/threads/:id:**
  Use this endpoint to list threads, then use `GET /mail/threads/:id` to fetch all messages in a specific thread.
