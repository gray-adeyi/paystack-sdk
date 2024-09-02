import type { AccountType, Country, Document } from "../../enums.ts";

export type ValidateAccountPayload = {
    readonly accountName: string;
    readonly accountNumber: string;
    readonly accountType: AccountType;
    readonly bankCode: string;
    readonly countryCode: Country;
    readonly documentType: Document;
    readonly documentNumber?: string;
}