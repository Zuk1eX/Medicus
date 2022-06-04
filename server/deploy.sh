#!/usr/bin/env sh
set -e

git add -A
git commit -m 'deploy'

git push -f git@github.com:Zuk1eX/medicus.git master:server

cd -