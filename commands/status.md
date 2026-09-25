---
description: Show active and recent Codex jobs for this repository, including review-gate status
argument-hint: '[job-id] [--wait] [--timeout-ms <ms>] [--all]'
disable-model-invocation: true
allowed-tools: Bash(node:*)
---

Run:

```bash
node "${ZCODE_PLUGIN_ROOT}/scripts/codex-companion.mjs" status "$ARGUMENTS"
```

If `${ZCODE_PLUGIN_ROOT}` is not available in your environment, replace it with this plugin's installed root directory (the parent of its `commands/` and `scripts/` folders) before running.

If the user did not pass a job ID:
- Render the command output as a single Markdown table for the current and past runs in this session.
- Keep it compact. Do not include progress blocks or extra prose outside the table.
- Preserve the actionable fields from the command output, including job ID, kind, status, phase, elapsed or duration, summary, and follow-up commands.

If the user did pass a job ID:
- Present the full command output to the user.
- Do not summarize or condense it.
