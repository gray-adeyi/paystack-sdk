import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";

describe ('PaystackClient.refund', () => {
    let client: PaystackClient;

    beforeAll(async () => {
        await load({envPath:'./.env', export: true})
    });

    it('PaystackClient.refund.create',() => {});

    it('PaystackClient.refund.getRefunds',() => {});

    it('PaystackClient.refund.getRefund',() => {});
});
