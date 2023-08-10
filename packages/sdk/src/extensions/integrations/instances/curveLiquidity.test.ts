import { CURVE_3CRV_POOL, CURVE_FRAX_USDC_GAUGE, CURVE_FRAX_USDC_POOL } from "../../../../tests/constants.js";
import { toWei } from "../../../utils/conversion.js";
import {
  RedeemType,
  decodeCurveLiquidityClaimRewardsArgs,
  decodeCurveLiquidityLendAndStakeArgs,
  decodeCurveLiquidityLendArgs,
  decodeCurveLiquidityRedeemArgs,
  decodeCurveLiquidityStakeArgs,
  decodeCurveLiquidityUnstakeAndRedeemArgs,
  decodeCurveLiquidityUnstakeArgs,
  encodeCurveLiquidityClaimRewardsArgs,
  encodeCurveLiquidityLendAndStakeArgs,
  encodeCurveLiquidityLendArgs,
  encodeCurveLiquidityRedeemArgs,
  encodeCurveLiquidityStakeArgs,
  encodeCurveLiquidityUnstakeAndRedeemArgs,
  encodeCurveLiquidityUnstakeArgs,
} from "./curveLiquidity.js";
import { expect, test } from "vitest";

test("decodeCurveLiquidityLendArgs should be equal to encoded data with encodeCurveLiquidityLendArgs", () => {
  const params = {
    pool: CURVE_3CRV_POOL,
    orderedOutgoingAssetAmounts: [toWei(100), toWei(150)],
    minIncomingLpTokenAmount: toWei(50),
    useUnderlyings: true,
  } as const;

  const encoded = encodeCurveLiquidityLendArgs({
    ...params,
    orderedOutgoingAssetAmounts: [...params.orderedOutgoingAssetAmounts],
  });
  const decoded = decodeCurveLiquidityLendArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeCurveLiquidityLendArgs should encode correctly", () => {
  expect(
    encodeCurveLiquidityLendArgs({
      pool: CURVE_3CRV_POOL,
      orderedOutgoingAssetAmounts: [toWei(100), toWei(150)],
      minIncomingLpTokenAmount: toWei(50),
      useUnderlyings: true,
    }),
  ).toMatchInlineSnapshot(
    '"0x000000000000000000000000bebc44782c7db0a1a60cb6fe97d0b483032ff1c70000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000002b5e3af16b1880000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000821ab0d4414980000"',
  );
});

test("decodeCurveLiquidityLendArgs should decode correctly", () => {
  expect(
    decodeCurveLiquidityLendArgs(
      "0x000000000000000000000000bebc44782c7db0a1a60cb6fe97d0b483032ff1c70000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000002b5e3af16b1880000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000821ab0d4414980000",
    ),
  ).toEqual({
    pool: CURVE_3CRV_POOL,
    orderedOutgoingAssetAmounts: [toWei(100), toWei(150)],
    minIncomingLpTokenAmount: toWei(50),
    useUnderlyings: true,
  });
});

test("decodeCurveLiquidityRedeemArgs should be equal to encoded data with encodeCurveLiquidityRedeemArgs", () => {
  const params = {
    pool: CURVE_3CRV_POOL,
    outgoingLpTokenAmount: toWei(100),
    useUnderlyings: false,
    redeemType: RedeemType.Standard,
    incomingAssetsData: "0x1234",
  } as const;

  const encoded = encodeCurveLiquidityRedeemArgs(params);
  const decoded = decodeCurveLiquidityRedeemArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeCurveLiquidityRedeemArgs should encode correctly", () => {
  expect(
    encodeCurveLiquidityRedeemArgs({
      pool: CURVE_3CRV_POOL,
      outgoingLpTokenAmount: toWei(100),
      useUnderlyings: false,
      redeemType: RedeemType.Standard,
      incomingAssetsData: "0x1234",
    }),
  ).toMatchInlineSnapshot(
    '"0x000000000000000000000000bebc44782c7db0a1a60cb6fe97d0b483032ff1c70000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000021234000000000000000000000000000000000000000000000000000000000000"',
  );
});

test("decodeCurveLiquidityRedeemArgs should decode correctly", () => {
  expect(
    decodeCurveLiquidityRedeemArgs(
      "0x000000000000000000000000bebc44782c7db0a1a60cb6fe97d0b483032ff1c70000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000021234000000000000000000000000000000000000000000000000000000000000",
    ),
  ).toEqual({
    pool: CURVE_3CRV_POOL,
    outgoingLpTokenAmount: toWei(100),
    useUnderlyings: false,
    redeemType: RedeemType.Standard,
    incomingAssetsData: "0x1234",
  });
});

