import { createPromiseClient, PromiseClient, Transport, Interceptor } from "@bufbuild/connect";
import { EnzymeService } from "./protobuf.js";

export type EnzymeClient = PromiseClient<typeof EnzymeService>;

export function createClient(transport: Transport): EnzymeClient {
  return createPromiseClient(EnzymeService, transport);
}

export function createTokenAuthInterceptor(token: string): Interceptor {
  return (next) => async (req) => {
    req.header.set("Authorization", `Bearer ${token}`);

    return await next(req);
  };
}

export interface TransportOptions {
  interceptors?: Interceptor[];
}

export function withTokenAuth<TOptions extends TransportOptions>(token: string, options: TOptions): TOptions {
  const auth = createTokenAuthInterceptor(token);
  const interceptors = (options.interceptors ?? []).concat(auth);
  return { ...options, interceptors };
}
