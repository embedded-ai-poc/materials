#Requires -Version 5.1
<#
.SYNOPSIS
    Claude Code Statusline Installer
.DESCRIPTION
    One-line install: iwr -useb https://raw.githubusercontent.com/embedded-ai-poc/materials/master/claude-statusline/install.ps1 | iex
#>

$ErrorActionPreference = "Stop"

$ClaudeDir = Join-Path $env:USERPROFILE ".claude"
$StatuslineDir = Join-Path $ClaudeDir "statusline"
$SettingsFile = Join-Path $ClaudeDir "settings.json"
$ScriptUrl = "https://raw.githubusercontent.com/embedded-ai-poc/materials/master/claude-statusline/statusline.js"

Write-Host ""
Write-Host "  =========================================" -ForegroundColor Cyan
Write-Host "     Claude Code Statusline Installer      " -ForegroundColor Cyan
Write-Host "  =========================================" -ForegroundColor Cyan
Write-Host ""

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

# Download statusline script
$ScriptPath = Join-Path $StatuslineDir "index.js"
try {
    Invoke-WebRequest -Uri $ScriptUrl -OutFile $ScriptPath -UseBasicParsing
    Write-Host "  [OK] Downloaded statusline script" -ForegroundColor Green
} catch {
    Write-Host "  [X] Failed to download script: $_" -ForegroundColor Red
    exit 1
}

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
