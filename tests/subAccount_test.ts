import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";

describe ('PaystackClient.subAccount', () => {
    let client: PaystackClient;

    beforeAll(async () => {
        await load({envPath:'./.env', export: true})
    });

    it('PaystackClient.subAccount.create',() => {});

    it('PaystackClient.subAccount.getSubAccounts',() => {});

    it('PaystackClient.subAccount.getSubAccount',() => {});

    it('PaystackClient.subAccount.update',() => {});

});
