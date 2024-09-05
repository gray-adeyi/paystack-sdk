import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";

describe ('PaystackClient.transferRecipient', () => {
    let client: PaystackClient;

    beforeAll(async () => {
        await load({envPath:'./.env', export: true})
    });

    it('PaystackClient.transferRecipient.create',() => {});

    it('PaystackClient.transferRecipient.bulkCreate',() => {});

    it('PaystackClient.transferRecipient.getTransferRecipients',() => {});

    it('PaystackClient.transferRecipient.getTransferRecipient',() => {});

    it('PaystackClient.transferRecipient.update',() => {});

    it('PaystackClient.transferRecipient.delete',() => {});

});
