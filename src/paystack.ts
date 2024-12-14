import ApplePayClient from "./clients/applePay.ts";
import BulkChargeClient from "./clients/bulkCharge.ts";
import ChargeClient from "./clients/charge.ts";
import CustomerClient from "./clients/customer.ts";
import DedicatedAccountClient from "./clients/dedicatedAccounts.ts";
import DisputeClient from "./clients/disputes.ts";
import IntegrationClient from "./clients/integration.ts";
import MiscellaneousClient from "./clients/miscellaneous.ts";
import PaymentPageClient from "./clients/paymentPages.ts";
import PaymentRequestClient from "./clients/paymentRequest.ts";
import PlanClient from "./clients/plan.ts";
import ProductClient from "./clients/products.ts";
import RefundClient from "./clients/refund.ts";
import SettlementClient from "./clients/settlements.ts";
import SubAccountClient from "./clients/subAccount.ts";
import SubscriptionClient from "./clients/subscriptions.ts";
import TerminalClient from "./clients/terminals.ts";
import TransactionClient from "./clients/transactions.ts";
import TransactionSplitClient from "./clients/transactionSplit.ts";
import TransferRecipientClient from "./clients/transferRecipient.ts";
import TransferClient from "./clients/transfers.ts";
import TransferControlClient from "./clients/transfersControl.ts";
import VerificationClient from "./clients/verification.ts";
import RestClient from "./restClient.ts";

const SECRET_KEY_PREFIX = "sk_test_";

const PACKAGE_DEV_MODE_MESSAGE = `
💪🏽 "Paystack Integration powered by @gray-adeyi/paystack-sdk 0.2.4"🔥

Need more guide on how to use this package?
See documentation at https://gray-adeyi.github.io/paystack-sdk

Found a bug?
Create an issue for it at https://github.com/gray-adeyi/paystack-sdk/issues

If this project is useful to you or your company, please consider sponsoring the project by
- 🧑🏻‍🤝‍🧑 Sharing it with your developer friends
- ✨ Starring it on github at https://github.com/gray-adeyi/paystack-sdk
- 💻 Contribute to it at https://github.com/gray-adeyi/paystack-sdk
- ☕ Buy me a coffee at https://buymeacoffee.com/jigani 

Note: This message only appears in dev mode. 
Set "disablePackageDevModeMessage" flag to true on instantiation
of PaystackClient to stop seeing this message.
`;

/**
 * PaystackClient has other dedicated clients bound to it. This provides a convenience for interacting
 * with all of paystack's endpoints in your JS/TS project. As stated above, it has other dedicated clients bound to it as
 * class properties, therefore, after creating an instance of PaystackClient. You can access the associated
 * methods of each dedicated client via its property name. e.g.to get supported banks, you access the `getBanks`
 * method of the `MiscellaneousClient` via the `miscellaneous` property. i.e. `paystackClientInstance.miscellaneous.getBanks`.
 * To create a new customer on your integration, you access the `create` method of the `CustomerClient` via the `customers`
 * property. i.e. `paystackClientInstance.customers.create`.
 */
