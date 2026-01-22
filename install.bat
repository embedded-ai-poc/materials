@echo off
setlocal enabledelayedexpansion

echo.
echo   =========================================
echo      Claude Code Statusline Installer
echo   =========================================
echo.

set "CLAUDE_DIR=%USERPROFILE%\.claude"
set "STATUSLINE_DIR=%CLAUDE_DIR%\statusline"
set "SETTINGS_FILE=%CLAUDE_DIR%\settings.json"
set "SOURCE_SCRIPT=%~dp0claude-statusline\statusline.js"

:: Check source file exists
if not exist "%SOURCE_SCRIPT%" (
    echo   [X] statusline.js not found.
    echo       Make sure you're running from the cloned repo folder.
    echo.
    pause
    exit /b 1
)

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
if not exist "%CLAUDE_DIR%" (
    mkdir "%CLAUDE_DIR%"
)
if not exist "%STATUSLINE_DIR%" (
    mkdir "%STATUSLINE_DIR%"
)
echo   [OK] Directory ready

:: Copy statusline script
copy /Y "%SOURCE_SCRIPT%" "%STATUSLINE_DIR%\index.js" >nul
if %errorlevel% neq 0 (
    echo   [X] Failed to copy statusline script.
    pause
    exit /b 1
)
echo   [OK] Copied statusline script

:: Update settings.json
node -e "const fs=require('fs'),p=String.raw`%SETTINGS_FILE%`.replace(/\\/g,'/');let s={};try{let c=fs.readFileSync(p,'utf8');if(c.charCodeAt(0)===0xFEFF)c=c.slice(1);s=JSON.parse(c)}catch{}s.statusLine={type:'command',command:String.raw`node %STATUSLINE_DIR%\index.js`};fs.writeFileSync(p,JSON.stringify(s,null,2))"
echo   [OK] Updated settings.json

echo.
echo   =========================================
echo      Installation Complete!
echo   =========================================
echo.
echo   Restart Claude Code to see the new statusline.
echo.
pause
