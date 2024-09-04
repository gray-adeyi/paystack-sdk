import RestClient, { HTTPMethod } from "../restClient.ts";
import type { 
    assignPayload, 
    createPayload,
    removeSplitPayload,
    requeryPayload,
    splitPayload, 
} from "../types/clients/dedicatedAccounts.ts";

export default class dedicatedAccountsClient {
    client: RestClient;

    constructor(secretKey?: string, client?: RestClient) {
        if (client) {
          this.client = client;
        } else {
          this.client = new RestClient(secretKey);
        }
    };

    create(payload: createPayload) {
        return this.client.call(
            "/dedicated_account",
            HTTPMethod.POST,
            payload,
        );
    };

    assign(payload: assignPayload) {
        return this.client.call (
            "/dedicated_account/assign",
            HTTPMethod.POST,
            payload,
        );
    };

    getDedicatedAccounts(active?: boolean) {
        return this.client.call (
            `dedicated_account?active=${active}`,
            HTTPMethod.GET,
        );
    };

    getDedicatedAccount(dedicatedAccountId: number) {
        return this.client.call(
            `/dedicated_account/${dedicatedAccountId}`,
            HTTPMethod.GET
        );
    };

    requery(accountNumber: string) {
        return this.client.call(
            `dedicated_account?account_number=${accountNumber}`,
            HTTPMethod.GET,
        );
    };

    deactivate(dedicatedAccountId: number) {
        return this.client.call(
            `dedicated_account/${dedicatedAccountId}`,
            HTTPMethod.DELETE,
        );
    };

    split(payload: splitPayload) {
        return this.client.call(
            "/dedicated_account/split",
            HTTPMethod.POST,
            payload,
        );
    };
    
    removeSplit(payload: removeSplitPayload) {
        return this.client.call(
            "/dedicated_account/split",
            HTTPMethod.DELETE,
            payload,
        );
    };

    getProviders() {
        return this.client.call(
            "/dedicated_account/available_providers",
            HTTPMethod.GET,
        );
    };
};