# Inbound TypeScript MCP Server

It is generated with [Stainless](https://www.stainless.com/).

## Installation

### Direct invocation

You can run the MCP Server directly via `npx`:

```sh
export INBOUND_API_KEY="My API Key"
export INBOUND_ENVIRONMENT="production"
npx -y inbnd-mcp@latest
```

### Via MCP Client

There is a partial list of existing clients at [modelcontextprotocol.io](https://modelcontextprotocol.io/clients). If you already
have a client, consult their documentation to install the MCP server.

For clients with a configuration JSON, it might look something like this:

```json
{
  "mcpServers": {
    "inbnd_api": {
      "command": "npx",
      "args": ["-y", "inbnd-mcp", "--client=claude", "--tools=dynamic"],
      "env": {
        "INBOUND_API_KEY": "My API Key",
        "INBOUND_ENVIRONMENT": "production"
      }
    }
  }
}
```

## Exposing endpoints to your MCP Client

There are two ways to expose endpoints as tools in the MCP server:

1. Exposing one tool per endpoint, and filtering as necessary
2. Exposing a set of tools to dynamically discover and invoke endpoints from the API

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

Authorization can be provided via the following headers:
| Header | Equivalent client option | Security scheme |
| ------------------- | ------------------------ | --------------- |
| `x-inbound-api-key` | `apiKey` | ApiKeyAuth |

A configuration JSON for this server might look like this, assuming the server is hosted at `http://localhost:3000`:

```json
{
  "mcpServers": {
    "inbnd_api": {
      "url": "http://localhost:3000",
      "headers": {
        "x-inbound-api-key": "My API Key"
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
import { server, endpoints, init } from "inbnd-mcp/server";

// import a specific tool
import createDomains from "inbnd-mcp/tools/domains/create-domains";

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
init({ server: myServer, endpoints: [createDomains, myCustomEndpoint] });
```

## Available Tools

The following tools are available in this MCP server.

### Resource `domains`:

- `create_domains` (`write`): POST /domains
- `retrieve_domains` (`read`): GET /domains/{id}
- `update_domains` (`write`): PATCH /domains/{id}
- `list_domains` (`read`): GET /domains
- `delete_domains` (`write`): DELETE /domains/{id}
- `list_dns_records_domains` (`read`): GET /domains/{id}/dns-records

### Resource `domains.auth`:

- `create_domains_auth` (`write`): POST /domains/{id}/auth
- `update_domains_auth` (`write`): PATCH /domains/{id}/auth

### Resource `email_addresses`:

- `create_email_addresses` (`write`): POST /email-addresses
- `retrieve_email_addresses` (`read`): GET /email-addresses/{id}
- `update_email_addresses` (`write`): PUT /email-addresses/{id}
- `list_email_addresses` (`read`): GET /email-addresses
- `delete_email_addresses` (`write`): DELETE /email-addresses/{id}

### Resource `emails`:

- `create_emails` (`write`): POST /emails
- `retrieve_emails` (`read`): GET /emails/{id}
- `reply_emails` (`write`): POST /emails/{id}/reply

### Resource `emails.schedule`:

- `create_emails_schedule` (`write`): POST /emails/schedule
- `retrieve_emails_schedule` (`read`): GET /emails/schedule/{id}
- `list_emails_schedule` (`read`): GET /emails/schedule
- `delete_emails_schedule` (`write`): DELETE /emails/schedule/{id}

### Resource `endpoints`:

- `create_endpoints` (`write`): POST /endpoints
- `retrieve_endpoints` (`read`): GET /endpoints/{id}
- `update_endpoints` (`write`): PUT /endpoints/{id}
- `list_endpoints` (`read`): GET /endpoints
- `delete_endpoints` (`write`): DELETE /endpoints/{id}
- `test_endpoints` (`write`): POST /endpoints/{id}/test

### Resource `mail`:

- `create_mail` (`write`): POST /mail
- `retrieve_mail` (`read`): GET /mail/{id}
- `update_mail` (`write`): PATCH /mail/{id}
- `list_mail` (`read`): GET /mail
- `bulk_create_mail` (`write`): POST /mail/bulk
- `retrieve_thread_mail` (`read`): GET /mail/{id}/thread
- `thread_counts_mail` (`write`): POST /mail/thread-counts
