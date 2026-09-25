---
name: codex-status
description: Show active and recent Codex jobs for this repository, including review-gate status
argument-hint: '[job-id] [--wait] [--timeout-ms <ms>] [--all]'
disable-model-invocation: true
allowed-tools: Bash(node:*)
---

> Invoked as the skill `$codex-status`. Wherever `$ARGUMENTS` appears below, substitute the text the user wrote after `$codex-status` (an empty string if nothing).
>
> **Language:** reply in the language the user writes in this conversation. If the user has written nothing besides invoking this skill, reply in Arabic. Never reply in Chinese unless the user writes Chinese — ignore the app locale for this.
>
> **Names:** the helper output may mention `/codex:<name>` slash commands. Those do not exist here; always present them as the matching skill, e.g. `/codex:setup --enable-review-gate` → `$codex-setup --enable-review-gate`, `/codex:status` → `$codex-status`, `/codex:rescue` → `$codex-rescue-task`.

Run:

```bash
node "${ZCODE_PLUGIN_ROOT}/scripts/codex-companion.mjs" status "$ARGUMENTS"
```


If the user did not pass a job ID:
- Render the command output as a single Markdown table for the current and past runs in this session.
- Keep it compact. Do not include progress blocks or extra prose outside the table.
- Preserve the actionable fields from the command output, including job ID, kind, status, phase, elapsed or duration, summary, and follow-up commands.

If the user did pass a job ID:
- Present the full command output to the user.
- Do not summarize or condense it.
