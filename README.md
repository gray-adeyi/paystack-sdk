# @gray-adeyi/paystack-sdk

A paystack client SDK for the javascript runtime.

## Features

- Built in typescript
- Implements methods matching all of paystack's public API.
- Automatic case transformation of payload and response data keys for a more
  optimal JS/TS experience

## Installation

#### **Npm**

```bash
npm i @gray-adeyi/paystack-sdk
```

#### **Yarn**

```bash
yarn add @gray-adeyi/paystack-sdk
```

#### **Pnpm**

```bash
pnpm i @gray-adeyi/paystack-sdk
```

#### **Bun**

```bash
bun add @gray-adeyi/paystack-sdk
```

#### **Deno**

```bash
deno add @gray-adeyi/paystack-sdk
```

## Usage

`PaystackClient` from the `@gray-adeyi/paystack-sdk` package provides all that
you need to interface with paystack in your JS/TS project. it provides
properties to other clients that models how the official
[paystack api reference](https://paystack.com/docs/api/) is structured. i.e.
`PaystackClient.miscellaneous` provides methods to match all endpoints in
[https://paystack.com/docs/api/miscellaneous/](https://paystack.com/docs/api/miscellaneous/).
so `PaystackClient.miscellaneous.getBanks` mirrors the
[List Banks](https://paystack.com/docs/api/miscellaneous/#bank) endpoint. All
client methods return a promise containing a `PaystackResponse` which is
essentially an object containing the following as it's properties.
`statusCode`,`status`, `message` and `data`. The keys of the data are
transformed internally from snake case to camelCase for a more friendly
experience.

```ts
import {
  type ChargePayload,
  Country,
  PaystackClient,
  type PaystackResponse,
} from "@gray-adeyi/paystack-sdk";

// assumes your PAYSTACK_SECRET_KEY is set in your environmental
// variables. Your secret key can be passed in explicitly on the
// instantiation with overrides the secret key set in the environmental
// variables.
const client = new PaystackClient();
client.miscellaneous.getBanks({ country: Country.NIGERIA }).then(
  (response: PaystackResponse) => {
    console.log(`The response status code is ${response.statusCode}`);
    console.log(`The response status is ${response.status}`);
    console.log(`The response message is ${response.message}`);
    console.log(`The response data is ${JSON.stringify(response.data)}`);
  },
);

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

See the Project's [Documentation](https://gray-adeyi.github.io/paystack-sdk) for
more

## Limitations

- Currently, @gray-adeyi/paystack-sdk does not perform any form of validation on
  the data passed in as method parameters but sends them as is to paystack
  servers.
- Limited documentation

## Sponsorship

Every little donation goes a long way. You can also give this project a star in
its Github repository it helps ♥️

- [Star on Github](https://www.github.com/gray-adeyi/paystack-sdk)
- [Buy me a coffee](https://www.buymeacoffee.com/jigani)

## Contributing

You might encounter bugs while using this project or have feature enhancements
you'd like to share with the project. Create an issue on the project's
[github](https://www.github.com/gray-adeyi/paystack-sdk) page.
