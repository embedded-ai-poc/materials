@echo off
setlocal enabledelayedexpansion

echo.
echo   Claude Code Statusline Installer
echo   ---------------------------------
echo.

set "CLAUDE_DIR=%USERPROFILE%\.claude"
set "STATUSLINE_DIR=%CLAUDE_DIR%\statusline"
set "SETTINGS_FILE=%CLAUDE_DIR%\settings.json"

:: Create directories
if not exist "%STATUSLINE_DIR%" (
    mkdir "%STATUSLINE_DIR%"
    echo   + Created %STATUSLINE_DIR%
)

:: Copy statusline script
copy /Y "%~dp0statusline.js" "%STATUSLINE_DIR%\index.js" >nul
echo   + Installed statusline script

:: Update settings.json
if exist "%SETTINGS_FILE%" (
    :: Backup existing settings
    copy /Y "%SETTINGS_FILE%" "%SETTINGS_FILE%.backup" >nul
)

:: Create or update settings with statusLine
node -e "const fs=require('fs'),p='%SETTINGS_FILE%'.replace(/\\/g,'/');let s={};try{s=JSON.parse(fs.readFileSync(p,'utf8'))}catch{}s.statusLine={type:'command',command:'node %STATUSLINE_DIR%\\index.js'.replace(/\\/g,'\\\\')};fs.writeFileSync(p,JSON.stringify(s,null,2))"

if %errorlevel% neq 0 (
    echo   ! Node.js required. Please install Node.js first.
    pause
    exit /b 1
)

echo   + Updated settings.json
echo.
echo   Done! Restart Claude Code to see the new statusline.
echo.
echo   Preview:
echo    jambiti:main ^|  Opus 4.5 ^| circled 70K/200K ^^^^░░░ 35%%  Sigma115K
echo.
pause
