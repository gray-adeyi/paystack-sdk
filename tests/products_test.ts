import { beforeAll, describe, it } from "@std/testing/bdd";
import { PaystackClient } from "../mod.ts";
import { load } from "@std/dotenv";

describe ('PaystackClient.products', () => {
    let client: PaystackClient;

    beforeAll(async () => {
        await load({envPath:'./.env', export: true})
    });

    it('PaystackClient.products.create',() => {});

    it('PaystackClient.products.getproducts',() => {});

    it('PaystackClient.products.getProduct',() => {});

    it('PaystackClient.products.update',() => {});

});
