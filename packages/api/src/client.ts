import type { Interceptor, PromiseClient, Transport } from "@bufbuild/connect";
import { createPromiseClient } from "@bufbuild/connect";
import { EnzymeService } from "./protobuf.js";

export type EnzymeClient = PromiseClient<typeof EnzymeService>;

/**
 * Creates a client for the Enzyme service.
 *
 * @param transport The transport to use.
 * @returns The client.
 */
export function createClient(transport: Transport): EnzymeClient {
  return createPromiseClient(EnzymeService, transport);
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
  interceptors?: Interceptor[];
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
