#!/usr/bin/env bash
set -euo pipefail

show_help() {
  cat <<'EOF'
Create a new folder using the NN--Name convention.

Usage:
  ./00--init/scripts/new-numbered-folder.sh --name "FolderName" [--parent "path"]

Options:
  --name      Required. Folder display name, e.g. "Portfolio" or "App Notes".
  --parent    Optional. Parent directory where the new numbered folder is created.
              Defaults to current directory.
  -h, --help  Show help.

Examples:
  ./00--init/scripts/new-numbered-folder.sh --name "Projects" --parent .
  ./00--init/scripts/new-numbered-folder.sh --name "Assets" --parent "01--Portfolio"
EOF
}

name=""
parent="."

while [[ $# -gt 0 ]]; do
  case "$1" in
    --name)
      if [[ $# -lt 2 ]]; then
        echo "Error: --name requires a value." >&2
        exit 1
      fi
      name="$2"
      shift 2
      ;;
    --parent)
      if [[ $# -lt 2 ]]; then
        echo "Error: --parent requires a value." >&2
        exit 1
      fi
      parent="$2"
      shift 2
      ;;
    -h|--help)
      show_help
      exit 0
      ;;
    *)
      echo "Error: unknown argument '$1'." >&2
      show_help >&2
      exit 1
      ;;
  esac
done

if [[ -z "$name" ]]; then
  echo "Error: --name is required." >&2
  show_help >&2
  exit 1
fi

if [[ ! -d "$parent" ]]; then
  echo "Error: parent directory not found: $parent" >&2
  exit 1
fi

# Normalize folder name to be filesystem friendly.
normalized_name="$(printf '%s' "$name" | sed -E 's/[[:space:]]+/-/g; s/[^A-Za-z0-9_-]+/-/g; s/^-+|-+$//g')"

if [[ -z "$normalized_name" ]]; then
  echo "Error: folder name is empty after normalization." >&2
  exit 1
fi

max_num=0
for dir_path in "$parent"/*/; do
  # Unmatched globs stay literal, so verify the directory exists.
  [[ -d "$dir_path" ]] || continue
  dir_name="${dir_path%/}"
  dir_name="${dir_name##*/}"
  num_part="${dir_name%%--*}"
  if [[ "$num_part" =~ ^[0-9]{2}$ ]]; then
    # Convert with base-10 to avoid octal parsing.
    num_val=$((10#$num_part))
    if (( num_val > max_num )); then
      max_num=$num_val
    fi
  fi
done

next_num=$((max_num + 1))
if (( next_num > 99 )); then
  echo "Error: next folder number exceeds 99 under: $parent" >&2
  exit 1
fi

next_prefix=$(printf "%02d" "$next_num")
new_folder="$parent/$next_prefix--$normalized_name"

if [[ -e "$new_folder" ]]; then
  echo "Error: target folder already exists: $new_folder" >&2
  exit 1
fi

mkdir -p "$new_folder"
printf 'Created: %s\n' "$new_folder"
