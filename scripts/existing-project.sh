#!/usr/bin/env bash
set -euo pipefail

mkdir -p ai/05-execution ai/08-memory ai/04-stories ai/06-reviews

touch ai/08-memory/PROJECT_MAP.md
touch ai/08-memory/PROJECT_MEMORY.md

echo "Existing project workflow initialized."
echo "Next: ask your agent to analyze the repo and fill ai/08-memory/PROJECT_MAP.md before coding."
