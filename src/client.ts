import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  // Create an MCP client
  const client = new Client({
    name: "selenium-mcp-client",
    version: "1.0.0"
  });

  try {
    // Connect to the server
    const transport = new StdioClientTransport({
      command: "npx",
      args: ["tsx", "src/index.ts"]
    });
    await client.connect(transport);
    console.log("Connected to Selenium MCP Server");

    // List available tools
    const tools = await client.listTools();
    console.log("Available tools:", tools.tools.map(t => t.name));

    // Start a browser
    const browserResult = await client.callTool({
      name: "start_browser",
      arguments: {
        browser: "chrome",
        options: { headless: true }
      }
    });
    console.log("Start browser result:", browserResult);

    // Navigate to Google
    const navigateResult = await client.callTool({
      name: "navigate",
      arguments: {
        url: "https://www.google.com"
      }
    });
    console.log("Navigate result:", navigateResult);

    // Take a screenshot
    const screenshotResult = await client.callTool({
      name: "take_screenshot",
      arguments: {}
    });
    console.log("Screenshot result:", screenshotResult);

    // Close the browser
    const closeResult = await client.callTool({
      name: "close_session",
      arguments: {}
    });
    console.log("Close browser result:", closeResult);

    console.log("Test completed successfully");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit(0);
  }
}

main(); 