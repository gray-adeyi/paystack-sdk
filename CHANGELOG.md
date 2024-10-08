# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
with the exception of the ISO date format (I find myself trying too hard to guess the months)

## [Unreleased]

## [0.1.4] - 28-Sep-2024

### Added

- Test all clients
- Add more docs to github pages

### Fixed

- `perPage` option param not working as a result of case transformation
- `PaystackClient.paymentPage.addProducts` sends wrong payload
- `PaystackClient.paymentRequest.getPaymentRequests` fails as a result of using wrong HTTP verb.
- Export missing types for transaction

### Changed

- Make `name` and `description` params optional in `UpdatePaymentPagePayload`
- Rename `ChargePayload` for transactions to `TransactionChargePayload` as a result of conflicting name with charge payload
- `TransactionChargePayload` `authCode` param to `authorizationCode`


## [0.1.3] - 22-Sep-2024

### Added

- Export `PaystackClientError` thrown by all client methods
- CLI install scripts

### Changed

- `ValidatePayload.identificationType` to `ValidatePayload.type`
- `SubmitAddressPayload.zipcode` to `SubmitAddressPayload.zipCode`
- `PaystackClient.customers.deactivate` param `authCode` to `authorizationCode`

### Fixed

- `PaystackClient.charge.submitOtp` hitting the wrong endpoint

## [0.1.2] - 18-Sep-2024

### Added

- Documentation for package types

### Changed

- Update package dependencies

## [0.1.1] - 06-Sep-2024

### Added

- Documentation for enum types
- Documentation for `PaystackClient`

### Fixed

- Error in `PaystackClient.miscellaneous.getBanks`
- Broken links in readme

## [0.1.0] - 06-Sep-2024

### Added

- `PaystackClient`
- All other sub-clients that are bound to the `PaystackClient`
- Test files for all sub-clients
- `FUNDING.yml`
- Github pages doc
- Documentation for all the sub-client classes

[unreleased]: https://github.com/gray-adeyi/paystack-sdk/compare/v0.1.4...HEAD
[0.1.4]: https://github.com/gray-adeyi/paystack-sdk/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/gray-adeyi/paystack-sdk/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/gray-adeyi/paystack-sdk/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/gray-adeyi/paystack-sdk/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/gray-adeyi/paystack-sdk/releases/tag/v0.1.0

