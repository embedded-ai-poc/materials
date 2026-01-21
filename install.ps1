#Requires -Version 5.1
# Claude Code Statusline Installer
# Usage: .\install.ps1

$ErrorActionPreference = "Stop"

$ClaudeDir = Join-Path $env:USERPROFILE ".claude"
$StatuslineDir = Join-Path $ClaudeDir "statusline"
$SettingsFile = Join-Path $ClaudeDir "settings.json"
$SourceScript = Join-Path $PSScriptRoot "claude-statusline\statusline.js"

Write-Host ""
Write-Host "  =========================================" -ForegroundColor Cyan
Write-Host "     Claude Code Statusline Installer      " -ForegroundColor Cyan
Write-Host "  =========================================" -ForegroundColor Cyan
Write-Host ""

# Check source file exists
if (-not (Test-Path $SourceScript)) {
    Write-Host "  [X] statusline.js not found." -ForegroundColor Red
    Write-Host "      Make sure you're running from the cloned repo folder." -ForegroundColor Gray
    exit 1
}

# Check Node.js
try {
    $null = Get-Command node -ErrorAction Stop
    Write-Host "  [OK] Node.js found" -ForegroundColor Green
} catch {
    Write-Host "  [X] Node.js not found. Please install Node.js first." -ForegroundColor Red
    Write-Host "      https://nodejs.org/" -ForegroundColor Gray
    exit 1
}

# Create directories
if (-not (Test-Path $StatuslineDir)) {
    New-Item -ItemType Directory -Force -Path $StatuslineDir | Out-Null
}
Write-Host "  [OK] Directory ready" -ForegroundColor Green

# Copy statusline script
Copy-Item -Path $SourceScript -Destination (Join-Path $StatuslineDir "index.js") -Force
Write-Host "  [OK] Copied statusline script" -ForegroundColor Green

# Update settings.json
$StatuslineCmd = "node $StatuslineDir\index.js"

if (Test-Path $SettingsFile) {
    try {
        $settings = Get-Content $SettingsFile -Raw | ConvertFrom-Json
    } catch {
        $settings = @{}
    }
} else {
    $settings = @{}
}

if ($settings -is [PSCustomObject]) {
    $hash = @{}
    $settings.PSObject.Properties | ForEach-Object { $hash[$_.Name] = $_.Value }
    $settings = $hash
}

$settings["statusLine"] = @{
    type = "command"
    command = $StatuslineCmd
}

$settings | ConvertTo-Json -Depth 10 | Set-Content $SettingsFile -Encoding UTF8
Write-Host "  [OK] Updated settings.json" -ForegroundColor Green

Write-Host ""
Write-Host "  =========================================" -ForegroundColor Green
Write-Host "     Installation Complete!                " -ForegroundColor Green
Write-Host "  =========================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Restart Claude Code to see the new statusline." -ForegroundColor Yellow
Write-Host ""
