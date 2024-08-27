// @generated by protoc-gen-es v2.0.0 with parameter "target=ts"
// @generated from file enzyme/enzyme/v1/portfolio_asset_item.proto (package enzyme.enzyme.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file enzyme/enzyme/v1/portfolio_asset_item.proto.
 */
export const file_enzyme_enzyme_v1_portfolio_asset_item: GenFile = /*@__PURE__*/
  fileDesc("Citlbnp5bWUvZW56eW1lL3YxL3BvcnRmb2xpb19hc3NldF9pdGVtLnByb3RvEhBlbnp5bWUuZW56eW1lLnYxIoYBChJQb3J0Zm9saW9Bc3NldEl0ZW0SDwoHYWRkcmVzcxgBIAEoCRIPCgdiYWxhbmNlGAIgASgCEg0KBXByaWNlGAMgASgCEg0KBXZhbHVlGAQgASgCEhYKDnByaWNlX2lzX3ZhbGlkGAUgASgIEhgKEGFzc2V0X2lzX3RyYWNrZWQYBiABKAhCkQEKFGNvbS5lbnp5bWUuZW56eW1lLnYxQhdQb3J0Zm9saW9Bc3NldEl0ZW1Qcm90b1ABogIDRUVYqgIQRW56eW1lLkVuenltZS5WMcoCEEVuenltZVxFbnp5bWVcVjHiAhxFbnp5bWVcRW56eW1lXFYxXEdQQk1ldGFkYXRh6gISRW56eW1lOjpFbnp5bWU6OlYxYgZwcm90bzM");

/**
 * @generated from message enzyme.enzyme.v1.PortfolioAssetItem
 */
export type PortfolioAssetItem = Message<"enzyme.enzyme.v1.PortfolioAssetItem"> & {
  /**
   * The address of the asset
   *
   * @generated from field: string address = 1;
   */
  address: string;

  /**
   * The vault's current balance in the asset
   *
   * @generated from field: float balance = 2;
   */
  balance: number;

  /**
   * The current price for one unit of the asset
   *
   * @generated from field: float price = 3;
   */
  price: number;

  /**
   * The current value of the asset
   *
   * @generated from field: float value = 4;
   */
  value: number;

  /**
   * Is the current price valid?
   *
   * @generated from field: bool price_is_valid = 5;
   */
  priceIsValid: boolean;

  /**
   * Is the asset tracked by the vault?
   *
   * @generated from field: bool asset_is_tracked = 6;
   */
  assetIsTracked: boolean;
};

/**
 * Describes the message enzyme.enzyme.v1.PortfolioAssetItem.
 * Use `create(PortfolioAssetItemSchema)` to create a new message.
 */
export const PortfolioAssetItemSchema: GenMessage<PortfolioAssetItem> = /*@__PURE__*/
  messageDesc(file_enzyme_enzyme_v1_portfolio_asset_item, 0);

