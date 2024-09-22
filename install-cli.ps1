# Step 1: Install UV tool using the provided script
Write-Host "Installing UV tool..."
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Step 2: Install the paystack-cli using UV tool
Write-Host "Installing Paystack CLI via UV tool..."
uv tool install paystack-cli

# Notify the user the process is complete
Write-Host "Paystack CLI has been successfully installed."

# Running the script by the user
# powershell -c "irm https://raw.githubusercontent.com/gray-adeyi/paystack-sdk/main/install-cli.ps1 | iex"
