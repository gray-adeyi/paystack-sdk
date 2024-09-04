import RestClient, { HTTPMethod } from "../restClient.ts";
import { 
    addEvidencePayload, 
    resolveDisputePayload, 
    updateDisputePayload 
} from "../types/clients/disputes.ts";

export default class DisputesClient {
    client: RestClient;

    constructor(secretKey?: string, client?: RestClient) {
        if (client) {
        this.client = client;
        } else {
        this.client = new RestClient(secretKey);
        }
    };

    getdisputes(pagination: number){
        return this.client.call (
            `/dispute?perPage=${pagination = 50}`,
            HTTPMethod.GET,
        );
    };

    getDispute(id: string) {
        return this.client.call(
            `/dispute/${id}`,
            HTTPMethod.GET
        );
    };

    getTransactionDisputes(id: string) {
        return this.client.call(
            `/dispute/transaction/${id}`,
            HTTPMethod.GET,
        );
    };

    updateDispute(payload: updateDisputePayload, id:string) {
        return this.client.call(
            `/dispute/${id}`,
            HTTPMethod.PUT,
            payload
        );
    };

    addEvidence(payload: addEvidencePayload, id: string) {
        return this.client.call(
            `/dispute/${id}/evidence`,
            HTTPMethod.POST,
            payload
        );
    };

    getUploadUrl(id: string, uploadFilename: string) {
        return this.client.call(
            `/dispute/${id}/upload_url?upload_filename=${uploadFilename}`,
            HTTPMethod.GET,

        );
    };

    resolveDispute(payload: resolveDisputePayload, id: string) {
        return this.client.call(
            `/dispute/${id}/resolve`,
            HTTPMethod.PUT,
            payload,
        );
    };

    exportDisputes(pagination: number) {
        return this.client.call(
            `/dispute/export?perPage=${pagination}`,
            HTTPMethod.GET,
        );
    };
};