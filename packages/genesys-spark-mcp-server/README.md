# Genesys Spark MCP Server

Genesys Spark MCP Server is a Model Context Protocol (MCP) server that provides comprehensive information about the Genesys Spark Design System components. It offers detailed component documentation, usage guidelines, examples, and code generation capabilities for building applications with Genesys Spark components.

This project is inspired by [react-design-systems-mcp](https://github.com/agentience/react-design-systems-mcp/tree/develop).
`react-design-systems-mcp` has a similar goal, they started by adding MCP tools for AWS Cloudscape Design System components.

## Features

### Component Information & Search
- Search for Spark components with advanced filtering options
- Get detailed information about components including properties, events, and functions
- Access component usage guidelines
- Get component examples with detailed code snippets

### Advanced Functionality
- **Usage Guidelines**: Comprehensive access to component usage guidelines
- **Events & Functions**: Search and explore component events and function APIs
- **Setup Instructions**: Get frontend setup and configuration guidance

## Requirements

- **Node.js**: 22.x or higher
- **npm**: 10.x or higher

## Installation

### For Usage as a Dependency

```bash
# Install from npm
npm install genesys-spark-mcp-server
```

### Global Installation

```bash
# Install globally to use as a CLI tool
npm install -g genesys-spark-mcp-server

# Then you can run it directly
genesys-spark-mcp-server
```

## Kiro Desktop App Configuration

To use Genesys Spark MCP Server with Kiro Desktop app, you can configure it as an MCP server using the npm package. This allows Kiro Desktop App to automatically launch the server when needed.

### Configuration File

Add the following configuration to your Kiro MCP settings file:

**Location:**
- user level - **macOS**: `~/.kiro/settings/mcp.json`

- workspace level - **macOS**: `<repo folder>/.kiro/settings/mcp.json`

**Configuration:**

```json
{
  "mcpServers": {
    "genesys-spark": {
      "command": "npx",
      "args": [
        "genesys-spark-mcp-server@latest"
      ]
    }
  }
}
```

### Command Line Parameters

The server supports the following command line parameters:

- `--transport <type>` or `-t <type>`: Transport type (`stdio` or `sse`). Default: `stdio`
- `--port <number>` or `-p <number>`: Port for SSE transport. Default: `3001`
- `--bind <address>` or `-b <address>`: Bind address for SSE transport. Default: `0.0.0.0`

### Advanced Configuration Examples

#### With Custom Parameters

```json
{
  "mcpServers": {
    "genesys-spark": {
      "command": "npx",
      "args": [
        "genesys-spark-mcp-server@latest",
        "--transport",
        "stdio"
      ]
    }
  }
}
```

#### Using Local Installation

If you have the package installed globally or locally:

```json
{
  "mcpServers": {
    "genesys-spark": {
      "command": "genesys-spark-mcp-server"
    }
  }
}
```

#### Development Configuration

For development with a local build:

```json
{
  "mcpServers": {
    "genesys-spark": {
      "command": "node",
      "args": [
        "/absolute/path/to/genesys-spark-mcp-server/dist/server.js"
      ],
      "cwd": "/path/to/genesys-spark-mcp-server"
    }
  }
}
```

### Verification

After adding the configuration:

1. Restart Kiro desktop app
2. Start a new session
3. The Genesys Spark MCP server should be automatically available
4. You can use tools like `search_components` to verify the connection

## Available Tools and Resources

### MCP Tools

#### Component Information
- `search_components` - Search for components with advanced filtering
- `get_component_details` - Get detailed component information
- `get_component_examples` - Get component examples with optional filtering by example ID

> **Note**: Not all components have events. Components with events include: `gux-accordion-section`, `gux-action-button`, `gux-dropdown`, `gux-modal`, `gux-pagination`, `gux-toggle`, and others. Use `search_components` to find components that emit specific events.

#### Usage Guidelines
- `get_component_usage` - Get usage guidelines for a specific component with optional section filtering

#### Utility Tools
- `get_frontend_setup` - Get setup instructions for frontend setup

### Example Usage

```bash
# Search for button-related components
search_components({"query": "button", "category": "actions"})

# Get detailed information about a specific component
get_component_details({"componentId": "gux-button"})
```
### Component Categories

The Genesys Spark MCP Server provides comprehensive support for all Genesys Spark Design System components, including:

- **Form Components**: Buttons, inputs, dropdowns, checkboxes, radio buttons, file uploads, and more
- **Layout Components**: Cards, containers, modals, side panels, and layout utilities
- **Navigation Components**: Tabs, breadcrumbs, pagination, and navigation menus
- **Data Display**: Tables, lists, badges, tooltips, and data visualization components
- **Feedback Components**: Alerts, loading indicators, progress bars, and status indicators
- **Utility Components**: Icons, dividers, screen readers, and accessibility helpers