test("decodeCurveLiquidityLendAndStakeArgs should be equal to encoded data with encodeCurveLiquidityLendAndStakeArgs", () => {
  const params = {
    pool: CURVE_FRAX_USDC_POOL,
    orderedOutgoingAssetAmounts: [toWei(100), toWei(150)],
    incomingStakingToken: CURVE_FRAX_USDC_GAUGE,
    minIncomingStakingTokenAmount: toWei(50),
    useUnderlyings: true,
  } as const;

  const encoded = encodeCurveLiquidityLendAndStakeArgs({
    ...params,
    orderedOutgoingAssetAmounts: [...params.orderedOutgoingAssetAmounts],
  });
  const decoded = decodeCurveLiquidityLendAndStakeArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeCurveLiquidityLendAndStakeArgs should encode correctly", () => {
  expect(
    encodeCurveLiquidityLendAndStakeArgs({
      pool: CURVE_FRAX_USDC_POOL,
      orderedOutgoingAssetAmounts: [toWei(100), toWei(150)],
      incomingStakingToken: CURVE_FRAX_USDC_GAUGE,
      minIncomingStakingTokenAmount: toWei(50),
      useUnderlyings: true,
    }),
  ).toMatchInlineSnapshot(
    '"0x000000000000000000000000dcef968d416a41cdac0ed8702fac8128a64241a200000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000cfc25170633581bf896cb6cdee170e3e3aa59503000000000000000000000000000000000000000000000002b5e3af16b1880000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000821ab0d4414980000"',
  );
});

test("decodeCurveLiquidityLendAndStakeArgs should decode correctly", () => {
  expect(
    decodeCurveLiquidityLendAndStakeArgs(
      "0x000000000000000000000000dcef968d416a41cdac0ed8702fac8128a64241a200000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000cfc25170633581bf896cb6cdee170e3e3aa59503000000000000000000000000000000000000000000000002b5e3af16b1880000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000821ab0d4414980000",
    ),
  ).toEqual({
    pool: CURVE_FRAX_USDC_POOL,
    orderedOutgoingAssetAmounts: [toWei(100), toWei(150)],
    incomingStakingToken: CURVE_FRAX_USDC_GAUGE,
    minIncomingStakingTokenAmount: toWei(50),
    useUnderlyings: true,
  });
});

test("decodeCurveLiquidityUnstakeAndRedeemArgs should be equal to encoded data with encodeCurveLiquidityUnstakeAndRedeemArgs", () => {
  const params = {
    pool: CURVE_FRAX_USDC_POOL,
    outgoingStakingToken: CURVE_FRAX_USDC_GAUGE,
    outgoingStakingTokenAmount: toWei(100),
    useUnderlyings: false,
    redeemType: RedeemType.Standard,
    incomingAssetsData: "0x1234",
  } as const;

  const encoded = encodeCurveLiquidityUnstakeAndRedeemArgs(params);
  const decoded = decodeCurveLiquidityUnstakeAndRedeemArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeCurveLiquidityUnstakeAndRedeemArgs should encode correctly", () => {
  expect(
    encodeCurveLiquidityUnstakeAndRedeemArgs({
      pool: CURVE_FRAX_USDC_POOL,
      outgoingStakingToken: CURVE_FRAX_USDC_GAUGE,
      outgoingStakingTokenAmount: toWei(100),
      useUnderlyings: false,
      redeemType: RedeemType.Standard,
      incomingAssetsData: "0x1234",
    }),
  ).toMatchInlineSnapshot(
    '"0x000000000000000000000000dcef968d416a41cdac0ed8702fac8128a64241a2000000000000000000000000cfc25170633581bf896cb6cdee170e3e3aa595030000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000021234000000000000000000000000000000000000000000000000000000000000"',
  );
});

test("decodeCurveLiquidityUnstakeAndRedeemArgs should decode correctly", () => {
  expect(
    decodeCurveLiquidityUnstakeAndRedeemArgs(
      "0x000000000000000000000000dcef968d416a41cdac0ed8702fac8128a64241a2000000000000000000000000cfc25170633581bf896cb6cdee170e3e3aa595030000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000021234000000000000000000000000000000000000000000000000000000000000",
    ),
  ).toEqual({
    pool: CURVE_FRAX_USDC_POOL,
    outgoingStakingToken: CURVE_FRAX_USDC_GAUGE,
    outgoingStakingTokenAmount: toWei(100),
    useUnderlyings: false,
    redeemType: RedeemType.Standard,
    incomingAssetsData: "0x1234",
  });
});

