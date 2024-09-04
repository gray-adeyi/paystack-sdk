import type { Country, Currency } from "../../enums.ts";

export type CreateDedicatedAccountPayload = {
  readonly customer: string;
  readonly preferredBank?: string;
  readonly subaccount?: string;
  readonly splitCode?: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly phone?: string;
};

export type AssignDedicatedAccountPayload = {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phone: string;
  readonly preferredBank: string;
  readonly country?: Country;
  readonly accountNumber?: string;
  readonly bvn?: string;
  readonly bankCode?: string;
  readonly subaccount?: string;
  readonly splitCode?: string;
};

export type GetDedicatedAccountsOptions = {
  readonly active: boolean;
  readonly currency?: Currency;
  readonly providerSlug?: string;
  readonly bankId?: string;
  readonly customer?: string;
};

export type SplitPayload = {
  readonly customer: string;
  readonly subaccount?: string;
  readonly splitCode?: string;
  readonly preferredBank?: string;
};
