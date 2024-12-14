import type { Reason } from "../enums.ts";
import RestClient, { HTTPMethod } from "../restClient.ts";
import type { PaystackResponse } from "../types/global.ts";
import type { Currency } from "../enums.ts";
import type { BalanceLedgerItem } from "../types/models.ts";

/**
 * TransferControlClient provides methods lets you interface with Paystack's
 * Transfer Control API which allows you to manage settings of your transfers.
 * https://paystack.com/docs/api/transfer-control/
 */
export default class TransferControlClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a TransferControlClient
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
   * Fetch the available balance on your integration
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
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object with `currency` and `balance`
   * as its properties.
   */
  checkBalance(): Promise<
    PaystackResponse<{
      readonly currency: Currency;
      readonly balance: number;
    }[]>
  > {
    return this.client.call("/balance", HTTPMethod.GET) as Promise<
      PaystackResponse<{
        readonly currency: Currency;
        readonly balance: number;
      }[]>
    >;
  }

  /**
   * Fetch all pay-ins and pay-outs that occurred on your integration
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
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is an array of objects whose type is {@link BalanceLedgerItem}
   */
  getBalanceLedger(): Promise<
    PaystackResponse<BalanceLedgerItem[]>
  > {
    return this.client.call("/balance/ledger", HTTPMethod.GET) as Promise<
      PaystackResponse<BalanceLedgerItem[]>
    >;
  }

  /**
   * Generates a new OTP and sends to customer in the event they are having trouble receiving one.
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
   * @param transferCode - Transfer code
   * @param reason -  Any value from the reason enum
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is `undefined`
   */
  resendOtp(
    transferCode: string,
    reason: Reason,
  ): Promise<PaystackResponse<undefined>> {
    return this.client.call("/transfer/resend_otp", HTTPMethod.POST, {
      transferCode,
      reason,
    }) as Promise<PaystackResponse<undefined>>;
  }

  /**
   * This is used in the event that you want to be able to complete transfers
   * programmatically without use of OTPs. No arguments required. You will get
   * an OTP to complete the request
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
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is `undefined`
   */
  disableOtp(): Promise<PaystackResponse<undefined>> {
    return this.client.call(
      "/transfer/disable_otp",
      HTTPMethod.POST,
    ) as Promise<PaystackResponse<undefined>>;
  }

  /**
   * Finalize the request to disable OTP on your transfers.
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
   * @param otp - One time password
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is `undefined`
   */
  finalizeDisableOtp(otp: string): Promise<PaystackResponse<undefined>> {
    return this.client.call("/transfer/disable_otp_finalize", HTTPMethod.POST, {
      otp,
    }) as Promise<PaystackResponse<undefined>>;
  }

  /**
   * In the event that a customer wants to stop being able to complete transfers
   * programmatically, this endpoint helps turn OTP requirement back on. No
   * arguments required.
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
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is `undefined`
   */
  enableOtp(): Promise<PaystackResponse<undefined>> {
    return this.client.call(
      "/transfer/enable_otp/",
      HTTPMethod.POST,
    ) as Promise<PaystackResponse<undefined>>;
  }
}
