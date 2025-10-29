
# NestJS + Fastify + Kysely + Postgres — Workshop (Source Only)

## What this package contains
- Source code for a small NestJS app using Fastify and Kysely (TypeScript).
- Docker Compose to run Postgres + pgAdmin.
- Migrations, seed script, sample typed queries, posts module to demo joins.
- `.gitignore` and `init_git.sh` to initialize a git repo locally.

## Quick start (local)
1. Copy `.env.example` to `.env` and (for docker) set `DATABASE_URL=postgres://workshop:workshop@postgres:5432/workshop_db`
2. Start Postgres and pgAdmin:
   ```bash
   docker-compose up -d
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run migrations:
   ```bash
   npm run migrate:up
   ```
5. Seed sample data (optional):
   ```bash
   npm run seed
   ```
6. Start dev server:
   ```bash
   npm run start:dev
   ```

## Git setup
Run the included script to initialize git and make the initial commit:
```bash
./init_git.sh
```
The script will create a `main` branch and place recommended branch names in `BRANCHES.md`.

## Branches (recommended)
- main: base working app
- feature/kysely-joins: joins, aliasing, typed subqueries
- feature/transactions: typed transactions demo
- feature/migrations-seeding: extra migrations & seed data
- feature/validation: DTO validation with class-validator
