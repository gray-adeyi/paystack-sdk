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
   * @param payload : {@link ChargePayload} is the data that is sent to paystack to
   * initiate a charge.
   * @returns A promise containing a {@link PaystackResponse}
   */
  charge(payload: ChargePayload) {
    return this.client.call("/charge", HTTPMethod.POST, payload) as Promise<
      PaystackResponse<Transaction>
    >;
  }

  /**
   * Submit PIN to continue a charge
   *
   * @param pin : PIN submitted by user.
   * @param reference : Reference for the transaction that requested pin
   * @returns A promise containing a {@link PaystackResponse}
   */
  submitPin(pin: string, reference: string) {
    return this.client.call("charge/submit_pin", HTTPMethod.POST, {
      pin,
      reference,
    }) as Promise<PaystackResponse<Transaction>>;
  }

  /**
   * Submit OTP to complete a charge
   *
   * @param otp : OTP submitted by user
   * @param reference : Reference for ongoing transaction.
   * @returns A promise containing a {@link PaystackResponse}
   */
  submitOtp(otp: string, reference: string) {
    return this.client.call("/charge/submit_otp", HTTPMethod.POST, {
      otp,
      reference,
    }) as Promise<PaystackResponse<Transaction>>;
  }

  /**
   * Submit phone when requested.
   *
   * @param phone : Phone submitted by user.
   * @param reference : Reference for ongoing transaction
   * @returns A promise containing a {@link PaystackResponse}
   */
  submitPhone(phone: string, reference: string) {
    return this.client.call("/charge/submit_phone", HTTPMethod.POST, {
      phone,
      reference,
    }) as Promise<PaystackResponse<Transaction>>;
  }

  /**
   * Submit Birthday when requested.
   *
   * @param birthday : Birthday submitted by user. ISO Format e.g. 2016-09-21
   * @param reference : Reference for ongoing transaction
   * @returns A promise containing a {@link PaystackResponse}
   */
  submitBirthday(
    birthday: string,
    reference: string,
  ) {
    return this.client.call("/charge/submit_birthday", HTTPMethod.POST, {
      birthday,
      reference,
    }) as Promise<PaystackResponse<Transaction>>;
  }

  /**
   * Submit address to continue charge.
   *
   * @param payload : Is a {@link SubmitAddressPayload} containing the address information
   * that is sent to paystack.
   * @returns A promise containing a {@link PaystackResponse}
   */
  submitAddress(payload: SubmitAddressPayload) {
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
   * @param reference: The reference to check.
   * @returns A promise containing a {@link PaystackResponse}
   */
  checkPendingCharge(reference: string) {
    return this.client.call(`/charge/${reference}`, HTTPMethod.GET) as Promise<
      PaystackResponse<Transaction>
    >;
  }
}
