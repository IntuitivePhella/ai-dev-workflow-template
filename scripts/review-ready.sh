#!/usr/bin/env bash
set -euo pipefail

story_path="${1:-}"

if [[ -z "$story_path" ]]; then
  echo "Usage: bash scripts/review-ready.sh <path-to-story>"
  exit 2
fi

failures=0
warnings=0

run_check() {
  local name="$1"
  shift
  echo ""
  echo "== $name =="
  if "$@"; then
    echo "PASS: $name"
  else
    echo "FAIL: $name"
    failures=$((failures + 1))
  fi
}

warn_uncommitted() {
  if command -v git >/dev/null 2>&1 && git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    if ! git diff --quiet || ! git diff --cached --quiet; then
      echo "WARN: uncommitted changes detected. Review git diff before marking ready."
      warnings=$((warnings + 1))
    fi
  fi
}

run_check "Story readiness" bash scripts/validate-story.sh "$story_path"
run_check "Workflow gates" bash scripts/check-gates.sh

if [[ -d .git ]]; then
  if bash scripts/check-sensitive-areas.sh HEAD~1 HEAD; then
    echo "PASS: Sensitive area path scan"
  else
    echo "WARN: Sensitive area path scan flagged review needs"
    warnings=$((warnings + 1))
  fi
fi

warn_uncommitted

echo ""
if [[ "$failures" -gt 0 ]]; then
  echo "Review readiness failed: $failures failure(s), $warnings warning(s)."
  exit 1
fi

echo "Review readiness passed with $warnings warning(s)."