export default class PaystackClient {
  private readonly client: RestClient;
  /**
   * applePay is a binding to the {@link ApplePayClient} that lets you interact with endpoints
   * related to paystack Apple Pay resource that lets you register your application's
   * top-level domain or subdomain. It provides methods that maps to all the endpoints
   * in the Paystack's ApplePay API reference.
   * @see https://paystack.com/docs/api/apple-pay/
   */
  readonly applePay: ApplePayClient;
  /**
   * bulkCharges is a binding to the {@link BulkChargeClient} that lets you interact with endpoints
   * related to paystack bulk Charges resource that lets you create and manage multiple
   * recurring payments from your Customers. It provides methods that maps to all the
   * endpoints in the Paystack's Bulk Charge API reference.
   * @see https://paystack.com/docs/api/bulk-charge/
   */
  readonly bulkCharges: BulkChargeClient;
  /**
   * charge is a binding to the {@link ChargeClient} that lets you interact with endpoints related
   * to paystack charge resource that lets you configure a payment channel of your choice
   * when initiating a payment. It provides methods that maps to all the endpoints in the
   * Paystack's Charge API reference. @see https://paystack.com/docs/api/charge/
   */
  readonly charge: ChargeClient;
  /**
   * integration is a binding to the {@link IntegrationClient} that lets you interact with endpoints
   * related to paystack Integration resource that lets you manage some settings on your Integration.
   * It provides methods that maps to all the endpoints in the Paystack's Integration API reference.
   * @see https://paystack.com/docs/api/integration/
   */
  readonly integration: IntegrationClient;
  /**
   * customers is a binding to the {@link CustomerClient} that lets you interact with endpoints related to
   * Paystack's Customer resource that allows you to create and manage Customers on your Integration.
   * It provides methods that maps to all the endpoints in the Paystack's Customer API reference.
   * @see https://paystack.com/docs/api/customer/
   */
  readonly customers: CustomerClient;
  /**
   * dedicatedAccounts is a binding to the {@link DedicatedAccountClient} that lets you interact with endpoints
   * related to paystack dedicated virtual account resource that enables Nigerian merchants to
   * manage unique payment accounts of their Customers. It provides methods that maps to all the
   * endpoints in the Paystack's Dedicated Virtual Accounts API reference.
   * @see https://paystack.com/docs/api/dedicated-virtual-account/
   */
  readonly dedicatedAccounts: DedicatedAccountClient;
  /**
   * disputes is a binding to the {@link DisputeClient} that lets you interact with endpoint
   * related to paystack dispute resource that lets you manage transaction Disputes on
   * your Integration. It provides methods that maps to all the endpoints in the Paystack's
   * Dispute API reference. @see https://paystack.com/docs/api/dispute/
   */
  readonly disputes: DisputeClient;
  /**
   * paymentRequests is a binding to the {@link PaymentRequestClient} that lets you interacts with endpoints
   * related to paystack payment request resource that lets you manage requests for payment of goods
   * and services. It provides methods that maps to all the endpoints in the Paystack's Payment
   * Request API reference.
   * @see https://paystack.com/docs/api/payment-request/
   */
  readonly paymentRequests: PaymentRequestClient;
  /**
   * miscellaneous is a binding to the {@link MiscellaneousClient} that lets you interact with endpoints
   * related to paystack Miscellaneous resource that provides information that is relevant to
   * other client methods. It provides methods that maps to all the endpoints in the Paystack's
   * Miscellaneous API reference. @see https://paystack.com/docs/api/miscellaneous/
   */
  readonly miscellaneous: MiscellaneousClient;
  /**
   * paymentPages is a binding to the {@link PaymentPageClient} that lets you interact with endpoints
   * related to paystack payment page resource that lets you provide a quick and secure way
   * to collect payment for Products. It provides methods that maps to all the endpoints
   * in the Paystack's Payment Pages API reference
   * @see https://paystack.com/docs/api/page/
   */
  readonly paymentPages: PaymentPageClient;
  /**
   * plans is a binding to the {@link PlanClient} that lets you interact with endpoints related
   * to paystack plan resource that lets you create and manage installment payment
   * options on your Integration. It provides methods that maps to all the endpoints
   * in the Paystack's Plans API reference.
   * @see https://paystack.com/docs/api/plan/
   */
  readonly plans: PlanClient;
  /**
   * products is a binding to the {@link ProductClient} that lets you interact with endpoints
   * related to paystack product resource that allows you to create and manage inventories
   * on your Integration. It provides methods that maps to all the endpoint in the Paystack's
   * Product API reference.
   * @see https://paystack.com/docs/api/product/
   */
  readonly products: ProductClient;
  /**
   * refunds is a binding to the {@link RefundClient} that lets you interact with endpoints related
   * to paystack refund resource that lets you create and manage transaction Refunds.
   * It provides methods that maps to all the endpoint in the Paystack's Refund API
   * reference. @see https://paystack.com/docs/api/refund/
   */
  readonly refunds: RefundClient;
  /**
   * settlements is a binding to the {@link SettlementClient} that lets you interact with endpoints
   * related to paystack settlement resource that lets you gain insights into payouts made
   * by Paystack to your bank account. It provides methods that maps to all endpoints in the
   * Paystack's Settlement API reference.
   * @see https://paystack.com/docs/api/settlement/
   */
  readonly settlements: SettlementClient;
  /**
   * splits is a binding to the {@link TransactionSplitClient} that lets you interact with endpoints
   * related to Paystack's Transaction Split resource that allows you to split the settlement
   * for a transaction across a payout account, and one or more subaccounts. It provides
   * methods that maps to all the endpoints in the Paystack's Transaction Split API reference.
   * @see https://paystack.com/docs/api/split/
   */
  readonly splits: TransactionSplitClient;
  /**
   * subAccounts is a biding to the {@link SubAccountClient} that lets you interact with endpoints
   * related to paystack subaccount resource that lets you create and manage subaccounts
   * on your Integration. Subaccounts can be used to split payment between two accounts
   * (your main account and a subaccount). It provides methods that maps to all the
   * endpoints in the Paystack's Subaccount API reference.
   * @see https://paystack.com/docs/api/subaccount/
   */
  readonly subAccounts: SubAccountClient;
  /**
   * subscriptions is a binding to the {@link SubscriptionClient} lets you interact with endpoints
   * related to paystack subscription resource that lets you create and manage recurring
   * payment on your Integration. It provides methods that maps to all the endpoints in
   * the Paystack's Subscription API reference.
   * @see https://paystack.com/docs/api/subscription/
   */
  readonly subscriptions: SubscriptionClient;
  /**
   * terminals is a binding to the {@link TerminalClient} that let you interact with endpoints
   * related to Paystack's Terminal resource that allows you to build delightful in-person
   * payment experiences. It provides methods that maps to all the endpoints in Paystack's
   * Terminals API reference. @see https://paystack.com/docs/api/terminal/
   */
  readonly terminals: TerminalClient;
  /**
   * transactions is a binding to the {@link TransactionClient} that lets you interact with endpoints
   * related to Paystack's Transaction resource that allows you to create and manage payments
   * on your Integration. It provides methods that maps to all the endpoints in paystack's
   * Transaction API reference. @see https://paystack.com/docs/api/transaction/
   */
  readonly transactions: TransactionClient;
  /**
   * transferRecipients is a binding to the {@link TransferRecipientClient} that lets you interact
   * with endpoints related to paystack transfer recipient resource that lets you create
   * and manage beneficiaries that you send money to. It provides methods that maps to all
   * the endpoints in Paystack's Transfer Recipients API reference.
   * @see https://paystack.com/docs/api/transfer-recipient/
   */
  readonly transferRecipients: TransferRecipientClient;
  /**
   * transfers is a binding to the {@link TransferClient} that lets you interact with endpoints
   * related to paystack transfer resource that lets you automate sending money to your
   * Customers. It provides methods that maps to all the endpoints in Paystack's
   * Transfers API reference. @see https://paystack.com/docs/api/transfer/
   */
  readonly transfers: TransferClient;
  /**
   * transferControl is a binding to the {@link TransferControlClient} that lets you interact with
   * endpoints related to paystack transfer control resource that lets you manage settings
   * of your Transfers. It provides methods that maps to all endpoints in the Paystack's
   * Transfer Control API reference. @see https://paystack.com/docs/api/transfer-control/
   */
  readonly transferControl: TransferControlClient;
  /**
   * verification is a binding to the {@link VerificationClient} that lets you interact with
   * endpoints related to paystack Verification resource that allows you to perform
   * KYC processes. It provides methods that maps to all endpoints in the Paystack's
   * Verification API reference. @see https://paystack.com/docs/api/verification/
   */
  readonly verification: VerificationClient;

