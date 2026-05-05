#!/usr/bin/env python3
"""
Nebius Power DC Map — health check (v1.0)

Checks two conditions and emits a JSON status report:

  1. STALE_DATA   — last commit on `v1.0/data.js` is older than STALE_DAYS.
  2. PAGES_DOWN   — the published GitHub Pages URL does not return HTTP 200,
                    or the response body is missing the expected dataset hook.

Exit codes:
  0 = OK (both checks pass)
  1 = ALARM (one or more checks failed)
  2 = ERROR (the check itself could not run — network, parse, etc.)

Designed to be invoked by:
  - The Cowork scheduled task `nbis-power-dc-map-daily-check` (runs 07:30 local).
  - A human operator running `python monitor_check.py` from a terminal.
  - A CI pipeline (e.g. GitHub Actions) — exit code drives the alarm.

Configuration is read from env vars (with sensible defaults):
  NBIS_REPO            default: vjanrikard/nbis_power_dc_map
  NBIS_BRANCH          default: main
  NBIS_DATA_PATH       default: v1.0/data.js
  NBIS_PAGES_URL       default: https://vjanrikard.github.io/nbis_power_dc_map/v1.0/
  STALE_DAYS           default: 2
  GITHUB_TOKEN         optional — raises GitHub API rate limit from 60 to 5000/h
"""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from typing import Optional


# ────────────────────────── config ──────────────────────────

REPO         = os.environ.get("NBIS_REPO",       "vjanrikard/nbis_power_dc_map")
BRANCH       = os.environ.get("NBIS_BRANCH",     "main")
DATA_PATH    = os.environ.get("NBIS_DATA_PATH",  "v1.0/data.js")
PAGES_URL    = os.environ.get("NBIS_PAGES_URL",  "https://vjanrikard.github.io/nbis_power_dc_map/v1.0/")
STALE_DAYS   = int(os.environ.get("STALE_DAYS",  "2"))
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")


# ────────────────────────── result model ──────────────────────────

@dataclass
class CheckResult:
    name: str
    ok: bool
    detail: str
    measured_value: Optional[str] = None
    threshold: Optional[str] = None


@dataclass
class Report:
    timestamp_utc: str
    overall_status: str          # "OK" | "ALARM" | "ERROR"
    pages_url: str
    repo: str
    branch: str
    data_path: str
    stale_days_threshold: int
    checks: list[CheckResult]


# ────────────────────────── helpers ──────────────────────────

def _http_get(url: str, *, headers: dict | None = None, timeout: int = 15) -> tuple[int, bytes]:
    req = urllib.request.Request(url, headers=headers or {})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.status, resp.read()


def _github_last_commit_iso(repo: str, branch: str, path: str) -> str:
    """Return the ISO timestamp of the most recent commit touching `path`."""
    api = f"https://api.github.com/repos/{repo}/commits?sha={branch}&path={path}&per_page=1"
    headers = {"Accept": "application/vnd.github+json", "User-Agent": "nbis-power-dc-map-monitor/0.1"}
    if GITHUB_TOKEN:
        headers["Authorization"] = f"Bearer {GITHUB_TOKEN}"
    status, body = _http_get(api, headers=headers)
    if status != 200:
        raise RuntimeError(f"GitHub API returned HTTP {status} for {api}")
    payload = json.loads(body)
    if not payload:
        raise RuntimeError(f"No commits found for path {path} on branch {branch}")
    return payload[0]["commit"]["committer"]["date"]  # e.g. "2026-05-04T07:12:33Z"


# ────────────────────────── checks ──────────────────────────

def check_stale_data() -> CheckResult:
    try:
        last_iso = _github_last_commit_iso(REPO, BRANCH, DATA_PATH)
        last_dt  = datetime.strptime(last_iso, "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)
        age_days = (datetime.now(timezone.utc) - last_dt).total_seconds() / 86400
        ok       = age_days <= STALE_DAYS
        return CheckResult(
            name="STALE_DATA",
            ok=ok,
            detail=(
                f"Last commit to {DATA_PATH}: {last_iso} "
                f"({age_days:.1f}d ago, threshold {STALE_DAYS}d)"
            ),
            measured_value=f"{age_days:.1f}d",
            threshold=f"{STALE_DAYS}d",
        )
    except Exception as exc:
        return CheckResult(
            name="STALE_DATA",
            ok=False,
            detail=f"check failed: {type(exc).__name__}: {exc}",
        )


def check_pages_up() -> CheckResult:
    try:
        status, body = _http_get(PAGES_URL)
        body_str = body.decode("utf-8", errors="replace")
        # Sanity-check that the page actually rendered the map, not just a 200.
        expected_marker = "Nebius Power DC Map"
        if status != 200:
            return CheckResult(
                name="PAGES_DOWN",
                ok=False,
                detail=f"HTTP {status} from {PAGES_URL}",
                measured_value=str(status),
                threshold="200",
            )
        if expected_marker not in body_str:
            return CheckResult(
                name="PAGES_DOWN",
                ok=False,
                detail=f"HTTP 200 but body missing '{expected_marker}' marker",
                measured_value="missing-marker",
                threshold="marker-present",
            )
        return CheckResult(
            name="PAGES_DOWN",
            ok=True,
            detail=f"HTTP 200 + map marker present ({len(body_str)} bytes)",
            measured_value=str(status),
            threshold="200",
        )
    except urllib.error.HTTPError as exc:
        return CheckResult(
            name="PAGES_DOWN",
            ok=False,
            detail=f"HTTPError {exc.code} from {PAGES_URL}",
            measured_value=str(exc.code),
            threshold="200",
        )
    except Exception as exc:
        return CheckResult(
            name="PAGES_DOWN",
            ok=False,
            detail=f"check failed: {type(exc).__name__}: {exc}",
        )


# ────────────────────────── main ──────────────────────────

def main() -> int:
    checks = [check_stale_data(), check_pages_up()]
    any_failed = any(not c.ok for c in checks)
    overall = "ALARM" if any_failed else "OK"

    report = Report(
        timestamp_utc=datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        overall_status=overall,
        pages_url=PAGES_URL,
        repo=REPO,
        branch=BRANCH,
        data_path=DATA_PATH,
        stale_days_threshold=STALE_DAYS,
        checks=checks,
    )

    payload = {
        **{k: v for k, v in asdict(report).items() if k != "checks"},
        "checks": [asdict(c) for c in report.checks],
    }
    print(json.dumps(payload, indent=2, ensure_ascii=False))

    return 1 if any_failed else 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as exc:
        print(json.dumps({
            "timestamp_utc": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "overall_status": "ERROR",
            "error": f"{type(exc).__name__}: {exc}",
        }, indent=2))
        sys.exit(2)
