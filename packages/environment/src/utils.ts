import { zeroAddress } from "viem";

import { deployments } from "./deployments/all.js";
import type { Network, NetworkSlug } from "./networks.js";
import { getNetwork, isNetworkIdentifier } from "./networks.js";
import type { Deployment, DeploymentDefinition } from "./releases.js";
import { Kind, isDeployment } from "./releases.js";
import type { Address } from "./types.js";

export function isHexString(value: any, length?: number): boolean {
  if (typeof value !== "string" || !/^0x[0-9A-Fa-f]*$/.test(value)) {
    return false;
  }

  if (length && value.length !== 2 + 2 * length) {
    return false;
  }

  return true;
}

export function isAddress(value: any): value is Address {
  return isHexString(value) && /^0x[0-9a-f]{40}$/.test(value);
}

export function isNonZeroAddress(value: any): value is Address {
  return isHexString(value) && value !== zeroAddress;
}

export function toAddress(value: string): Address {
  const address = value.toLowerCase();

  if (isAddress(address)) {
    return address;
  }

  throw new Error("Invalid address");
}

export function getDeployment<TDeployment extends Deployment>(
  deployment: TDeployment,
): DeploymentDefinition<TDeployment>;
export function getDeployment(network: Network | NetworkSlug): DeploymentDefinition<Deployment>;
export function getDeployment<TDeployment extends Deployment>(
  deployment: TDeployment,
): DeploymentDefinition<TDeployment>;
export function getDeployment(
  deploymentOrNetwork: Deployment | Network | NetworkSlug,
): DeploymentDefinition<Deployment>;

export function getDeployment(deploymentOrNetwork: Deployment | Network | NetworkSlug) {
  if (isDeployment(deploymentOrNetwork)) {
    return deployments[deploymentOrNetwork];
  }

  if (isNetworkIdentifier(deploymentOrNetwork)) {
    const network = getNetwork(deploymentOrNetwork as Network);
    const deployment = Object.values(deployments).find(
      (item) => item.network === network.id && item.kind === Kind.LIVE,
    );

    if (!deployment) {
      throw new Error(`Missing deployment for network ${network.slug}`);
    }

    return deployment;
  }

  throw new Error(`Unknown deployment or network ${deploymentOrNetwork}`);
}
