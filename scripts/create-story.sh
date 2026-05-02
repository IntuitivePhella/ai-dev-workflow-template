#!/usr/bin/env bash
set -euo pipefail

type="${1:-}"
title="${2:-}"

if [[ -z "$type" || -z "$title" ]]; then
  echo "Usage: bash scripts/create-story.sh <feature|bugfix|refactor|migration|generic> \"Story title\""
  exit 2
fi

slug=$(echo "$title" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//')
date_prefix=$(date +%Y%m%d)
mkdir -p ai/04-stories

case "$type" in
  feature) template="ai/templates/FEATURE.template.md" ;;
  bugfix) template="ai/templates/BUGFIX.template.md" ;;
  refactor) template="ai/templates/REFACTOR.template.md" ;;
  migration) template="ai/templates/MIGRATION.template.md" ;;
  generic) template="ai/templates/STORY.template.md" ;;
  *)
    echo "Unknown story type: $type"
    echo "Allowed: feature, bugfix, refactor, migration, generic"
    exit 2
    ;;
esac

if [[ ! -f "$template" ]]; then
  echo "Template not found: $template"
  exit 1
fi

out="ai/04-stories/${date_prefix}-${type}-${slug}.md"
if [[ -e "$out" ]]; then
  echo "Story already exists: $out"
  exit 1
fi

cp "$template" "$out"
sed -i.bak "s/<title>/$title/g" "$out" && rm -f "$out.bak"

echo "Created story: $out"
echo "Next: fill required fields, then run: bash scripts/validate-story.sh $out"
