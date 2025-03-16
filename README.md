# MCP server proxy

Use `proxyMessage` to pass a message to an existing MCP server:

```typescript
import { proxyMessage } from '@contextdepot/mcp-proxy/dist/index.js'

// create server and configure handlers
const server = new Server(..);
..

export default class extends WorkerEntrypoint {
    // send message to the server
    async message(requestMessage): Promise<void> {
        return proxyMessage(server, requestMessage)
    }
};

```
