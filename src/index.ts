// src/index.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTools } from "./tools";
import { z } from "zod";

async function main() {
  // Create an MCP server
  const server = new McpServer({
    name: "selenium-mcp-server",
    version: "1.0.0"
  });
  
  // Register your Selenium tools
  registerTools(server);
  
  // Start the server
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("Selenium MCP Server started successfully");
}

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
