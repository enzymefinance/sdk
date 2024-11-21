import type { Client, Interceptor, Transport } from "@connectrpc/connect";
import { createClient as createClientBase } from "@connectrpc/connect";
import { EnzymeService } from "./protobuf.js";

export type EnzymeClient = Client<typeof EnzymeService>;

/**
 * Creates a client for the Enzyme service.
 *
 * @param transport The transport to use.
 * @returns The client.
 */
export function createClient(transport: Transport): EnzymeClient {
  return createClientBase(EnzymeService, transport);
}

/**
 * Creates a token auth interceptor.
 *
 * @param token The token to use for authentication.
 * @returns The interceptor.
 */
export function createTokenAuthInterceptor(token: string): Interceptor {
  return (next) => async (req) => {
    req.header.set("Authorization", `Bearer ${token}`);

    return await next(req);
  };
}

export interface TransportOptions {
  interceptors?: Array<Interceptor>;
}

/**
 * Decorates transport options with a token auth interceptor.
 *
 * @param token The token to use for authentication.
 * @param options The transport options to decorate.
 * @returns The decorated transport options.
 */
export function withTokenAuth<TOptions extends TransportOptions>(token: string, options: TOptions): TOptions {
  const auth = createTokenAuthInterceptor(token);
  const interceptors = (options.interceptors ?? []).concat(auth);
  return { ...options, interceptors };
}
