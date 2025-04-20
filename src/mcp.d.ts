declare module '@modelcontextprotocol/sdk/server/index.js' {
  export class Server {
    constructor(options?: any);
    
    addTool(tool: {
      name: string;
      description: string;
      parameters: any;
      handler: Function;
    }): void;
    
    start(): Promise<void>;
  }
} 