  constructor(
    secretKey?: string,
    client?: RestClient,
    disablePackageDevModeMessage = false,
  ) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }

    this.applePay = new ApplePayClient(undefined, this.client);
    this.bulkCharges = new BulkChargeClient(undefined, this.client);
    this.charge = new ChargeClient(undefined, this.client);
    this.integration = new IntegrationClient(undefined, this.client);
    this.customers = new CustomerClient(undefined, this.client);
    this.dedicatedAccounts = new DedicatedAccountClient(undefined, this.client);
    this.disputes = new DisputeClient(undefined, this.client);
    this.paymentRequests = new PaymentRequestClient(undefined, this.client);
    this.miscellaneous = new MiscellaneousClient(undefined, this.client);
    this.paymentPages = new PaymentPageClient(undefined, this.client);
    this.plans = new PlanClient(undefined, this.client);
    this.products = new ProductClient(undefined, this.client);
    this.refunds = new RefundClient(undefined, this.client);
    this.settlements = new SettlementClient(undefined, this.client);
    this.splits = new TransactionSplitClient(undefined, this.client);
    this.subAccounts = new SubAccountClient(undefined, this.client);
    this.subscriptions = new SubscriptionClient(undefined, this.client);
    this.terminals = new TerminalClient(undefined, this.client);
    this.transactions = new TransactionClient(undefined, this.client);
    this.transferRecipients = new TransferRecipientClient(
      undefined,
      this.client,
    );
    this.transfers = new TransferClient(undefined, this.client);
    this.transferControl = new TransferControlClient(undefined, this.client);
    this.verification = new VerificationClient(undefined, this.client);
    this.showPackageMessage(disablePackageDevModeMessage, secretKey);
  }

  private showPackageMessage(
    disablePackageMessage: boolean,
    secretKey?: string,
  ) {
    if (!this.isUsingTestSecretKey(secretKey) || disablePackageMessage) return;
    console.log(PACKAGE_DEV_MODE_MESSAGE);
  }

  private isUsingTestSecretKey(secretKey?: string) {
    if (secretKey) return secretKey.startsWith(SECRET_KEY_PREFIX);
    return Deno.env.get(RestClient.ENV_SECRET_KEY_NAME)?.startsWith(
      SECRET_KEY_PREFIX,
    ) || false;
  }
}
