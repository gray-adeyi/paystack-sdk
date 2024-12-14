import { beforeAll, describe, it } from "@std/testing/bdd";
import {
  type CreateTransferRecipientPayload,
  PaystackClient,
  type Recipient,
  RecipientType,
} from "../mod.ts";
import { load } from "@std/dotenv";
import { assertEquals } from "@std/assert/equals";
import { HttpStatusCode } from "axios";
import { generateRandomString } from "./utils.ts";

describe("PaystackClient.transferRecipient", () => {
  let client: PaystackClient;

  beforeAll(async () => {
    await load({ envPath: "../.env", export: true });
    client = new PaystackClient();
  });

  it("PaystackClient.transferRecipient.create", async () => {
    const payload: CreateTransferRecipientPayload = {
      type: RecipientType.NUBAN,
      name: `Adeyi Gbenga Michael ${generateRandomString(7)}`,
      accountNumber: "5273681014",
      bankCode: "214",
    };
    const response = await client.transferRecipients.create(payload);
    assertEquals(response.statusCode, HttpStatusCode.Created);
    assertEquals(response.message, "Transfer recipient created successfully");
  });

  it.only("PaystackClient.transferRecipient.bulkCreate", async () => {
    const payload: Recipient[] = [
      {
        type: RecipientType.NUBAN,
        name: `Adeyi Gbenga Michael ${generateRandomString(7)}`,
        accountNumber: "5273681014",
        bankCode: "214",
      },
      {
        type: RecipientType.NUBAN,
        name: `Adeyi Gbenga Michael ${generateRandomString(7)}`,
        accountNumber: "5273681014",
        bankCode: "214",
      },
    ];
    const response = await client.transferRecipients.bulkCreate(payload);
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Recipients added successfully");
  });

  it("PaystackClient.transferRecipient.getTransferRecipients", async () => {
    const response = await client.transferRecipients.getTransferRecipients();
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Recipients retrieved");
  });

  it("PaystackClient.transferRecipient.getTransferRecipient", async () => {
    const response = await client.transferRecipients.getTransferRecipient(
      "RCP_fnyy9txa9xg8t4m",
    );
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Recipient retrieved");
  });

  it("PaystackClient.transferRecipient.update", async () => {
    const response = await client.transferRecipients.update(
      "RCP_1l58m5unz4028z5",
      "Coyote solutions",
    );
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Recipient updated");
  });

  it("PaystackClient.transferRecipient.delete", async () => {
    const createPayload: CreateTransferRecipientPayload = {
      type: RecipientType.NUBAN,
      name: `Adeyi Gbenga Michael ${generateRandomString(7)}`,
      accountNumber: "5273681014",
      bankCode: "214",
    };
    const createResponse = await client.transferRecipients.create(
      createPayload,
    );
    const data = createResponse.data;
    const response = await client.transferRecipients.delete(data.id);
    assertEquals(response.statusCode, HttpStatusCode.Ok);
    assertEquals(response.message, "Transfer recipient set as inactive");
  });
});
