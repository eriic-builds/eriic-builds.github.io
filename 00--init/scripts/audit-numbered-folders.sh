#!/usr/bin/env bash
set -euo pipefail

# Audits folder names against the NN--Name convention.
# Excludes internal hidden directories like .git and .github.
# Supports an optional allowlist at 00--init/folder-naming-allowlist.txt.

root="${1:-.}"
allowlist_file="$root/00--init/folder-naming-allowlist.txt"

if [[ ! -d "$root" ]]; then
  echo "Error: directory not found: $root" >&2
  exit 2
fi

bad_count=0
total_count=0

# Read the allowlist once instead of re-parsing it for every directory.
allow_paths=()
if [[ -f "$allowlist_file" ]]; then
  while IFS= read -r line || [[ -n "$line" ]]; do
    # Trim surrounding whitespace without spawning a subprocess.
    line="${line#"${line%%[![:space:]]*}"}"
    line="${line%"${line##*[![:space:]]}"}"
    [[ -z "$line" || "$line" == \#* ]] && continue
    allow_paths+=("${line%/}")
  done < "$allowlist_file"
fi

is_allowlisted() {
  local candidate="$1" allowed
  for allowed in ${allow_paths+"${allow_paths[@]}"}; do
    # A listed folder path exempts that folder and its full subtree.
    if [[ "$candidate" == "$allowed" || "$candidate" == "$allowed"/* ]]; then
      return 0
    fi
  done
  return 1
}

while IFS= read -r dir_path; do
  rel_path="${dir_path#${root}/}"
  # Skip the root itself if it appears.
  if [[ "$rel_path" == "." || "$rel_path" == "$root" ]]; then
    continue
  fi

  total_count=$((total_count + 1))

  if is_allowlisted "$rel_path"; then
    continue
  fi

  base_name="${dir_path##*/}"

  if [[ ! "$base_name" =~ ^[0-9]{2}--[A-Za-z0-9][A-Za-z0-9_-]*$ ]]; then
    bad_count=$((bad_count + 1))
    echo "NON_COMPLIANT: $dir_path"
  fi
done < <(find "$root" -mindepth 1 -type d -name '.*' -prune -o -type d -print)

echo "Scanned directories: $total_count"
echo "Non-compliant directories: $bad_count"

if (( bad_count > 0 )); then
  exit 1
fi

exit 0
