import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";

describe ('PaystackClient.transfers', () => {
    let client: PaystackClient;

    beforeAll(async () => {
        await load({envPath:'./.env', export: true})
    });

    it('PaystackClient.transfers.initiate',() => {});

    it('PaystackClient.transfers.finalize',() => {});

    it('PaystackClient.transfers.bulkTransfer',() => {});

    it('PaystackClient.transfers.getTransfers',() => {});

    it('PaystackClient.transfers.getTransfer',() => {});

    it('PaystackClient.transfers.verify',() => {});
});
