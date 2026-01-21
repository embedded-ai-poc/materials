#!/usr/bin/env node
/**
 * Claude Code Statusline - Compact version
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const c = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  white: '\x1b[97m',
  gray: '\x1b[90m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function getGitInfo(dir) {
  if (!dir) return null;
  let currentDir = dir;
  let gitDir = null;
  for (let i = 0; i < 10; i++) {
    const testGit = path.join(currentDir, '.git');
    try { if (fs.existsSync(testGit)) { gitDir = testGit; break; } } catch {}
    const parent = path.dirname(currentDir);
    if (parent === currentDir) break;
    currentDir = parent;
  }
  if (!gitDir) return null;
  try {
    const head = fs.readFileSync(path.join(gitDir, 'HEAD'), 'utf8').trim();
    const branch = head.startsWith('ref: refs/heads/') ? head.replace('ref: refs/heads/', '') : head.slice(0, 7);
    const repo = path.basename(path.dirname(gitDir));
    let dirty = false;
    try { dirty = execSync('git status --porcelain', { encoding: 'utf8', timeout: 300, stdio: ['pipe', 'pipe', 'pipe'], cwd: dir }).trim().length > 0; } catch {}
    return { repo, branch, dirty };
  } catch { return null; }
}

function fmt(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
  return String(n);
}

function fmtTime(ms) {
  if (!ms || ms <= 0) return null;
  const s = Math.floor(ms / 1000);
  if (s >= 3600) return Math.floor(s / 3600) + 'h' + Math.floor((s % 3600) / 60) + 'm';
  if (s >= 60) return Math.floor(s / 60) + 'm';
  return s + 's';
}

function statusColor(pct, warn = 60, crit = 80) {
  if (pct >= crit) return c.red;
  if (pct >= warn) return c.yellow;
  return c.green;
}

function bar(pct, w = 5) {
  const f = Math.round((pct / 100) * w);
  return '▓'.repeat(f) + '░'.repeat(w - f);
}

let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', d => input += d);
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const parts = [];
    const SEP = ` ${c.gray}│${c.reset} `;

    // Git
    const git = getGitInfo(data.workspace?.current_dir);
    if (git?.branch) {
      const dirty = git.dirty ? `${c.yellow}*${c.reset}` : '';
      parts.push(`${c.white}${git.repo}${c.dim}:${c.reset}${c.green}${git.branch}${c.reset}${dirty}`);
    }

    // Model
    const model = data.model?.display_name;
    if (model) parts.push(`${c.white}${model}${c.reset}`);

    // Context
    const ctx = data.context_window || {};
    const pct = Math.round(ctx.used_percentage || 0);
    const maxCtx = ctx.context_window_size || 200000;
    const curCtx = Math.round(maxCtx * pct / 100);
    const cc = statusColor(pct, 60, 80);
    parts.push(`${cc}${fmt(curCtx)}${c.reset}${c.dim}/${fmt(maxCtx)}${c.reset} ${c.dim}${bar(pct)}${c.reset} ${cc}${pct}%${c.reset}`);

    // Session
    const total = (ctx.total_input_tokens || 0) + (ctx.total_output_tokens || 0);
    parts.push(`${c.dim}Σ${c.reset}${c.white}${fmt(total)}${c.reset}`);

    // Cost
    const cost = data.cost || {};
    if (cost.total_cost_usd > 0) {
      parts.push(`${c.yellow}$${cost.total_cost_usd.toFixed(2)}${c.reset}`);
    }

    // Time
    const timeStr = fmtTime(cost.total_duration_ms);
    if (timeStr) parts.push(`${c.white}${timeStr}${c.reset}`);

    // RAM
    const memPct = Math.round((1 - os.freemem() / os.totalmem()) * 100);
    const mc = statusColor(memPct, 70, 90);
    parts.push(`${c.dim}RAM ${c.reset}${mc}${memPct}%${c.reset}`);

    console.log(parts.join(SEP));
  } catch {
    console.log(`${c.dim}—${c.reset}`);
  }
});
