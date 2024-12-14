import { beforeAll, describe, it } from "@std/testing/bdd";
import {
  type CreatePaymentPagePayload,
  PaystackClient,
  PaystackClientError,
  type UpdatePaymentPagePayload,
} from "../mod.ts";
import { load } from "@std/dotenv";
import { assertEquals } from "@std/assert/equals";
import { HttpStatusCode } from "axios";
import { generateRandomString } from "./utils.ts";
import { assertRejects } from "@std/assert/rejects";
import { assertInstanceOf } from "@std/assert/instance-of";

describe("PaystackClient.paymentPages", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient();
  });

  it("PaystackClient.paymentPages.create", async () => {
    const payload: CreatePaymentPagePayload = {
      name: "Test Payment Page",
    };
    const response = await client.paymentPages.create(payload);
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Page created");
  });

  it("PaystackClient.paymentPages.getPages", async () => {
    const response = await client.paymentPages.getPages();
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Pages retrieved");
  });

  it("PaystackClient.paymentPages.getPage", async () => {
    const response = await client.paymentPages.getPage("1618907");
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Page retrieved");
  });

  it("PaystackClient.paymentPages.update", async () => {
    const payload: UpdatePaymentPagePayload = {
      description: "A test description",
    };
    const response = await client.paymentPages.update("1618907", payload);
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Page updated");
  });

  it("PaystackClient.paymentPages.checkSlugAvailable", async () => {
    const slug = generateRandomString(12);
    const response = await client.paymentPages.checkSlugAvailable(slug);
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Slug is available");
  });

  it("PaystackClient.paymentPages.addProducts", async () => {
    const productResponse = await client.products.getProducts();
    assertEquals(productResponse.statusCode, HttpStatusCode.Ok);
    const products = productResponse.data.map((p) =>
      p.id
    );
    const err = await assertRejects(() =>
      client.paymentPages.addProducts("cn7wquoqyu", products)
    );
    assertInstanceOf(err, PaystackClientError);
    assertEquals(err.status, HttpStatusCode.InternalServerError);
  });
});
