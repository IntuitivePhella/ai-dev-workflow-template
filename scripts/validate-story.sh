#!/usr/bin/env bash
set -euo pipefail

story_path="${1:-}"

if [[ -z "$story_path" ]]; then
  echo "Usage: bash scripts/validate-story.sh <path-to-story-or-template>"
  exit 2
fi

if [[ ! -f "$story_path" ]]; then
  echo "Error: file not found: $story_path"
  exit 2
fi

failures=0
warnings=0

require_section() {
  local section="$1"
  if ! grep -qiE "^##[[:space:]]+$section" "$story_path"; then
    echo "FAIL: missing section: $section"
    failures=$((failures + 1))
  fi
}

warn_if_tbd() {
  local label="$1"
  if grep -qi "TBD" "$story_path"; then
    echo "WARN: unresolved TBD placeholders found ($label)"
    warnings=$((warnings + 1))
    return 0
  fi
}

require_any() {
  local description="$1"
  shift
  local found=0
  for pattern in "$@"; do
    if grep -qiE "$pattern" "$story_path"; then
      found=1
    fi
  done
  if [[ "$found" -eq 0 ]]; then
    echo "FAIL: missing $description"
    failures=$((failures + 1))
  fi
}

echo "Validating story readiness: $story_path"

require_any "workflow mode" "^##[[:space:]]+Workflow mode" "Workflow mode"
require_any "acceptance criteria" "^##[[:space:]]+Acceptance criteria" "Acceptance criteria"
require_any "tests required or verification" "^##[[:space:]]+Tests required" "^##[[:space:]]+Safety tests" "verification"
require_any "commands to run" "^##[[:space:]]+Commands to run" "Required commands"
require_any "rollback plan" "^##[[:space:]]+Rollback" "rollback plan"
require_any "risks" "^##[[:space:]]+Risks" "Risk"
require_any "scope or allowed files" "^##[[:space:]]+Scope" "Allowed files" "Files likely in scope"
require_any "forbidden or out-of-scope areas" "Out of scope" "Forbidden files" "Files or areas explicitly forbidden"
require_any "definition of done" "Definition of done"

if grep -qiE "billing|auth|authorization|permission|secret|production|migration|user data|personal data|payment|paid external|destructive" "$story_path"; then
  if ! grep -qiE "approval recorded: yes|human approval.*yes|approval.*yes" "$story_path"; then
    echo "WARN: sensitive terms detected; make sure human approval is explicit when required"
    warnings=$((warnings + 1))
  fi
fi

warn_if_tbd "story"

if [[ "$failures" -gt 0 ]]; then
  echo ""
  echo "Story is NOT ready: $failures failure(s), $warnings warning(s)."
  exit 1
fi

echo ""
echo "Story readiness check passed with $warnings warning(s)."
