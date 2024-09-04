import { Country, Currency } from "../../enums";

export type createPayload = {
    readonly customer: string;
    readonly preferredBank?: string;
    readonly subaccount?: string;
    readonly splitCode?: string;
    readonly firstName?: string; 
    readonly lastName?: string; 
    readonly phone?: string; 
};

export type assignPayload = {
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly phone: string;
    readonly preferredBank: string;
    readonly country: Country.NIGERIA;
    readonly bvn?: string;
    readonly bankCode?: string;
    readonly subaccount?: string;
    readonly splitCode?: string;
};

export type getDedicatedAccountsPayload = {
    readonly active: boolean;
    readonly currency: Currency.NGN;
    readonly providerSlug?: string;
    readonly bankId?: string;
    readonly customer?: string;
};


export type requeryPayload = {
    readonly accountNumber: string;
    readonly providerSlug: string;
    readonly date?: string;
};


export type splitPayload = {
    readonly customer: string;
    readonly subaccount?: string;
    readonly splitCode?: string;
    readonly preferredBank: string;
};

export type removeSplitPayload = {
    readonly accountNumber: string;
};

//? same here with the get_providers...