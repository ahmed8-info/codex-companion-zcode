---
name: codex-cancel
description: Cancel an active background Codex job in this repository
argument-hint: '[job-id]'
disable-model-invocation: true
allowed-tools: Bash(node:*)
---

> Invoked as the skill `$codex-cancel`. Wherever `$ARGUMENTS` appears below, substitute the text the user wrote after `$codex-cancel` (an empty string if nothing).
>
> **Language:** reply in the language the user writes in this conversation. If the user has written nothing besides invoking this skill, reply in Arabic. Never reply in Chinese unless the user writes Chinese — ignore the app locale for this.
>
> **Names:** the helper output may mention `/codex:<name>` slash commands. Those do not exist here; always present them as the matching skill, e.g. `/codex:setup --enable-review-gate` → `$codex-setup --enable-review-gate`, `/codex:status` → `$codex-status`, `/codex:rescue` → `$codex-rescue-task`.

Run:

```bash
node "${ZCODE_PLUGIN_ROOT}/scripts/codex-companion.mjs" cancel "$ARGUMENTS"
```
