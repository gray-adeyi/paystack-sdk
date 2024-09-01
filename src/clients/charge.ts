import RestClient, { HTTPMethod } from "../restClient.ts";
import type { ChargePayload, SetAddressPayload } from "../types/clients/charge.ts";

export default class ChargeClient {
  client: RestClient;

  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  charge(payload: ChargePayload){
    return this.client.call('/charge', HTTPMethod.POST, payload)
  }

  submitPin(pin: string, reference: string){
    return this.client.call('charge/submit_pin',HTTPMethod.POST,{pin,reference})
  }

  submitOtp(otp: string, reference: string){
    return this.client.call('/charge/submit_pin', HTTPMethod.POST,{otp,reference})
  }

  submitPhone(phone: string, reference: string){
    return this.client.call('/charge/submit_phone',HTTPMethod.POST,{phone,reference})
  }

  submitBirthday(birthday: string, reference: string){
    return this.client.call('/charge/submit_birthday', HTTPMethod.POST,{birthday, reference})
  }

  submitAddress(payload: SetAddressPayload){
    return this.client.call('/charge/submit_address', HTTPMethod.POST, payload)
  }

  checkPendingCharge(reference: string){
    return this.client.call(`/charge/${reference}`, HTTPMethod.GET)
  }
}
