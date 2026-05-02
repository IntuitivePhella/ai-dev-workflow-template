#!/usr/bin/env bash
set -euo pipefail

NAME="${1:-story-new}"
FILE="ai/04-stories/${NAME}.md"

if [ -f "$FILE" ]; then
  echo "Story already exists: $FILE"
  exit 1
fi

cp ai/templates/STORY.template.md "$FILE"
echo "Created $FILE"
