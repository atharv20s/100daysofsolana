# Day 31: Token-2022 Transfer Fee inspection runner
Write-Host "--- Checking SPL Token-2022 Accounts ---" -ForegroundColor Green
spl-token accounts --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb

Write-Host "`n--- Displaying Token-2022 Transfer Fee Mint Details ---" -ForegroundColor Green
spl-token display m8cQYDKKtG2Gs4Eru8ShszJHLhb4JbNq6gysdJx4Xs8

Write-Host "`n--- Checking First Wallet Token Account (Authority) ---" -ForegroundColor Green
spl-token balance --owner BJpejz8HQwF1TciYZEBD8VGu12wdVQxq3KkcECcT1AiK m8cQYDKKtG2Gs4Eru8ShszJHLhb4JbNq6gysdJx4Xs8

Write-Host "`n--- Checking Second Wallet Token Account (Recipient) ---" -ForegroundColor Green
spl-token balance --owner 356qc5GSKFodN8jhrLgKuktZwgjrNrhfEgmVzeh52gmb m8cQYDKKtG2Gs4Eru8ShszJHLhb4JbNq6gysdJx4Xs8
