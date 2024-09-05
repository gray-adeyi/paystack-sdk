import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";

describe ('PaystackClient.disputes', () => {
    let client: PaystackClient;

    beforeAll(async () => {
        await load({envPath:'./.env', export: true})
    });

    it('PaystackClient.disputes.getDisputes',() => {});

    it('PaystackClient.disputes.getDispute',() => {});

    it('PaystackClient.disputes.getTransactionDisputes',() => {});

    it('PaystackClient.disputes.updateDispute',() => {});

    it('PaystackClient.disputes.addEvidence',() => {});

    it('PaystackClient.disputes.getUploadUrl',() => {});

    it('PaystackClient.disputes.resolveDispute',() => {});

    it('PaystackClient.disputes.exportDisputes',() => {});
});
