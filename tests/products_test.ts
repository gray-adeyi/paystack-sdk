import { beforeAll, describe, it } from "@std/testing/bdd";
import {
  type CreateProductPayload,
  Currency,
  PaystackClient,
  PaystackClientError,
  type UpdateProductPayload,
} from "../mod.ts";
import { load } from "@std/dotenv";
import { assertEquals } from "@std/assert/equals";
import { HttpStatusCode } from "axios";
import { assertRejects } from "@std/assert/rejects";
import { assertInstanceOf } from "@std/assert/instance-of";

describe("PaystackClient.products", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient();
  });

  it("PaystackClient.products.create", async () => {
    const payload: CreateProductPayload = {
      name: "Test product",
      description: "A test product",
      price: 300_000_000,
      currency: Currency.NGN,
    };
    const response = await client.products.create(payload);
    assertEquals(response.statusCode, HttpStatusCode.Created);
    assertEquals(response.message, "Product successfully created");
  });

  it("PaystackClient.products.getProducts", async () => {
    const response = await client.products.getProducts({ perPage: 1 });
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Products retrieved");
  });

  it("PaystackClient.products.getProduct", async () => {
    const response = await client.products.getProduct("1717501");
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Product retrieved");
  });

  it("PaystackClient.products.update", async () => {
    const payload: UpdateProductPayload = {
      name: "Test product",
      description: "A test product",
      price: 500_000_000,
      currency: Currency.NGN,
    };
    const err = await assertRejects(() =>
      client.products.update("PROD_0tbswmrz56osyxr", payload)
    );
    assertInstanceOf(err, PaystackClientError);
    assertEquals(err.status, HttpStatusCode.InternalServerError);
  });
});
