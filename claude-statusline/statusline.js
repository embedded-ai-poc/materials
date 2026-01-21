#!/usr/bin/env node
/**
 * Claude Code Statusline
 * Clean design with clear labels for each section
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

// ─────────────────────────────────────────────────────────────
// ANSI Colors
// ─────────────────────────────────────────────────────────────
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  white: '\x1b[97m',
  gray: '\x1b[90m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
};

// ─────────────────────────────────────────────────────────────
// Icons (Nerd Font)
// ─────────────────────────────────────────────────────────────
const icon = {
  git: '',
  model: '',
  ctx: '◐',
  cost: '',
  time: '',
  mem: '󰍛',
  sep: '│',
};

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
function getGitInfo(dir) {
  if (!dir) return null;

  let currentDir = dir;
  let gitDir = null;

  for (let i = 0; i < 10; i++) {
    const testGit = path.join(currentDir, '.git');
    try {
      if (fs.existsSync(testGit)) {
        gitDir = testGit;
        break;
      }
    } catch {}
    const parent = path.dirname(currentDir);
    if (parent === currentDir) break;
    currentDir = parent;
  }

  if (!gitDir) return null;

  try {
    const headContent = fs.readFileSync(path.join(gitDir, 'HEAD'), 'utf8').trim();
    const branch = headContent.startsWith('ref: refs/heads/')
      ? headContent.replace('ref: refs/heads/', '')
      : headContent.slice(0, 7);
    const repo = path.basename(path.dirname(gitDir));

    let dirty = false;
    try {
      const opts = { encoding: 'utf8', timeout: 300, stdio: ['pipe', 'pipe', 'pipe'], cwd: dir };
      dirty = execSync('git status --porcelain', opts).trim().length > 0;
    } catch {}

    return { repo, branch, dirty };
  } catch {
    return null;
  }
}

function fmt(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
  return String(n);
}

function fmtCost(usd) {
  if (!usd || usd <= 0) return null;
  return '$' + usd.toFixed(2);
}

function fmtTime(ms) {
  if (!ms || ms <= 0) return null;
  const s = Math.floor(ms / 1000);
  if (s >= 3600) return Math.floor(s / 3600) + 'h' + Math.floor((s % 3600) / 60) + 'm';
  if (s >= 60) return Math.floor(s / 60) + 'm' + (s % 60) + 's';
  return s + 's';
}

function getMemoryUsage() {
  const total = os.totalmem();
  const free = os.freemem();
  const used = total - free;
  const pct = Math.round((used / total) * 100);
  const usedGB = (used / 1e9).toFixed(0);
  const totalGB = (total / 1e9).toFixed(0);
  return { pct, usedGB, totalGB };
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

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────
let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', d => input += d);
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const parts = [];
    const SEP = ` ${c.gray}${icon.sep}${c.reset} `;

    // ─── 1. Git: repo:branch ───
    const git = getGitInfo(data.workspace?.current_dir);
    if (git?.branch) {
      const dirty = git.dirty ? `${c.yellow}*${c.reset}` : '';
      parts.push(
        `${c.cyan}${icon.git}${c.reset} ` +
        `${c.white}${git.repo}${c.reset}` +
        `${c.dim}:${c.reset}` +
        `${c.green}${git.branch}${c.reset}${dirty}`
      );
    }

    // ─── 2. Model ───
    const model = data.model?.display_name;
    if (model) {
      parts.push(`${c.blue}${icon.model}${c.reset} ${c.white}${model}${c.reset}`);
    }

    // ─── 3. Context Window ───
    const ctx = data.context_window || {};
    const pct = Math.round(ctx.used_percentage || 0);
    const maxCtx = ctx.context_window_size || 200000;
    const curCtx = Math.round(maxCtx * pct / 100);
    const totalSession = (ctx.total_input_tokens || 0) + (ctx.total_output_tokens || 0);
    const ctxColor = statusColor(pct, 60, 80);

    parts.push(
      `${c.dim}${icon.ctx} Ctx${c.reset} ` +
      `${ctxColor}${fmt(curCtx)}${c.reset}` +
      `${c.dim}/${fmt(maxCtx)}${c.reset} ` +
      `${c.dim}${bar(pct)}${c.reset} ` +
      `${ctxColor}${pct}%${c.reset}`
    );

    // ─── 4. Session Total ───
    parts.push(
      `${c.dim}Σ Session${c.reset} ` +
      `${c.white}${fmt(totalSession)}${c.reset}`
    );

    // ─── 5. Cost ───
    const cost = data.cost || {};
    const costStr = fmtCost(cost.total_cost_usd);
    if (costStr) {
      parts.push(
        `${c.dim}${icon.cost} Cost${c.reset} ` +
        `${c.yellow}${costStr}${c.reset}`
      );
    }

    // ─── 6. Time ───
    const timeStr = fmtTime(cost.total_duration_ms);
    if (timeStr) {
      parts.push(
        `${c.dim}${icon.time} Time${c.reset} ` +
        `${c.white}${timeStr}${c.reset}`
      );
    }

    console.log(parts.join(SEP));
  } catch {
    console.log(`${c.dim}—${c.reset}`);
  }
});
