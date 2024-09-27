# Step 1: Install UV tool using the provided script
Write-Host "Installing UV tool..."
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Step 2: Install the paystack-cli using UV tool
Write-Host "Installing Paystack CLI via UV tool..."
uv tool install paystack-cli

# Ads
Write-Host ""
Write-Host "Please help increase the popularity of this project and other sister"
Write-Host "projects by giving them a star on GitHub"
Write-Host ""
Write-Host "[CLI] https://github.com/gray-adeyi/paystack-cli"
Write-Host "[SDK:JAVASCIPT(NODE,BUN,DENO)] https://github.com/gray-adeyi/paystack-sdk"
Write-Host "[SDK:PYTHON] https://github.com/gray-adeyi/pypaystack2"
Write-Host "[SDK:GO] https://github.com/gray-adeyi/paystack"
Write-Host "[SDK:DART] https://github.com/gray-adeyi/paystack_dart"
Write-Host ""
Write-Host "Buy me a coffee: https://buymeacoffee.com/jigani"
Write-Host ""

# Notify the user the process is complete
Write-Host "Paystack CLI has been successfully installed."

# Running the script by the user
# powershell -c "irm https://raw.githubusercontent.com/gray-adeyi/paystack-sdk/main/install-cli.ps1 | iex"
