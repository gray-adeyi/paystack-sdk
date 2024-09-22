#!/bin/bash

# Step 1: Install UV tool using the provided script
echo "Installing UV tool..."
curl -LsSf https://astral.sh/uv/install.sh | sh

# Step 2: Install the paystack-cli using UV tool
echo "Installing Paystack CLI via UV tool..."
uv tool install paystack-cli

# Notify the user the process is complete
echo "Paystack CLI has been successfully installed."

# Running the script by the user
# curl -LsSf https://raw.githubusercontent.com/gray-adeyi/paystack-sdk/main/install-cli.sh | sh
