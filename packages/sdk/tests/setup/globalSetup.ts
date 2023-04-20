import { Server, createServer } from "node:http";
import { Writable } from 'node:stream';
import { Anvil } from "./anvil.js";
import getPort from 'get-port';
import { FORK_BLOCK_NUMBER, FORK_URL } from "../constants.js";

// NOTE: This is required to make typescript happy as long as @types/node doesn't include it. 
declare var fetch: typeof import('undici').fetch;

const instances = new Map<number, Promise<Anvil>>();

async function getOrCreateAnvil(id: number) {
  let anvil = instances.get(id);

  if (anvil === undefined) {
    anvil = new Promise(async (resolve, reject) => {
      try {
        resolve(Anvil.start({
          portNumber: await getPort(),
          forkUrl: FORK_URL,
          forkBlockNumber: FORK_BLOCK_NUMBER,
          startUpTimeout: 10000,
        }));
      } catch (error) {
        reject(error);
      }
    });

    instances.set(id, anvil);

    return anvil;
  }

  return anvil;
}

export default async function () {
  const server = await new Promise<Server>((resolve, reject) => {
    const server = createServer(async (req, res) => {
      try {
        const path = req.url ? new RegExp('^[0-9]+$').exec(req.url.slice(1))?.[0] : undefined;
        const id = path ? Number(path) : undefined;

        if (id === undefined) {
          res.writeHead(404);
          res.end();
        } else {
          const anvil = await getOrCreateAnvil(id);
          const response = await fetch(`http://127.0.0.1:${anvil.port}`, {
            method: "POST",
            duplex: 'half',
            body: req,
            headers: (Object.entries(req.headers) as [string, string][]).filter(([key]) => {
              return !forbiddenHeaderNames.includes(key);
            }),
          });   

          res.writeHead(response.status, response.statusText, Object.fromEntries(response.headers.entries()));

          if (response.body !== null) {
            response.body.pipeTo(Writable.toWeb(res));
          } else {
            res.end();
          }
        }
      } catch (error) {
        res.writeHead(500);
        res.end();
      }
    });

    server.on("error", () => {
      reject(new Error("Failed to start anvil pool manager"));
    });

    server.on("listening", () => {
      resolve(server);
    });

    server.listen("8545");
  });

  return async () => {
    // Clean up all anvil instances and the anvil pool manager itself.
    const anvils = Array.from(instances.values());
    await Promise.allSettled([
      ...anvils.map(async (anvil) => (await anvil).exit()),
      new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      }),
    ])
  };
}

// Undici doesn't allow these headers: https://github.com/nodejs/undici/blob/9041e9fed85a69426242dc4ed7aaa7dea4b289d2/lib/core/request.js#L292
const forbiddenHeaderNames = [
  'accept-charset',
  'accept-encoding',
  'access-control-request-headers',
  'access-control-request-method',
  'connection',
  'content-length',
  'cookie',
  'cookie2',
  'date',
  'dnt',
  'expect',
  'host',
  'keep-alive',
  'origin',
  'referer',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
  'via'
]
