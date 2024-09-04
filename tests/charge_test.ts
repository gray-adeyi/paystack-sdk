import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";

describe ('PaystackClient.charge', () => {
    let client: PaystackClient;

    beforeAll(async () => {
        await load({envPath:'./.env', export: true})
    });

    it('PaystackClient.charge.charge',() => {});

    it('PaystackClient.charge.submitPin',() => {});

    it('PaystackClient.charge.submitOtp',() => {});

    it('PaystackClient.charge.submitPhone',() => {});

    it('PaystackClient.charge.submitBirthday',() => {});

    it('PaystackClient.charge.submitAddress',() => {});

    it('PaystackClient.charge.checkPendingCharge',() => {});
});
