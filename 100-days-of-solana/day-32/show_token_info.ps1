# Day 32: Token Incentive Mechanics - Inspection Runner

Write-Host "=== DAY 32: ReinforceCoin (RFC) ===" -ForegroundColor Magenta
Write-Host ""

$MINT = "ENeWKAxsrTKoYnsVkVUCt7yrD4Y9fUvLAvoDhsWdq3Kb"
$RECIPIENT = "356qc5GSKFodN8jhrLgKuktZwgjrNrhfEgmVzeh52gmb"

Write-Host "--- Mint Display (Metadata + Transfer Fee Extensions) ---" -ForegroundColor Green
spl-token display $MINT

Write-Host "`n--- Token-2022 Accounts (Owner) ---" -ForegroundColor Green
spl-token accounts --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb

Write-Host "`n--- Recipient Balance ---" -ForegroundColor Green
spl-token balance --owner $RECIPIENT $MINT
