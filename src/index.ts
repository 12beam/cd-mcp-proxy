import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";

// proxy message to a given MCP server
export async function proxyMessage(server, requestMessage): Promise<void> {
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
    let responseMessage;
    const finished = new Promise((resolve) => {
        clientTransport.onmessage = (message) => {
            responseMessage = message;
            resolve(null);
        };
    });

    // server created locally
    await server.connect(serverTransport);
    await clientTransport.send(requestMessage);
    await finished;

    return responseMessage
}

export function validateHeaders(headers, requiredHeaders: Map<string, string>) {
    const missingHeaders = [];
    for (let entry in requiredHeaders) {
        if (!(headers.get(entry))) {
            missingHeaders.push({
                header: entry,
                description: requiredHeaders[entry]
            });
        }
    };

    return missingHeaders;
}
