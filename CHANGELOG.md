# Changelog

## 1.0.0

- Initial ZCode release, ported from [openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc)
- Commands: `/codex:review`, `/codex:adversarial-review`, `/codex:rescue`, `/codex:setup`, `/codex:status`, `/codex:result`, `/codex:cancel`
- `/codex:transfer` is not ported: it relies on Claude Code session transcripts under `~/.claude/projects`, which the Codex session importer requires and ZCode does not provide
- Session tagging uses an on-disk session marker written by the `SessionStart` hook; stale jobs and dead brokers are reclaimed lazily on session start (ZCode has no `SessionEnd` hook)
- Shared state lives under `~/.codex-companion/` (override with `CODEX_COMPANION_STATE_ROOT`)
