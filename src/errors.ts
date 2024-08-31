export class PaystackClientError extends Error {
  detail: string;
  status?: number;
  code?: string;
  wrappedError?: Error;

  constructor(
    detail: string,
    status?: number,
    code?: string,
    wrappedError?: Error,
  ) {
    super(detail);
    this.detail = detail;
    this.status = status;
    this.code = code;
    this.wrappedError = wrappedError;
  }
}
