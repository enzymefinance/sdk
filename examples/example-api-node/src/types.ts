import type { createGrpcTransport } from "@connectrpc/connect-node";

// TODO: This type should be exported by connect-node.
export type GrpcTransportOptions = Parameters<typeof createGrpcTransport>[0];
