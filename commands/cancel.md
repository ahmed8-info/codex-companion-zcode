---
description: Cancel an active background Codex job in this repository
argument-hint: '[job-id]'
disable-model-invocation: true
allowed-tools: Bash(node:*)
---

Run:

```bash
node "${ZCODE_PLUGIN_ROOT}/scripts/codex-companion.mjs" cancel "$ARGUMENTS"
```

If `${ZCODE_PLUGIN_ROOT}` is not available in your environment, replace it with this plugin's installed root directory (the parent of its `commands/` and `scripts/` folders) before running. Present the command output to the user.
