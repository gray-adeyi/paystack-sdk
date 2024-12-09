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
   * @param terminalId: The ID of the Terminal the event should be sent to.
   * @param payload : {@link SendEventPayload} is the data to be sent to the
   * terminal.
   * @returns A promise containing a {@link PaystackResponse}
   */
  sendEvent(
    terminalId: string,
    payload: SendEventPayload,
  ) {
    return this.client.call(
      `/terminal/${terminalId}/event`,
      HTTPMethod.POST,
      payload,
    ) as Promise<PaystackResponse<{ readonly id: string }>>;
  }

  /**
   * Check the status of an event sent to the Terminal
   *
   * @param terminalId : The ID of the Terminal the event was sent to.
   * @param eventId: The ID of the event that was sent to the Terminal
   *
   * @returns A promise containing a {@link PaystackResponse}
   */
  getEventStatus(
    terminalId: string,
    eventId: string,
  ) {
    return this.client.call(
      `/terminal/${terminalId}/event/${eventId}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<{ readonly delivered: boolean }>>;
  }

  /**
   * Check the availability of a Terminal before sending an event to it.
   *
   * @param terminalId : The ID of the Terminal you want to check
   * @returns A promise containing a {@link PaystackResponse}
   */
  getTerminalStatus(terminalId: string) {
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
   * @param options : {@link GetTerminalsOptions} lets you customize the data
   * returned in the response.
   * @returns A promise containing a {@link PaystackResponse}
   */
  getTerminals(options?: GetTerminalsOptions) {
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
   * @param terminalId : The ID of the Terminal to be retrieved.
   * @returns A promise containing a {@link PaystackResponse}
   */
  getTerminal(terminalId: string) {
    return this.client.call(
      `/terminal/${terminalId}`,
      HTTPMethod.GET,
    ) as Promise<PaystackResponse<Terminal>>;
  }

  /**
   * @param terminalId The ID of the Terminal to be updated.
   * @param name The name the terminal should be updated to
   * @param address The address the terminal should be updated to
   * @returns A promise containing a {@link PaystackResponse}
   */
  updateTerminal(
    terminalId: string,
    name: string,
    address: string,
  ) {
    return this.client.call(`/terminal/${terminalId}`, HTTPMethod.PUT, {
      name,
      address,
    }) as Promise<PaystackResponse<undefined>>;
  }

  /**
   * Activate your debug device by linking it to your integration
   *
   * @param serialNumber : Device serial number
   * @returns A promise containing a {@link PaystackResponse}
   */
  commissionTerminal(serialNumber: string) {
    return this.client.call("/terminal/commission_device", HTTPMethod.POST, {
      serialNumber,
    }) as Promise<PaystackResponse<undefined>>;
  }

  /**
   * Unlink your debug device from your integration
   *
   * @param serialNumber : Device serial number
   * @returns A promise containing a {@link PaystackResponse}
   */
  decommissionTerminal(serialNumber: string) {
    return this.client.call("/terminal/decommission_device", HTTPMethod.POST, {
      serialNumber,
    }) as Promise<PaystackResponse<undefined>>;
  }
}
