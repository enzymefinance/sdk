import { Server, createServer } from "node:http";
import { createProxyServer } from "http-proxy";
import { Anvil } from "./anvil.js";
import getPort from "get-port";
import { FORK_BLOCK_NUMBER, FORK_URL } from "../constants.js";

export interface AnvilProxyOptions {
  port?: number;
  hostname?: string;
}

export function createAnvilProxy({ port = 8545, hostname = "::" }: AnvilProxyOptions = {}) {
  // rome-ignore lint/suspicious/noAsyncPromiseExecutor: this is fine ...
  return new Promise<Server>(async (resolve, reject) => {
    const proxy = createProxyServer({
      ignorePath: true,
      ws: true,
    });

    const server = createServer(async (req, res) => {
      const id = getIdFromUrl(req.url);
      if (id === undefined) {
        res.writeHead(404).end("Missing worker id in request");
      } else {
        const anvil = await getOrCreateAnvilInstance(id);
        proxy.web(req, res, {
          target: `http://localhost:${anvil.port}`,
        });
      }
    });

    server.on("upgrade", async (req, socket, head) => {
      const id = getIdFromUrl(req.url);
      if (id === undefined) {
        socket.destroy(new Error("Missing worker id in request"));
      } else {
        const anvil = await getOrCreateAnvilInstance(id);
        proxy.ws(req, socket, head, {
          target: `ws://localhost:${anvil.port}`,
        });
      }
    });

    server.on("listening", () => resolve(server));
    server.on("error", (error) => reject(error));

    server.listen(port, hostname);
  });
}

const instances = new Map<number, Promise<Anvil>>();

export async function stopAnvilInstances() {
  const anvils = Array.from(instances.values());
  await Promise.allSettled(anvils.map(async (anvil) => (await anvil).exit()));
}

async function getOrCreateAnvilInstance(id: number) {
  let anvil = instances.get(id);

  if (anvil === undefined) {
    // rome-ignore lint/suspicious/noAsyncPromiseExecutor: we need this to be synchronous
    anvil = new Promise(async (resolve, reject) => {
      try {
        resolve(
          Anvil.start({
            portNumber: await getPort(),
            forkUrl: FORK_URL,
            forkBlockNumber: FORK_BLOCK_NUMBER,
            startUpTimeout: 10000,
          }),
        );
      } catch (error) {
        reject(error);
      }
    });

    instances.set(id, anvil);

    return anvil;
  }

  return anvil;
}

function getIdFromUrl(url?: string) {
  const path = url ? new RegExp("^[0-9]+$").exec(url.slice(1))?.[0] : undefined;
  const id = path ? Number(path) : undefined;

  return id;
}
