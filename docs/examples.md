# Examples

## Charging a customer

```ts
import {
  type ChargePayload,
  PaystackClient,
  type PaystackResponse,
} from "@gray-adeyi/pastack-sdk";

const client = new PaystackClient(); // assumes your PAYSTACK_SECRET_KEY is set in your environmental variables.
const payload: ChargePayload = {
  email: "johndoe@example.com",
  amount: 1_000_000,
};
client.charge.charge(payload).then((response: PaystackResponse) => {
  console.log(`The response status code is ${response.statusCode}`);
  console.log(`The response status is ${response.status}`);
  console.log(`The response message is ${response.message}`);
  console.log(`The response data is ${JSON.stringify(response.data)}`);
});
```

## Handling exceptions

All client methods may throw a `PaystackClientError` exception and it makes
sense to gracefully handle those exceptions.

```ts
import {
  type ChargePayload,
  PaystackClient,
  type PaystackResponse,
} from "@gray-adeyi/pastack-sdk";

const client = new PaystackClient(); // assumes your PAYSTACK_SECRET_KEY is set in your environmental variables.
const payload: ChargePayload = {
  email: "johndoe@example.com",
  amount: 1_000_000,
};
client.charge.charge(payload).then(console.log).catch(
  (error: PaystackClientError) => {
    // Handle the error
  },
);

// or using try...catch
try {
  const response = await client.charge.charge(payload);
} catch (e) {
  if ((!e) instanceof PaystackClientError) throw e;
  // Handle the error
}
```
