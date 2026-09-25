#!/usr/bin/env node

import fs from "node:fs";
import process from "node:process";

import {
  clearBrokerSession,
  loadBrokerSession,
  teardownBrokerSession
} from "./lib/broker-lifecycle.mjs";
import { listJobs, saveState, writeCurrentSessionMarker } from "./lib/state.mjs";
import { resolveWorkspaceRoot } from "./lib/workspace.mjs";

function readHookInput() {
  const raw = fs.readFileSync(0, "utf8").trim();
  if (!raw) {
    return {};
  }
  return JSON.parse(raw);
}

function isProcessAlive(pid) {
  if (!Number.isFinite(pid) || pid <= 0) {
    return false;
  }
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error?.code === "EPERM";
  }
}

function pruneStaleJobs(cwd) {
  const workspaceRoot = resolveWorkspaceRoot(cwd);
  const jobs = listJobs(workspaceRoot);
  if (jobs.length === 0) {
    return;
  }

  let changed = false;
  const nextJobs = jobs.map((job) => {
    const stillRunning = job.status === "queued" || job.status === "running";
    if (!stillRunning || isProcessAlive(job.pid)) {
      return job;
    }
    changed = true;
    return {
      ...job,
      status: "failed",
      phase: "failed",
      pid: null,
      completedAt: job.completedAt ?? new Date().toISOString(),
      errorMessage: job.errorMessage ?? "The job process is no longer running (reclaimed at session start)."
    };
  });

  if (changed) {
    saveState(workspaceRoot, { jobs: nextJobs });
  }
}

function pruneStaleBroker(cwd) {
  const brokerSession = loadBrokerSession(cwd);
  if (!brokerSession) {
    return;
  }
  if (isProcessAlive(brokerSession.pid)) {
    return;
  }
  teardownBrokerSession({
    endpoint: brokerSession.endpoint ?? null,
    pidFile: brokerSession.pidFile ?? null,
    logFile: brokerSession.logFile ?? null,
    sessionDir: brokerSession.sessionDir ?? null,
    pid: null,
    killProcess: null
  });
  clearBrokerSession(cwd);
}

function handleSessionStart(input) {
  const cwd = input.cwd || process.cwd();
  writeCurrentSessionMarker(cwd, input.session_id);
  try {
    pruneStaleJobs(cwd);
    pruneStaleBroker(cwd);
  } catch {
  }
}

async function main() {
  const input = readHookInput();
  const eventName = process.argv[2] ?? input.hook_event_name ?? "";

  if (eventName === "SessionStart") {
    handleSessionStart(input);
  }
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
});
