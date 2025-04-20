import * as http from 'http';
import { seleniumService } from './seleniumService';

// Simple MCP server without external dependencies
const server = http.createServer(async (req, res) => {
  // Only accept POST requests
  if (req.method !== 'POST') {
    res.writeHead(405);
    res.end('Method Not Allowed');
    return;
  }

  // Parse JSON body
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const { tool, params } = JSON.parse(body);
      console.log(`Received request for tool: ${tool}`, params);

      // Process tool requests
      let result;
      switch (tool) {
        case 'start_browser':
          result = await seleniumService.startBrowser(params.browser, params.options);
          break;
        case 'navigate':
          result = await seleniumService.navigate(params.url);
          break;
        case 'click_element':
          result = await seleniumService.clickElement(params.by, params.value, params.timeout);
          break;
        case 'send_keys':
          result = await seleniumService.sendKeys(params.by, params.value, params.text, params.timeout);
          break;
        case 'take_screenshot':
          result = await seleniumService.takeScreenshot(params.outputPath);
          break;
        case 'close_session':
          result = await seleniumService.closeBrowser();
          break;
        default:
          res.writeHead(400);
          res.end(JSON.stringify({ error: `Unknown tool: ${tool}` }));
          return;
      }

      // Return success
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ result }));
    } catch (error) {
      console.error('Error processing request:', error);
      res.writeHead(500);
      res.end(JSON.stringify({ error: (error as Error).message }));
    }
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Simple MCP Server running on port ${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await seleniumService.closeBrowser();
  server.close(() => {
    console.log('Server shut down');
    process.exit(0);
  });
}); 