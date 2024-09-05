import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";

describe ('PaystackClient.dedicatedAccounts', () => {
    let client: PaystackClient;

    beforeAll(async () => {
        await load({envPath:'./.env', export: true})
    });

    it('PaystackClient.dedicatedAccounts.create',() => {});

    it('PaystackClient.dedicatedAccounts.assign',() => {});

    it('PaystackClient.dedicatedAccounts.getDedicatedAccounts',() => {});

    it('PaystackClient.dedicatedAccounts.getDedicatedAccount',() => {});

    it('PaystackClient.dedicatedAccounts.requery',() => {});

    it('PaystackClient.dedicatedAccounts.deactivate',() => {});

    it('PaystackClient.dedicatedAccounts.split',() => {});

    it('PaystackClient.dedicatedAccounts.removeSplit',() => {});

    it('PaystackClient.dedicatedAccounts.getProviders',() => {});
});
