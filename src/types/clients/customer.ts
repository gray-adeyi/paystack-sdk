import type { Country, Identification } from "../../enums.ts";
import type { PaginationAndDateFilterOptions } from "../global.ts";

export type CreatePayload = {
  readonly email: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly phone?: string;
  readonly metadata?: Record<string, any>;
};

export type GetCustomersOptions = PaginationAndDateFilterOptions & {};

export type UpdatePayload = {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly phone?: string;
  readonly metadata?: Record<string, any>;
};

export type ValidatePayload = {
  readonly firstName: string;
  readonly lastName: string;
  readonly identificationType: Identification;
  readonly country: Country;
};
