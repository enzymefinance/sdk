import { createQueryService } from "@bufbuild/connect-query";
import { ConnectTransportOptions, createConnectTransport } from "@bufbuild/connect-web";
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
