import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  GetTransferOptions,
  InitiateTransferPayload,
  TransferInstruction,
} from "../types/clients/index.ts";
import type { PaystackResponse } from "../types/global.ts";
import type { BulkTransferItem, Transfer } from "../types/models.ts";

/**
 * TransferClient provides methods that lets you interface with Paystack's
 * Transfers API which allows you to automate sending money on your integration
 * https://paystack.com/docs/api/transfer/
 */
export default class TransferClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a TransferRecipientClient
   *
   * @param secretKey - Your paystack integration secret key.
   * @param client - A custom rest client to use for making api calls to paystack's instead
   * of creating a new one with the secretKey
   */
  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  /**
   * Initiate transfer
   *
   * @remarks
   *
   * For typescript users, you may experience inconsistencies in the returned data such as
   * the data returned doesn't match the method return type or the data returned has
   * more fields that are not showing up or flagged as errors. This is because no validation
   * is done to check if the actual returned data matches the return type. The returned data
   * is just cast as the return type. Also, the return types are based on the seen data as at
   * the time of implementation and are subject to errors and changes from paystack (e.g.,
   * paystack adding more fields, which makes the models incorrect). When faced with this issue
   * in development, you may cast the method return type as `any` and then cast is to a return
   * type that serves your purpose. Also, please create an issue for it at
   * https://github.com/gray-adeyi/paystack-sdk/issues so the issue is fixed in future releases.
   *
   * @param payload - {@link InitiateTransferPayload} is the data sent to paystack
   * to initiate a transfer.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link Transfer}
   */
  initiate(payload: InitiateTransferPayload): Promise<
    PaystackResponse<Transfer>
  > {
    return this.client.call("/transfer", HTTPMethod.POST, payload) as Promise<
      PaystackResponse<Transfer>
    >;
  }

  /**
   * Finalize a transfer
   *
   * @remarks
   *
   * For typescript users, you may experience inconsistencies in the returned data such as
   * the data returned doesn't match the method return type or the data returned has
   * more fields that are not showing up or flagged as errors. This is because no validation
   * is done to check if the actual returned data matches the return type. The returned data
   * is just cast as the return type. Also, the return types are based on the seen data as at
   * the time of implementation and are subject to errors and changes from paystack (e.g.,
   * paystack adding more fields, which makes the models incorrect). When faced with this issue
   * in development, you may cast the method return type as `any` and then cast is to a return
   * type that serves your purpose. Also, please create an issue for it at
   * https://github.com/gray-adeyi/paystack-sdk/issues so the issue is fixed in future releases.
   *
   * @param transferCode - The code for transfer.
   * @param otp - one time password.
   * @returns A promise that resolves to an object whose type is  {@link PaystackResponse}.
   * The data property of the object is another object of type {@link Transfer}
   */
  finalize(
    transferCode: string,
    otp: string,
  ): Promise<PaystackResponse<Transfer>> {
    return this.client.call("/transfer/finalize_transfer", HTTPMethod.POST, {
      transferCode,
      otp,
    }) as Promise<PaystackResponse<Transfer>>;
  }

  /**
   * Transfer in bulk
   *
   * @remarks
   *
   * For typescript users, you may experience inconsistencies in the returned data such as
   * the data returned doesn't match the method return type or the data returned has
   * more fields that are not showing up or flagged as errors. This is because no validation
   * is done to check if the actual returned data matches the return type. The returned data
   * is just cast as the return type. Also, the return types are based on the seen data as at
   * the time of implementation and are subject to errors and changes from paystack (e.g.,
   * paystack adding more fields, which makes the models incorrect). When faced with this issue
   * in development, you may cast the method return type as `any` and then cast is to a return
   * type that serves your purpose. Also, please create an issue for it at
   * https://github.com/gray-adeyi/paystack-sdk/issues so the issue is fixed in future releases.
   *
   * @param transfers - An array of transfer instructions.
   * @param source - source of the fund used for the transfer.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is an array of objects whose type is {@link BulkTransferItem}
   */
  bulkTransfer(
    transfers: TransferInstruction[],
    source = "balance",
  ): Promise<PaystackResponse<BulkTransferItem[]>> {
    return this.client.call("transfer/bulk", HTTPMethod.POST, {
      transfers,
      source,
    }) as Promise<PaystackResponse<BulkTransferItem[]>>;
  }

  /**
   * Retrieve transfers made to a customer
   *
   * @remarks
   *
   * For typescript users, you may experience inconsistencies in the returned data such as
   * the data returned doesn't match the method return type or the data returned has
   * more fields that are not showing up or flagged as errors. This is because no validation
   * is done to check if the actual returned data matches the return type. The returned data
   * is just cast as the return type. Also, the return types are based on the seen data as at
   * the time of implementation and are subject to errors and changes from paystack (e.g.,
   * paystack adding more fields, which makes the models incorrect). When faced with this issue
   * in development, you may cast the method return type as `any` and then cast is to a return
   * type that serves your purpose. Also, please create an issue for it at
   * https://github.com/gray-adeyi/paystack-sdk/issues so the issue is fixed in future releases.
   *
   * @param options - {@link GetTransferOptions} lets you customize the data to
   * be returned in the response
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is an array of objects whose type is {@link Transfer}
   */
  getTransfers(
    options?: GetTransferOptions,
  ): Promise<PaystackResponse<Transfer[]>> {
    return this.client.call(
      "/transfer",
      HTTPMethod.GET,
      null,
      options,
    ) as Promise<PaystackResponse<Transfer[]>>;
  }

  /**
   * Retrieve a transfer
   *
   * @remarks
   *
   * For typescript users, you may experience inconsistencies in the returned data such as
   * the data returned doesn't match the method return type or the data returned has
   * more fields that are not showing up or flagged as errors. This is because no validation
   * is done to check if the actual returned data matches the return type. The returned data
   * is just cast as the return type. Also, the return types are based on the seen data as at
   * the time of implementation and are subject to errors and changes from paystack (e.g.,
   * paystack adding more fields, which makes the models incorrect). When faced with this issue
   * in development, you may cast the method return type as `any` and then cast is to a return
   * type that serves your purpose. Also, please create an issue for it at
   * https://github.com/gray-adeyi/paystack-sdk/issues so the issue is fixed in future releases.
   *
   * @param idOrCode - transfer ID or code.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link Transfer}
   */
  getTransfer(idOrCode: string): Promise<PaystackResponse<Transfer>> {
    return this.client.call(
      `/transfer/${idOrCode}/`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<Transfer>>;
  }

  /**
   * Verify a transfer
   *
   * @remarks
   *
   * For typescript users, you may experience inconsistencies in the returned data such as
   * the data returned doesn't match the method return type or the data returned has
   * more fields that are not showing up or flagged as errors. This is because no validation
   * is done to check if the actual returned data matches the return type. The returned data
   * is just cast as the return type. Also, the return types are based on the seen data as at
   * the time of implementation and are subject to errors and changes from paystack (e.g.,
   * paystack adding more fields, which makes the models incorrect). When faced with this issue
   * in development, you may cast the method return type as `any` and then cast is to a return
   * type that serves your purpose. Also, please create an issue for it at
   * https://github.com/gray-adeyi/paystack-sdk/issues so the issue is fixed in future releases.
   *
   * @param reference - a reference for the transfer.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link Transfer}
   */
  verify(reference: string): Promise<PaystackResponse<Transfer>> {
    return this.client.call(
      `transfer/verify/${reference}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<Transfer>>;
  }
}
