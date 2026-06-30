# Day 29: Token economics inspection runner
Write-Host "--- Checking SPL Token Accounts ---" -ForegroundColor Green
spl-token accounts

Write-Host "`n--- Displaying Token Mint Details ---" -ForegroundColor Green
spl-token display 4CJNn9zFx3Z9v27edeVSgWyJE6M7qwwatG8wJ1ZEijby

Write-Host "`n--- Checking Total Supply ---" -ForegroundColor Green
spl-token supply 4CJNn9zFx3Z9v27edeVSgWyJE6M7qwwatG8wJ1ZEijby
