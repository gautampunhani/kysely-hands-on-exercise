
#!/usr/bin/env bash
set -e
#if [ -d .git ]; then
#  echo "Git repo already initialized."
#  exit 0
#fi
#git init
git add .
git commit -m "chore: initial commit - NestJS + Fastify + Kysely workshop"
git branch -M main
echo "Initialized git repo and created 'main' branch."
