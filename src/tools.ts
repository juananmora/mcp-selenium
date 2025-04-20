// src/tools.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { seleniumService } from "./seleniumService";
import { z } from "zod";

// Definir interfaces para los parámetros
interface BrowserParams {
  browser: string;
  options?: {
    headless?: boolean;
    arguments?: string[];
  };
}

interface NavigateParams {
  url: string;
}

interface ElementParams {
  by: string;
  value: string;
  timeout?: number;
}

interface SendKeysParams extends ElementParams {
  text: string;
}

interface ScreenshotParams {
  outputPath?: string;
}

export function registerTools(server: McpServer) {
  // Tool for starting a browser session
  server.tool(
    "start_browser",
    "Launches a browser session",
    {
      browser: z.string().describe("Browser to launch (chrome, firefox)"),
      options: z.object({
        headless: z.boolean().optional().describe("Run browser in headless mode"),
        arguments: z.array(z.string()).optional().describe("Additional browser arguments")
      }).optional().describe("Browser configuration options")
    },
    async ({ browser, options }: BrowserParams) => {
      return {
        content: [{ 
          type: "text", 
          text: await seleniumService.startBrowser(browser, options) ? "Browser started successfully" : "Failed to start browser" 
        }]
      };
    }
  );

  // Tool for navigating to a URL
  server.tool(
    "navigate",
    "Navigates to a URL",
    {
      url: z.string().url().describe("URL to navigate to")
    },
    async ({ url }: NavigateParams) => {
      return {
        content: [{ 
          type: "text", 
          text: await seleniumService.navigate(url) ? "Navigation successful" : "Navigation failed" 
        }]
      };
    }
  );

  // Tool for clicking an element
  server.tool(
    "click_element",
    "Clicks an element",
    {
      by: z.enum(["id", "css", "xpath", "name", "tag", "class"]).describe("Locator strategy"),
      value: z.string().describe("Value for the locator strategy"),
      timeout: z.number().optional().describe("Maximum time to wait for element in milliseconds")
    },
    async ({ by, value, timeout }: ElementParams) => {
      return {
        content: [{ 
          type: "text", 
          text: await seleniumService.clickElement(by, value, timeout) ? "Click successful" : "Click failed" 
        }]
      };
    }
  );

  // Tool for sending keys to an element
  server.tool(
    "send_keys",
    "Sends keys to an element (typing)",
    {
      by: z.enum(["id", "css", "xpath", "name", "tag", "class"]).describe("Locator strategy"),
      value: z.string().describe("Value for the locator strategy"),
      text: z.string().describe("Text to enter into the element"),
      timeout: z.number().optional().describe("Maximum time to wait for element in milliseconds")
    },
    async ({ by, value, text, timeout }: SendKeysParams) => {
      return {
        content: [{ 
          type: "text", 
          text: await seleniumService.sendKeys(by, value, text, timeout) ? "Text entered successfully" : "Failed to enter text" 
        }]
      };
    }
  );

  // Tool for taking screenshots
  server.tool(
    "take_screenshot",
    "Captures a screenshot of the current page",
    {
      outputPath: z.string().optional().describe("Path where to save the screenshot. If not provided, returns base64 data.")
    },
    async ({ outputPath }: ScreenshotParams) => {
      const result = await seleniumService.takeScreenshot(outputPath);
      if (typeof result === 'string') {
        return {
          content: [{ 
            type: "text", 
            text: "Screenshot captured successfully (base64 data)" 
          }]
        };
      } else {
        return {
          content: [{ 
            type: "text", 
            text: result ? "Screenshot saved successfully" : "Failed to capture screenshot" 
          }]
        };
      }
    }
  );

  // Tool for closing the browser session
  server.tool(
    "close_session",
    "Closes the current browser session and cleans up resources",
    {},
    async () => {
      return {
        content: [{ 
          type: "text", 
          text: await seleniumService.closeBrowser() ? "Browser closed successfully" : "No browser session to close" 
        }]
      };
    }
  );
}
