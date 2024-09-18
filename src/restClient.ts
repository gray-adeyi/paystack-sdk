import axios from "axios";
import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { camelCase, snakeCase } from "lodash-es";
import { PaystackClientError } from "./errors.ts";
import type { PaystackResponse } from "./types/global.ts";

export enum HTTPMethod {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
}

const IGNORE_KEYS = ["domainName"];

export default class RestClient {
  static BASE_URL = "https://api.paystack.co";
  static ENV_SECRET_KEY_NAME = "PAYSTACK_SECRET_KEY";

  private secretKey!: string;
  private client: AxiosInstance;

  constructor(secretKey?: string) {
    this.loadPrivateKey(secretKey);
    this.client = axios.create({
      baseURL: RestClient.BASE_URL,
      headers: this.headers,
    });
    this.client.interceptors.request.use(
      this.requestPayloadTransformerInterceptor,
      this.handleRequestError,
    );
    this.client.interceptors.response.use(
      this.responsePayloadTransformerInterceptor,
      this.handleResponseError,
    );
  }

  async call(
    endpoint: string,
    method: HTTPMethod,
    // deno-lint-ignore no-explicit-any
    data?: any,
    // deno-lint-ignore no-explicit-any
    params?: Record<string, any>,
  ): Promise<PaystackResponse> {
    const handler = this.getMethodHandler(method);
    let response: AxiosResponse;
    if ([HTTPMethod.GET, HTTPMethod.DELETE].includes(method)) {
      response = await handler(endpoint, { params });
    } else {
      response = await handler(endpoint, data);
    }
    return this.deserializeResponse(response);
  }

  private get baseHeaders() {
    return {
      "User-Agent": "@gray-adeyi/paystack-sdk 0.1.2",
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "",
    };
  }

  private get headers() {
    return {
      ...this.baseHeaders,
      Authorization: `Bearer ${this.secretKey}`,
    };
  }

  private getMethodHandler(method: HTTPMethod) {
    switch (method) {
      case HTTPMethod.GET:
        return this.client.get;
      case HTTPMethod.POST:
        return this.client.post;
      case HTTPMethod.PATCH:
        return this.client.patch;
      case HTTPMethod.PUT:
        return this.client.put;
      case HTTPMethod.DELETE:
        return this.client.delete;
    }
  }

  private deserializeResponse(response: AxiosResponse): PaystackResponse {
    return {
      statusCode: response.status,
      status: response.data["status"] || false,
      message: response.data["message"],
      data: response.data["data"],
    };
  }

  private requestPayloadTransformerInterceptor(
    config: InternalAxiosRequestConfig,
  ) {
    config.data = RestClient.camelToSnakeCaseTransformer(config.data);
    config.params = RestClient.camelToSnakeCaseTransformer(config.params);
    return config;
  }

  private responsePayloadTransformerInterceptor(response: AxiosResponse) {
    response.data = RestClient.snakeToCamelCaseTransformer(response.data);
    return response;
  }

  // deno-lint-ignore no-explicit-any
  static camelToSnakeCaseTransformer(data: any): any {
    if (Array.isArray(data)) {
      return data.map(RestClient.camelToSnakeCaseTransformer);
    } else if (data !== null && typeof data === "object") {
      // deno-lint-ignore no-explicit-any
      return Object.keys(data).reduce((acc: Record<string, any>, key) => {
        const skipKey = IGNORE_KEYS.includes(key);
        const snakeKey: string = skipKey ? key : snakeCase(key);
        acc[snakeKey] = RestClient.camelToSnakeCaseTransformer(data[key]);
        return acc;
      }, {});
    }
    return data;
  }

  // deno-lint-ignore no-explicit-any
  static snakeToCamelCaseTransformer(data: any): any {
    if (Array.isArray(data)) {
      return data.map(RestClient.snakeToCamelCaseTransformer);
    } else if (data !== null && typeof data === "object") {
      // deno-lint-ignore no-explicit-any
      return Object.keys(data).reduce((acc: Record<string, any>, key) => {
        const skipKey = IGNORE_KEYS.includes(key);
        const camelKey = skipKey ? key : camelCase(key);
        acc[camelKey] = RestClient.snakeToCamelCaseTransformer(data[key]);
        return acc;
      }, {});
    }
    return data;
  }

  private handleRequestError(error: AxiosError) {
    return Promise.reject(
      new PaystackClientError(error.message, error.status, error.code),
    );
  }

  private handleResponseError(error: AxiosError) {
    return Promise.reject(
      new PaystackClientError(error.message, error.status, error.code, error),
    );
  }

  private loadPrivateKey(value?: string) {
    if (value) {
      this.secretKey = value;
      return;
    }
    if (!Deno.env.has(RestClient.ENV_SECRET_KEY_NAME)) {
      throw new PaystackClientError(
        `secret key was not provided on instantiation or set in environmental variables as ${RestClient.ENV_SECRET_KEY_NAME}`,
      );
    }
    this.secretKey = Deno.env.get(RestClient.ENV_SECRET_KEY_NAME) as string;
  }
}
