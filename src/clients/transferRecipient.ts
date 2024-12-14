import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  CreateTransferRecipientPayload,
  GetTransferRecipientsOptions,
  Recipient,
} from "../types/clients/index.ts";
import type { PaystackResponse } from "../types/global.ts";
import type { TransferRecipient } from "../types/models.ts";

/**
 * TransferRecipientClient provides methods that lets you interface with Paystack's
 * Transfer Recipients API which allows you to create and manage beneficiaries that you send money to.
 * https://paystack.com/docs/api/transfer-recipient/
 */
export default class TransferRecipientClient {
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
   * Creates a new recipient. A duplicate account number will lead to the
   * retrieval of the existing record.
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
   * @param payload - {@link CreateTransferRecipientPayload} is the data sent to
   * paystack to create a transfer recipient.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link TransferRecipient}
   */
  create(
    payload: CreateTransferRecipientPayload,
  ): Promise<PaystackResponse<TransferRecipient>> {
    return this.client.call(
      "/transferrecipient",
      HTTPMethod.POST,
      payload,
    ) as Promise<PaystackResponse<TransferRecipient>>;
  }

  /**
   * Create multiple transfer recipients in batches. A duplicate account
   * number will lead to the retrieval of the existing record.
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
   * @param batch - A array of transfer recipients.
   *
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object with `success` and `errors` as
   * its properties
   */
  bulkCreate(batch: Recipient[]): Promise<
    PaystackResponse<
      // deno-lint-ignore no-explicit-any
      { readonly success: TransferRecipient[]; readonly errors: Array<any> }
    >
  > {
    return this.client.call("/transferrecipient/bulk", HTTPMethod.POST, {
      batch,
    }) as Promise<
      PaystackResponse<
        // deno-lint-ignore no-explicit-any
        { readonly success: TransferRecipient[]; readonly errors: Array<any> }
      >
    >;
  }

  /**
   * Fetch transfer recipients available on your integration
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
   * @param options - {@link GetTransferRecipientsOptions} lets you customize
   * the data returned in the response
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is an array of objects of type {@link TransferRecipient}
   */
  getTransferRecipients(
    options?: GetTransferRecipientsOptions,
  ): Promise<PaystackResponse<TransferRecipient[]>> {
    return this.client.call(
      "/transferrecipient",
      HTTPMethod.GET,
      null,
      options,
    ) as Promise<PaystackResponse<TransferRecipient[]>>;
  }

  /**
   * Fetch the details of a transfer recipient
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
   * @param idOrCode - An ID or code for the recipient whose details
   * you want to receive.
   *
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object whose type is {@link TransferRecipient}
   */
  getTransferRecipient(
    idOrCode: string,
  ): Promise<PaystackResponse<TransferRecipient>> {
    return this.client.call(
      `/transferrecipient/${idOrCode}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<TransferRecipient>>;
  }

  /**
   * Update an existing recipient. A duplicate account number will lead
   * to the retrieval of the existing record.
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
   * @param idOrCode - Transfer Recipient's ID or code
   * @param name - A name for the recipient
   * @param email - Email address of the recipient
   *
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object whose type is {@link TransferRecipient}
   */
  update(
    idOrCode: string,
    name: string,
    email?: string,
  ): Promise<PaystackResponse<TransferRecipient>> {
    return this.client.call(`/transferrecipient/${idOrCode}`, HTTPMethod.PUT, {
      name,
      email,
    }) as Promise<PaystackResponse<TransferRecipient>>;
  }

  /**
   * Deletes a transfer recipient (sets the transfer recipient to inactive)
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
   * @param idOrCode - An ID or code for the recipient who you want to delete.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is `undefined`
   */
  delete(idOrCode: string | number): Promise<PaystackResponse<undefined>> {
    return this.client.call(
      `/transferrecipient/${idOrCode}`,
      HTTPMethod.DELETE,
    ) as Promise<PaystackResponse<undefined>>;
  }
}
