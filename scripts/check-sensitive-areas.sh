#!/usr/bin/env bash
set -euo pipefail

base_ref="${1:-HEAD~1}"
head_ref="${2:-HEAD}"

sensitive_patterns=(
  "auth"
  "authorization"
  "permission"
  "billing"
  "payment"
  "secret"
  "env"
  "migration"
  "terraform"
  "kubernetes"
  "infra"
  "webhook"
  "upload"
  "download"
  "user data"
  "personal data"
)

echo "Checking sensitive areas between $base_ref and $head_ref..."

changed_files=$(git diff --name-only "$base_ref" "$head_ref" 2>/dev/null || true)

if [[ -z "$changed_files" ]]; then
  echo "No changed files detected or git diff unavailable."
  exit 0
fi

hits=0
while IFS= read -r file; do
  lower=$(echo "$file" | tr '[:upper:]' '[:lower:]')
  for pattern in "${sensitive_patterns[@]}"; do
    if [[ "$lower" == *"$pattern"* ]]; then
      echo "SENSITIVE PATH MATCH: $file ($pattern)"
      hits=$((hits + 1))
    fi
  done

done <<< "$changed_files"

if [[ "$hits" -gt 0 ]]; then
  echo ""
  echo "Sensitive area indicators found. Confirm human approval is recorded in the story or PR."
  exit 1
fi

echo "No sensitive path indicators found."
