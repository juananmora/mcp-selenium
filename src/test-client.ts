import * as http from 'http';

// Función para hacer solicitudes al servidor MCP
async function callMcpTool(tool: string, params: any = {}): Promise<any> {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ tool, params });
    
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    
    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP Error: ${res.statusCode} - ${responseData}`));
          return;
        }
        
        try {
          const parsedData = JSON.parse(responseData);
          resolve(parsedData);
        } catch (error) {
          reject(new Error(`Failed to parse response: ${error}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.write(data);
    req.end();
  });
}

// Ejemplo de uso
async function runTest() {
  try {
    console.log('Starting browser...');
    await callMcpTool('start_browser', { 
      browser: 'chrome', 
      options: { headless: true } 
    });
    
    console.log('Navigating to Google...');
    await callMcpTool('navigate', { url: 'https://www.google.com' });
    
    console.log('Taking screenshot...');
    const screenshotResult = await callMcpTool('take_screenshot');
    
    console.log('Screenshot data length:', screenshotResult.result.length);
    
    console.log('Closing browser...');
    await callMcpTool('close_session');
    
    console.log('Test completed successfully');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Ejecutar la prueba
runTest(); 