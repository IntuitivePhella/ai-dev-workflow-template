#!/usr/bin/env bash
set -euo pipefail

mkdir -p ai/01-discovery ai/02-product ai/03-architecture ai/04-stories ai/05-execution ai/06-reviews ai/07-release ai/08-memory

cp -n ai/templates/PROJECT_BRIEF.template.md ai/01-discovery/PROJECT_BRIEF.md || true
cp -n ai/templates/PRD.template.md ai/02-product/PRD.md || true
cp -n ai/templates/ARCHITECTURE.template.md ai/03-architecture/ARCHITECTURE.md || true

echo "New project workflow initialized."
echo "Next: ask your agent to fill ai/01-discovery/PROJECT_BRIEF.md without writing code."
