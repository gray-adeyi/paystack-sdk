import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  ChargePayload,
  SubmitAddressPayload,
} from "../types/clients/charge.ts";
import type { PaystackResponse } from "../types/global.ts";
import type { Transaction } from "../types/models.ts";

/**
 * ChargeClient provides methods that lets you interface with Paystack's
 * Charge API which allows you to configure a payment channel of your choice
 * when initiating a payment. https://paystack.com/docs/api/charge/
 */
export default class ChargeClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a ChargeClient
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
   * Initiate a payment by integrating the payment channel of your choice.
   *
   * @param payload - {@link ChargePayload} is the data that is sent to paystack to
   * initiate a charge.
   * @returns A promise containing an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object whose type is {@link Transaction}
   */
  charge(payload: ChargePayload): Promise<
    PaystackResponse<Transaction>
  > {
    return this.client.call("/charge", HTTPMethod.POST, payload) as Promise<
      PaystackResponse<Transaction>
    >;
  }

  /**
   * Submit PIN to continue a charge
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
   * @param pin - PIN submitted by user.
   * @param reference - Reference for the transaction that requested pin
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object whose type is {@link Transaction}
   */
  submitPin(
    pin: string,
    reference: string,
  ): Promise<PaystackResponse<Transaction>> {
    return this.client.call("charge/submit_pin", HTTPMethod.POST, {
      pin,
      reference,
    }) as Promise<PaystackResponse<Transaction>>;
  }

  /**
   * Submit OTP to complete a charge
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
   * @param otp - OTP submitted by user
   * @param reference - Reference for ongoing transaction.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object whose type is {@link Transaction}
   */
  submitOtp(
    otp: string,
    reference: string,
  ): Promise<PaystackResponse<Transaction>> {
    return this.client.call("/charge/submit_otp", HTTPMethod.POST, {
      otp,
      reference,
    }) as Promise<PaystackResponse<Transaction>>;
  }

  /**
   * Submit phone when requested.
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
   * @param phone - Phone submitted by user.
   * @param reference - Reference for ongoing transaction
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object whose type is {@link Transaction}
   */
  submitPhone(
    phone: string,
    reference: string,
  ): Promise<PaystackResponse<Transaction>> {
    return this.client.call("/charge/submit_phone", HTTPMethod.POST, {
      phone,
      reference,
    }) as Promise<PaystackResponse<Transaction>>;
  }

  /**
   * Submit Birthday when requested.
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
   * @param birthday - Birthday submitted by user. ISO Format e.g. 2016-09-21
   * @param reference - Reference for ongoing transaction
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object whose type is {@link Transaction}
   */
  submitBirthday(
    birthday: string,
    reference: string,
  ): Promise<PaystackResponse<Transaction>> {
    return this.client.call("/charge/submit_birthday", HTTPMethod.POST, {
      birthday,
      reference,
    }) as Promise<PaystackResponse<Transaction>>;
  }

  /**
   * Submit address to continue charge.
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
   * @param payload - Is a {@link SubmitAddressPayload} containing the address information
   * that is sent to paystack.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another whose type is {@link Transaction}
   */
  submitAddress(
    payload: SubmitAddressPayload,
  ): Promise<PaystackResponse<Transaction>> {
    return this.client.call(
      "/charge/submit_address",
      HTTPMethod.POST,
      payload,
    ) as Promise<PaystackResponse<Transaction>>;
  }

  /**
   * When you get "pending" as a charge status or if there was an
   * exception when calling any of the /charge endpoints, wait 10
   * seconds or more, then make a check to see if its status has changed.
   * Don't call too early as you may get a lot more pending than you should.
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
   * @param reference - The reference to check.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another whose type is {@link Transaction}
   */
  checkPendingCharge(reference: string): Promise<
    PaystackResponse<Transaction>
  > {
    return this.client.call(`/charge/${reference}`, HTTPMethod.GET) as Promise<
      PaystackResponse<Transaction>
    >;
  }
}
