---
name: codex-setup
description: Check whether the local Codex CLI is ready and optionally toggle the stop-time review gate
argument-hint: '[--enable-review-gate|--disable-review-gate]'
allowed-tools: Bash(node:*), Bash(npm:*), AskUserQuestion
---

> Invoked as the skill `$codex-setup`. Wherever `$ARGUMENTS` appears below, substitute the text the user wrote after `$codex-setup` (an empty string if nothing).
>
> **Language:** reply in the language the user writes in this conversation. If the user has written nothing besides invoking this skill, reply in Arabic. Never reply in Chinese unless the user writes Chinese — ignore the app locale for this.
>
> **Names:** the helper output may mention `/codex:<name>` slash commands. Those do not exist here; always present them as the matching skill, e.g. `/codex:setup --enable-review-gate` → `$codex-setup --enable-review-gate`, `/codex:status` → `$codex-status`, `/codex:rescue` → `$codex-rescue-task`.

Run:

```bash
node "${ZCODE_PLUGIN_ROOT}/scripts/codex-companion.mjs" setup --json $ARGUMENTS
```


If the result says Codex is unavailable and npm is available:
- Use `AskUserQuestion` exactly once to ask whether ZCode should install Codex now.
- Put the install option first and suffix it with `(Recommended)`.
- Use these two options:
  - `Install Codex (Recommended)`
  - `Skip for now`
- If the user chooses install, run:

```bash
npm install -g @openai/codex
```

- Then rerun:

```bash
node "${ZCODE_PLUGIN_ROOT}/scripts/codex-companion.mjs" setup --json $ARGUMENTS
```

If Codex is already installed or npm is unavailable:
- Do not ask about installation.

Output rules:
- Present the final setup output to the user.
- If installation was skipped, present the original setup output.
- If Codex is installed but not authenticated, preserve the guidance to run `!codex login`.
