import type { Currency } from "../../enums.ts";
import { PaginationAndDateFilterOptions } from "../global.ts";

export type CreateProductPayload = {
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly currency: Currency;
    readonly unlimited?: boolean;
    readonly quantity?: number;
}

export type GetProductsOptions = PaginationAndDateFilterOptions

export type UpdateProductPayload = CreateProductPayload