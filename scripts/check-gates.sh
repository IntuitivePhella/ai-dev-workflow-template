#!/usr/bin/env bash
set -euo pipefail

failures=0
warnings=0

check_file() {
  local path="$1"
  local required="${2:-required}"
  if [[ ! -f "$path" ]]; then
    if [[ "$required" == "required" ]]; then
      echo "FAIL: missing $path"
      failures=$((failures + 1))
    else
      echo "WARN: optional file missing: $path"
      warnings=$((warnings + 1))
    fi
  fi
}

check_not_empty() {
  local path="$1"
  if [[ -f "$path" && ! -s "$path" ]]; then
    echo "WARN: file exists but is empty: $path"
    warnings=$((warnings + 1))
  fi
}

check_no_tbd_in_active_artifacts() {
  local paths=("ai/01-discovery" "ai/02-product" "ai/03-architecture" "ai/04-stories" "ai/05-execution")
  for path in "${paths[@]}"; do
    [[ -d "$path" ]] || continue
    if grep -RIn "TBD" "$path" --exclude='*.template.md' >/tmp/aiwf_tbd_matches.$$ 2>/dev/null; then
      echo "WARN: unresolved TBD placeholders found in active artifacts:"
      cat /tmp/aiwf_tbd_matches.$$
      warnings=$((warnings + 1))
    fi
    rm -f /tmp/aiwf_tbd_matches.$$
  done
}

echo "Checking AI workflow gates..."

# Gate 0 — Understanding
n=0
for file in \
  ai/00-rules/AI_RULES.md \
  ai/00-rules/WORKFLOW_MODES.md \
  ai/00-rules/QUALITY_GATES.md \
  ai/00-rules/DEFINITION_OF_READY.md \
  ai/agents/ORCHESTRATOR.md \
  ai/agents/ROUTING_MATRIX.md \
  ai/agents/SQUAD_LEVELS.md \
  ai/08-memory/PROJECT_MEMORY.md; do
  check_file "$file" required
  check_not_empty "$file"
  n=$((n + 1))
done

check_file "ai/08-memory/PROJECT_MAP.md" optional
check_not_empty "ai/08-memory/PROJECT_MAP.md"

# Gate 1 — Specification
if [[ -d "ai/04-stories" ]]; then
  story_count=$(find ai/04-stories -type f -name '*.md' | wc -l | tr -d ' ')
  if [[ "$story_count" -eq 0 ]]; then
    echo "WARN: no stories found in ai/04-stories"
    warnings=$((warnings + 1))
  fi
fi

# Gate 2/3 — Execution/Verification support
check_file "ai/05-execution/EXECUTION_PROTOCOL.md" required
check_file "ai/06-reviews/REVIEW_CHECKLIST.md" required
check_file "ai/00-rules/GIT_WORKFLOW.md" required
check_file "ai/00-rules/CHANGE_SIZE_POLICY.md" required

check_no_tbd_in_active_artifacts

if [[ "$failures" -gt 0 ]]; then
  echo ""
  echo "Gate check failed: $failures failure(s), $warnings warning(s)."
  exit 1
fi

echo ""
echo "Gate check passed with $warnings warning(s)."