test("decodeCurveLiquidityUnstakeArgs should be equal to encoded data with encodeCurveLiquidityUnstakeArgs", () => {
  const params = {
    pool: CURVE_FRAX_USDC_POOL,
    outgoingStakingToken: CURVE_FRAX_USDC_GAUGE,
    amount: toWei(100),
  } as const;

  const encoded = encodeCurveLiquidityUnstakeArgs(params);
  const decoded = decodeCurveLiquidityUnstakeArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeCurveLiquidityUnstakeArgs should encode correctly", () => {
  expect(
    encodeCurveLiquidityUnstakeArgs({
      pool: CURVE_FRAX_USDC_POOL,
      outgoingStakingToken: CURVE_FRAX_USDC_GAUGE,
      amount: toWei(100),
    }),
  ).toMatchInlineSnapshot(
    '"0x000000000000000000000000dcef968d416a41cdac0ed8702fac8128a64241a2000000000000000000000000cfc25170633581bf896cb6cdee170e3e3aa595030000000000000000000000000000000000000000000000056bc75e2d63100000"',
  );
});

test("decodeCurveLiquidityUnstakeArgs should decode correctly", () => {
  expect(
    decodeCurveLiquidityUnstakeArgs(
      "0x000000000000000000000000dcef968d416a41cdac0ed8702fac8128a64241a2000000000000000000000000cfc25170633581bf896cb6cdee170e3e3aa595030000000000000000000000000000000000000000000000056bc75e2d63100000",
    ),
  ).toEqual({
    pool: CURVE_FRAX_USDC_POOL,
    outgoingStakingToken: CURVE_FRAX_USDC_GAUGE,
    amount: toWei(100),
  });
});

test("decodeCurveLiquidityStakeArgs should be equal to encoded data with encodeCurveLiquidityStakeArgs", () => {
  const params = {
    pool: CURVE_FRAX_USDC_POOL,
    incomingStakingToken: CURVE_FRAX_USDC_GAUGE,
    amount: toWei(100),
  } as const;

  const encoded = encodeCurveLiquidityStakeArgs(params);
  const decoded = decodeCurveLiquidityStakeArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeCurveLiquidityStakeArgs should encode correctly", () => {
  expect(
    encodeCurveLiquidityStakeArgs({
      pool: CURVE_FRAX_USDC_POOL,
      incomingStakingToken: CURVE_FRAX_USDC_GAUGE,
      amount: toWei(100),
    }),
  ).toMatchInlineSnapshot(
    '"0x000000000000000000000000dcef968d416a41cdac0ed8702fac8128a64241a2000000000000000000000000cfc25170633581bf896cb6cdee170e3e3aa595030000000000000000000000000000000000000000000000056bc75e2d63100000"',
  );
});

test("decodeCurveLiquidityStakeArgs should decode correctly", () => {
  expect(
    decodeCurveLiquidityStakeArgs(
      "0x000000000000000000000000dcef968d416a41cdac0ed8702fac8128a64241a2000000000000000000000000cfc25170633581bf896cb6cdee170e3e3aa595030000000000000000000000000000000000000000000000056bc75e2d63100000",
    ),
  ).toEqual({
    pool: CURVE_FRAX_USDC_POOL,
    incomingStakingToken: CURVE_FRAX_USDC_GAUGE,
    amount: toWei(100),
  });
});

test("decodeCurveLiquidityClaimRewardsArgs should be equal to encoded data with encodeCurveLiquidityClaimRewardsArgs", () => {
  const params = {
    stakingToken: CURVE_FRAX_USDC_GAUGE,
  } as const;

  const encoded = encodeCurveLiquidityClaimRewardsArgs(params);
  const decoded = decodeCurveLiquidityClaimRewardsArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeCurveLiquidityClaimRewardsArgs should encode correctly", () => {
  expect(
    encodeCurveLiquidityClaimRewardsArgs({
      stakingToken: CURVE_FRAX_USDC_GAUGE,
    }),
  ).toMatchInlineSnapshot('"0x000000000000000000000000cfc25170633581bf896cb6cdee170e3e3aa59503"');
});

test("decodeCurveLiquidityClaimRewardsArgs should decode correctly", () => {
  expect(
    decodeCurveLiquidityClaimRewardsArgs("0x000000000000000000000000cfc25170633581bf896cb6cdee170e3e3aa59503"),
  ).toEqual({
    stakingToken: CURVE_FRAX_USDC_GAUGE,
  });
});
