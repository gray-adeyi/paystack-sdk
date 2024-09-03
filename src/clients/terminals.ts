import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  GetTerminalsOptions,
  SendEventPayload,
} from "../types/clients/terminals.ts";

export default class TerminalClient {
  client: RestClient;

  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  sendEvent(terminalId: string, payload: SendEventPayload) {
    return this.client.call(
      `/terminal/${terminalId}/event`,
      HTTPMethod.POST,
      payload,
    );
  }

  getEventStatus(terminalId: string, eventId: string) {
    return this.client.call(
      `/terminal/${terminalId}/event/${eventId}`,
      HTTPMethod.GET,
    );
  }

  getTerminalStatus(terminalId: string) {
    return this.client.call(`/terminal/${terminalId}/presence`, HTTPMethod.GET);
  }

  getTerminals(options: GetTerminalsOptions) {
    return this.client.call("/terminal", HTTPMethod.GET, null, options);
  }

  getTerminal(terminalId: string) {
    return this.client.call(`/terminal/${terminalId}`, HTTPMethod.GET);
  }

  updateTerminal(terminalId: string, name: string, address: string) {
    return this.client.call(`/terminal/${terminalId}`, HTTPMethod.PUT, {
      name,
      address,
    });
  }

  commissionTerminal(serialNumber: string) {
    return this.client.call("/terminal/commission_device", HTTPMethod.POST, {
      serialNumber,
    });
  }

  decommissionTerminal(serialNumber: string) {
    return this.client.call("/terminal/decommission_device", HTTPMethod.POST, {
      serialNumber,
    });
  }
}
