#!/bin/bash

# Step 1: Install UV tool using the provided script
echo "Installing UV tool..."
curl -LsSf https://astral.sh/uv/install.sh | sh

# Step 2: Install the paystack-cli using UV tool
echo "Installing Paystack CLI via UV tool..."
uv tool install paystack-cli

# Ads
echo ""
echo "Please help increase the popularity of this project and other sister"
echo "projects by giving them a star on GitHub"
echo ""
echo "[CLI] https://github.com/gray-adeyi/paystack-cli"
echo "[SDK:JAVASCIPT(NODE,BUN,DENO)] https://github.com/gray-adeyi/paystack-sdk"
echo "[SDK:PYTHON] https://github.com/gray-adeyi/pypaystack2"
echo "[SDK:GO] https://github.com/gray-adeyi/paystack"
echo "[SDK:DART] https://github.com/gray-adeyi/paystack_dart"
echo ""
echo "Buy me a coffee: https://buymeacoffee.com/jigani"
echo ""

# Notify the user the process is complete
echo "Paystack CLI has been successfully installed."

# Running the script by the user
# curl -LsSf https://raw.githubusercontent.com/gray-adeyi/paystack-sdk/main/install-cli.sh | sh
