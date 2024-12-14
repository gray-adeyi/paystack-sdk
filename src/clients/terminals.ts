import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  GetTerminalsOptions,
  SendEventPayload,
} from "../types/clients/index.ts";
import type { PaystackResponse } from "../types/global.ts";
import type { Terminal } from "../types/models.ts";

/**
 * TerminalClient provides methods that lets you interface with Paystack's
 * Terminal API which allows you to build delightful in-person payment
 * experiences. https://paystack.com/docs/api/terminal/
 */
export default class TerminalClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a TerminalClient
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
   * Send an event from your application to the Paystack Terminal
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
   * @param terminalId - The ID of the Terminal the event should be sent to.
   * @param payload - {@link SendEventPayload} is the data to be sent to the
   * terminal.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object with `id` as its property.
   */
  sendEvent(
    terminalId: string,
    payload: SendEventPayload,
  ): Promise<PaystackResponse<{ readonly id: string }>> {
    return this.client.call(
      `/terminal/${terminalId}/event`,
      HTTPMethod.POST,
      payload,
    ) as Promise<PaystackResponse<{ readonly id: string }>>;
  }

  /**
   * Check the status of an event sent to the Terminal
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
   * @param terminalId - The ID of the Terminal the event was sent to.
   * @param eventId - The ID of the event that was sent to the Terminal
   *
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object with `delivered` as its property.
   */
  getEventStatus(
    terminalId: string,
    eventId: string,
  ): Promise<PaystackResponse<{ readonly delivered: boolean }>> {
    return this.client.call(
      `/terminal/${terminalId}/event/${eventId}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<{ readonly delivered: boolean }>>;
  }

  /**
   * Check the availability of a Terminal before sending an event to it.
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
   * @param terminalId - The ID of the Terminal you want to check
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object with `online` and `available`
   * as its properties.
   */
  getTerminalStatus(terminalId: string): Promise<
    PaystackResponse<{
      readonly online: boolean;
      readonly available: boolean;
    }>
  > {
    return this.client.call(
      `/terminal/${terminalId}/presence`,
      HTTPMethod.GET,
    ) as Promise<
      PaystackResponse<{
        readonly online: boolean;
        readonly available: boolean;
      }>
    >;
  }

  /**
   * List the Terminals available on your integration
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
   * @param options - {@link GetTerminalsOptions} lets you customize the data
   * returned in the response.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is an array of objects whose type is {@link Terminal}
   */
  getTerminals(
    options?: GetTerminalsOptions,
  ): Promise<PaystackResponse<Terminal[]>> {
    return this.client.call(
      "/terminal",
      HTTPMethod.GET,
      null,
      options,
    ) as Promise<PaystackResponse<Terminal[]>>;
  }

  /**
   * Get the details of a Terminal
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
   * @param terminalId - The ID of the Terminal to be retrieved.
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link Terminal}
   */
  getTerminal(terminalId: string): Promise<PaystackResponse<Terminal>> {
    return this.client.call(
      `/terminal/${terminalId}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<Terminal>>;
  }

  /**
   * Update terminal information
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
   * @param terminalId - The ID of the Terminal to be updated.
   * @param name - The name the terminal should be updated to
   * @param address - The address the terminal should be updated to
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is `undefined`
   */
  updateTerminal(
    terminalId: string,
    name: string,
    address: string,
  ): Promise<PaystackResponse<undefined>> {
    return this.client.call(`/terminal/${terminalId}`, HTTPMethod.PUT, {
      name,
      address,
    }) as Promise<PaystackResponse<undefined>>;
  }

  /**
   * Activate your debug device by linking it to your integration
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
   * @param serialNumber - Device serial number
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is `undefined`
   */
  commissionTerminal(
    serialNumber: string,
  ): Promise<PaystackResponse<undefined>> {
    return this.client.call("/terminal/commission_device", HTTPMethod.POST, {
      serialNumber,
    }) as Promise<PaystackResponse<undefined>>;
  }

  /**
   * Unlink your debug device from your integration
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
   * @param serialNumber - Device serial number
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is `undefined`
   */
  decommissionTerminal(
    serialNumber: string,
  ): Promise<PaystackResponse<undefined>> {
    return this.client.call("/terminal/decommission_device", HTTPMethod.POST, {
      serialNumber,
    }) as Promise<PaystackResponse<undefined>>;
  }
}
