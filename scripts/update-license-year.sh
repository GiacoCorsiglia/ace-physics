#!/usr/bin/env bash

LICENSE_FILE="LICENSE"
START_YEAR=2020
CURRENT_YEAR=$(date +'%Y')

sed -e "1s/${START_YEAR}–[0-9]{4}/${START_YEAR}–${CURRENT_YEAR}/" "$LICENSE_FILE" > "$LICENSE_FILE.new"
mv -- "$LICENSE_FILE.new" "$LICENSE_FILE"

if [[ ! -z "$CI" ]]; then
  git config user.name "github-actions[bot]"
  git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
fi

git add "$LICENSE_FILE"
git commit -m "Update copyright year to ${CURRENT_YEAR}" && git push || echo "License year is already up to date."
