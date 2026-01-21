@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul 2>&1

echo.
echo   ┌─────────────────────────────────────────┐
echo   │   Claude Code Statusline Installer      │
echo   └─────────────────────────────────────────┘
echo.

set "CLAUDE_DIR=%USERPROFILE%\.claude"
set "STATUSLINE_DIR=%CLAUDE_DIR%\statusline"
set "SETTINGS_FILE=%CLAUDE_DIR%\settings.json"
set "SCRIPT_URL=https://raw.githubusercontent.com/embedded-ai-poc/materials/master/claude-statusline/statusline.js"

:: Check Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo   [X] Node.js not found. Please install Node.js first.
    echo       https://nodejs.org/
    echo.
    pause
    exit /b 1
)
echo   [OK] Node.js found

:: Create directories
if not exist "%STATUSLINE_DIR%" (
    mkdir "%STATUSLINE_DIR%"
)
echo   [OK] Directory ready

:: Download statusline script
echo   [..] Downloading statusline script...
powershell -Command "Invoke-WebRequest -Uri '%SCRIPT_URL%' -OutFile '%STATUSLINE_DIR%\index.js' -UseBasicParsing" >nul 2>&1
if %errorlevel% neq 0 (
    echo   [X] Download failed. Check your internet connection.
    pause
    exit /b 1
)
echo   [OK] Downloaded statusline script

:: Update settings.json
node -e "const fs=require('fs'),p='%SETTINGS_FILE%'.replace(/\\/g,'/');let s={};try{s=JSON.parse(fs.readFileSync(p,'utf8'))}catch{}s.statusLine={type:'command',command:'node %STATUSLINE_DIR%\\index.js'.replace(/\\/g,'\\\\')};fs.writeFileSync(p,JSON.stringify(s,null,2))"
echo   [OK] Updated settings.json

echo.
echo   ┌─────────────────────────────────────────┐
echo   │   Installation Complete!                │
echo   └─────────────────────────────────────────┘
echo.
echo   Restart Claude Code to see the new statusline.
echo.
pause
