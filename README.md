# Codex Companion for ZCode

Use OpenAI Codex directly from inside **ZCode** to perform automated code reviews, adversarial security audits, and delegate complex coding tasks.

Developed and maintained by **[Ahmed Mahmoud](https://github.com/ahmed8-info)**.

---

## 🌟 Features

- **Code Review (`/codex:review` / `$codex-review`)**:
  Performs native code reviews against local git state (working tree, staged changes, or target base branches). Supports both foreground execution and non-blocking background tasks.

- **Adversarial Review (`/codex:adversarial-review` / `$codex-adversarial-review`)**:
  A rigorous challenge review that questions architectural assumptions, race conditions, permission boundaries, data corruption vectors, and failure recovery. Returns structured, actionable findings with confidence scores and file/line locations.

- **Task Delegation & Rescue (`/codex:rescue` / `codex-rescue`)**:
  Proactively delegates heavy debugging, root-cause analysis, or multi-file implementations to OpenAI Codex with configurable reasoning effort and write permissions.

- **Background Job Management (`status`, `result`, `cancel`)**:
  Seamlessly monitor, retrieve results, or abort in-flight background jobs without blocking your ZCode session.

- **Automated Review Gate**:
  Optional stop-hook that verifies turn completions before closing conversations.

---

## 📋 Requirements

* **ZCode** with plugin support
* **Node.js** >= 18.18.0
* **OpenAI Codex CLI** (`@openai/codex`) with active login (`codex login`) or API key

---

## 🚀 Installation & Setup

1. **Clone or add this repository to your ZCode plugins:**
   ```bash
   git clone https://github.com/ahmed8-info/codex-companion-zcode.git
   ```
2. In ZCode, open **Settings → Plugin Management → Discover**, and add this repository.
3. Enable the **Codex** plugin.
4. Run the setup check:
   ```bash
   /codex:setup
   ```
   If Codex CLI is not installed, `/codex:setup` can install it for you automatically.

---

## 🛠️ Available Commands & Skills

| Command / Skill | Description |
| :--- | :--- |
| `/codex:review` / `$codex-review` | Standard read-only review against local git changes |
| `/codex:adversarial-review` / `$codex-adversarial-review` | Steerable adversarial challenge review |
| `/codex:rescue` / `$codex-rescue-task` | Delegate task or bug fix to Codex subagent |
| `/codex:status` / `$codex-status` | View status of active/recent Codex companion jobs |
| `/codex:result` / `$codex-result` | Retrieve full result of a completed background job |
| `/codex:cancel` / `$codex-cancel` | Abort a running background job |
| `/codex:setup` / `$codex-setup` | Check runtime prerequisites and toggle review gate |

---

## 🏗️ Architecture

- **`scripts/codex-companion.mjs`**: Central CLI entrypoint and orchestrator.
- **`scripts/app-server-broker.mjs`**: Manages persistent connection to the Codex app server via JSON-RPC.
- **`hooks/hooks.json`**: Session lifecycle and optional stop-review gates.
- **`schemas/review-output.schema.json`**: Strict JSON schema defining review findings and severities.
- **`skills/` & `commands/`**: Full integration for both slash-command and agentic-skill invocation modes.

---

## 📄 License

Licensed under the [Apache License, Version 2.0](LICENSE). Ported and enhanced from `openai/codex-plugin-cc`.
