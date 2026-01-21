#!/usr/bin/env node
/**
 * Claude Statusline Installer
 * Usage: npx @embedded-ai-poc/claude-statusline install
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const CLAUDE_DIR = path.join(os.homedir(), '.claude');
const STATUSLINE_DIR = path.join(CLAUDE_DIR, 'statusline');
const SETTINGS_FILE = path.join(CLAUDE_DIR, 'settings.json');

const args = process.argv.slice(2);
const command = args[0] || 'install';
const silent = args.includes('--silent');

function log(...msg) {
  if (!silent) console.log(...msg);
}

function install() {
  log('');
  log('  Claude Code Statusline Installer');
  log('  ─────────────────────────────────');
  log('');

  // Create directories
  if (!fs.existsSync(STATUSLINE_DIR)) {
    fs.mkdirSync(STATUSLINE_DIR, { recursive: true });
    log('  ✓ Created', STATUSLINE_DIR);
  }

  // Copy statusline script
  const srcScript = path.join(__dirname, 'statusline.js');
  const destScript = path.join(STATUSLINE_DIR, 'index.js');
  fs.copyFileSync(srcScript, destScript);
  log('  ✓ Installed statusline script');

  // Update settings.json
  let settings = {};
  if (fs.existsSync(SETTINGS_FILE)) {
    try {
      settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
    } catch {}
  }

  const statusLineCmd = process.platform === 'win32'
    ? `node ${STATUSLINE_DIR}\\index.js`
    : `node ${STATUSLINE_DIR}/index.js`;

  settings.statusLine = {
    type: 'command',
    command: statusLineCmd
  };

  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
  log('  ✓ Updated settings.json');

  log('');
  log('  Done! Restart Claude Code to see the new statusline.');
  log('');
  log('  Preview:');
  log('   jambiti:main │  Opus 4.5 │ ◐ 70K/200K ▓▓░░░ 35%  Σ115K');
  log('');
}

function uninstall() {
  log('');
  log('  Uninstalling Claude Code Statusline...');
  log('');

  // Remove statusline from settings
  if (fs.existsSync(SETTINGS_FILE)) {
    try {
      const settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
      delete settings.statusLine;
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
      log('  ✓ Removed statusline from settings');
    } catch {}
  }

  // Remove statusline directory
  if (fs.existsSync(STATUSLINE_DIR)) {
    fs.rmSync(STATUSLINE_DIR, { recursive: true });
    log('  ✓ Removed statusline directory');
  }

  log('');
  log('  Done! Restart Claude Code to apply changes.');
  log('');
}

function showHelp() {
  console.log(`
  Claude Code Statusline

  Usage:
    npx @embedded-ai-poc/claude-statusline <command>

  Commands:
    install     Install statusline (default)
    uninstall   Remove statusline
    help        Show this help

  Options:
    --silent    Suppress output
  `);
}

// Run
switch (command) {
  case 'install':
    install();
    break;
  case 'uninstall':
  case 'remove':
    uninstall();
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    console.log(`Unknown command: ${command}`);
    showHelp();
    process.exit(1);
}
