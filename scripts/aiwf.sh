#!/usr/bin/env bash
set -euo pipefail

command="${1:-}"
shift || true

usage() {
  cat <<'EOF'
AI Workflow CLI

Usage:
  bash scripts/aiwf.sh init new
  bash scripts/aiwf.sh init existing
  bash scripts/aiwf.sh story <feature|bugfix|refactor|migration|generic> "Title"
  bash scripts/aiwf.sh validate <story-file>
  bash scripts/aiwf.sh gates
  bash scripts/aiwf.sh sensitive [base-ref] [head-ref]
  bash scripts/aiwf.sh review <story-file>
  bash scripts/aiwf.sh doctor

Examples:
  bash scripts/aiwf.sh story feature "Add team invitation flow"
  bash scripts/aiwf.sh validate ai/04-stories/20260502-feature-add-team-invitation-flow.md
  bash scripts/aiwf.sh review ai/04-stories/20260502-feature-add-team-invitation-flow.md
EOF
}

ensure_script() {
  local script="$1"
  if [[ ! -f "$script" ]]; then
    echo "Missing required script: $script"
    exit 1
  fi
}

case "$command" in
  init)
    mode="${1:-}"
    case "$mode" in
      new)
        ensure_script scripts/new-project.sh
        bash scripts/new-project.sh
        ;;
      existing)
        ensure_script scripts/existing-project.sh
        bash scripts/existing-project.sh
        ;;
      *)
        echo "Usage: bash scripts/aiwf.sh init <new|existing>"
        exit 2
        ;;
    esac
    ;;

  story)
    ensure_script scripts/create-story.sh
    bash scripts/create-story.sh "$@"
    ;;

  validate)
    ensure_script scripts/validate-story.sh
    bash scripts/validate-story.sh "$@"
    ;;

  gates)
    ensure_script scripts/check-gates.sh
    bash scripts/check-gates.sh
    ;;

  sensitive)
    ensure_script scripts/check-sensitive-areas.sh
    bash scripts/check-sensitive-areas.sh "$@"
    ;;

  review)
    ensure_script scripts/review-ready.sh
    bash scripts/review-ready.sh "$@"
    ;;

  doctor)
    echo "Running AI workflow doctor..."
    ensure_script scripts/check-gates.sh
    bash scripts/check-gates.sh
    echo ""
    echo "Checking expected directories..."
    for dir in ai ai/00-rules ai/agents ai/templates ai/04-stories ai/05-execution ai/06-reviews ai/08-memory scripts prompts; do
      if [[ -d "$dir" ]]; then
        echo "PASS: $dir"
      else
        echo "WARN: missing directory: $dir"
      fi
    done
    echo ""
    echo "Doctor complete."
    ;;

  help|-h|--help|"")
    usage
    ;;

  *)
    echo "Unknown command: $command"
    echo ""
    usage
    exit 2
    ;;
esac
