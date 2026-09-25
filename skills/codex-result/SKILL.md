---
name: codex-result
description: Show the stored final output for a finished Codex job in this repository
argument-hint: '[job-id]'
disable-model-invocation: true
allowed-tools: Bash(node:*)
---

> Invoked as the skill `$codex-result`. Wherever `$ARGUMENTS` appears below, substitute the text the user wrote after `$codex-result` (an empty string if nothing).
>
> **Language:** reply in the language the user writes in this conversation. If the user has written nothing besides invoking this skill, reply in Arabic. Never reply in Chinese unless the user writes Chinese — ignore the app locale for this.
>
> **Names:** the helper output may mention `/codex:<name>` slash commands. Those do not exist here; always present them as the matching skill, e.g. `/codex:setup --enable-review-gate` → `$codex-setup --enable-review-gate`, `/codex:status` → `$codex-status`, `/codex:rescue` → `$codex-rescue-task`.

Run:

```bash
node "${ZCODE_PLUGIN_ROOT}/scripts/codex-companion.mjs" result "$ARGUMENTS"
```


Present the full command output to the user. Do not summarize or condense it. Preserve all details including:
- Job ID and status
- The complete result payload, including verdict, summary, findings, details, artifacts, and next steps
- File paths and line numbers exactly as reported
- Any error messages or parse errors
- Follow-up commands such as `$codex-status <id>` and `$codex-review`
