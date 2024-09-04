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

export default class PaystackClient {
  private readonly client: RestClient;
  readonly applePay: ApplePayClient;
  readonly bulkCharges: BulkChargeClient;
  readonly charge: ChargeClient;
  readonly integration: IntegrationClient;
  readonly customers: CustomerClient;
  readonly dedicatedAccounts: DedicatedAccountClient;
  readonly disputes: DisputeClient;
  readonly paymentRequests: PaymentRequestClient;
  readonly miscellaneous: MiscellaneousClient;
  readonly paymentPages: PaymentPageClient;
  readonly plans: PlanClient;
  readonly products: ProductClient;
  readonly refunds: RefundClient;
  readonly settlements: SettlementClient;
  readonly splits: TransactionSplitClient;
  readonly subAccounts: SubAccountClient;
  readonly subscriptions: SubscriptionClient;
  readonly terminals: TerminalClient;
  readonly transactions: TransactionClient;
  readonly transferRecipients: TransferRecipientClient;
  readonly transfers: TransferClient;
  readonly transferControl: TransferControlClient;
  readonly verification: VerificationClient;

  constructor(secretKey?: string, client?: RestClient) {
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
  }
}
