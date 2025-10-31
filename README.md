
# NestJS + Fastify + Kysely + Postgres — Workshop (Source Only)

## What this package contains
- Source code for a small NestJS app using Fastify and Kysely (TypeScript).
- Docker Compose to run Postgres
- Migrations, seed script, sample typed queries, posts module to demo joins.

## Quick start (local)
1. Start postgres with `brew install postgresql@15` and     `brew services start postgresql@15`
2. Copy `.env.example` to `.env` and (for docker) set `DATABASE_URL=postgres://workshop:workshop@postgres:5432/workshop_db`
3. Start Postgres and pgAdmin:
   ```bash
   docker-compose up -d
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Run migrations:
   ```bash
   npm run migrate:up
   ```
6. Seed sample data (optional):
   ```bash
   npm run seed
   ```
7. Start dev server:
   ```bash
   npm run start:dev
   ```
