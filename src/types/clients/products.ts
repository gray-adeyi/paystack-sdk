import type { Currency } from "../../enums.ts";
import type { PaginationAndDateFilterOptions } from "../global.ts";

/**
 * A representation of the data sent to Paystack to create a Product
 */
export type CreateProductPayload = {
  /**
   * The name of the product
   */
  readonly name: string;
  /**
   * A description for the product
   */
  readonly description: string;
  /**
   * Price should be in kobo if currency is ``Currency.NGN``, pesewas,
   * if currency is ``Currency.GHS``, and cents, if currency is ``Currency.ZAR``
   */
  readonly price: number;
  /**
   * Any value from the {@link Currency} enum
   */
  readonly currency: Currency;
  /**
   * Set to ``true`` if the product has unlimited stock.
   * Leave as ``false`` if the product has limited stock
   */
  readonly unlimited?: boolean;
  /**
   * Number of products in stock. Use if unlimited is ``false``
   */
  readonly quantity?: number;
};

/**
 * Lets you customize how products are retrieved.
 * @see {@link PaginationAndDateFilterOptions}
 */
export type GetProductsOptions = PaginationAndDateFilterOptions;

/**
 * A representation of the data sent to Paystack to update
 * a product. @see {@link CreateProductPayload}
 */
export type UpdateProductPayload = CreateProductPayload;
