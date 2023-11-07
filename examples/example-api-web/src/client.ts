import { createQueryService } from "@connectrpc/connect-query";
import { type ConnectTransportOptions, createConnectTransport } from "@connectrpc/connect-web";
import { EnzymeService, withTokenAuth } from "@enzymefinance/api";

const token = import.meta.env.VITE_ENZYME_API_TOKEN as string | undefined;
if (!token) {
  throw new Error("MISSING API TOKEN!");
}

const transport = createConnectTransport(
  withTokenAuth<ConnectTransportOptions>(token, {
    baseUrl: "https://api.enzyme.finance",
  }),
);

export const enzyme = createQueryService({
  service: EnzymeService,
  transport,
});
