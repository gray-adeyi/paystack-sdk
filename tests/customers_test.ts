import { beforeAll, describe, it } from "@std/testing/bdd";
import {
  Country,
  type CreateCustomerPayload,
  Identification,
  PaystackClient,
  RiskAction,
  type UpdateCustomerPayload,
  type ValidatePayload,
} from "../mod.ts";
import { load } from "@std/dotenv";
import { generateRandomString } from "./utils.ts";
import { assertEquals } from "@std/assert/equals";
import { AxiosError, HttpStatusCode } from "axios";
import { assertRejects } from "@std/assert/rejects";
import { assertInstanceOf } from "@std/assert/instance-of";
import { PaystackClientError } from "../src/errors.ts";

describe("PaystackClient.customers", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient();
  });

  it("PaystackClient.customers.create", async () => {
    const payload: CreateCustomerPayload = {
      email: `jd${generateRandomString(8)}@example.com`,
      firstName: "john",
      lastName: "doe",
    };
    const response = await client.customers.create(payload);
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Customer created");
  });

  it("PaystackClient.customers.getCustomers", async () => {
    const response = await client.customers.getCustomers();
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Customers retrieved");
  });

  it("PaystackClient.customers.getCustomer", async () => {
    const response = await client.customers.getCustomer("CUS_x1hp1dli4mdo1v0");
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Customer retrieved");
  });

  it("PaystackClient.customers.update", async () => {
    const payload: UpdateCustomerPayload = { metadata: { userName: "jigani" } };
    const response = await client.customers.update(
      "CUS_x1hp1dli4mdo1v0",
      payload,
    );
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Customer updated");
  });

  it("PaystackClient.customers.validate", async () => {
    const createPayload: CreateCustomerPayload = {
      email: `jd${generateRandomString(8)}@example.com`,
      firstName: "john",
      lastName: "doe",
    };
    const createResponse = await client.customers.create(createPayload);
    type DataOfInterest = { customerCode: string };
    const customerCode = (createResponse.data as DataOfInterest).customerCode;
    const payload: ValidatePayload = {
      firstName: "John",
      lastName: "Doe",
      type: Identification.BANK_ACCOUNT,
      country: Country.NIGERIA,
      bvn: "12324353543",
      bankCode: "121",
      accountNumber: "342432422",
    };
    const response = await client.customers.validate(
      customerCode,
      payload,
    );
    assertEquals(response.statusCode, HttpStatusCode.Accepted);
    assertEquals(response.message, "Customer Identification in progress");
  });

  it("PaystackClient.customers.flag", async () => {
    const response = await client.customers.flag(
      "CUS_x1hp1dli4mdo1v0",
      RiskAction.DEFAULT,
    );
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Customer updated");
  });

  it("PaystackClient.customers.deactivate", async () => {
    const err = await assertRejects(() =>
      client.customers.deactivate("AUTH_72btv547")
    );
    assertInstanceOf(err, PaystackClientError);
    type DataOfInterest = { status: boolean; message: string };
    const response = (err.wrappedError as AxiosError).response
      ?.data as DataOfInterest;
    assertEquals(response.status, false);
    assertEquals(response.message, "Authorization code not found.");
  });
});
