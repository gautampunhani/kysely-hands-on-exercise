
import 'reflect-metadata';
import { Kysely } from 'kysely';
import { PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { randomUUID } from 'crypto';
dotenv.config();
(async function seed() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL ||
      `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`
  });
  const db = new Kysely({ dialect: new PostgresDialect({ pool }) as any } as any);
  try {
    const userId = randomUUID();
    await db.insertInto('users').values({ id: userId, name: 'Alice', email: 'alice@example.com' }).execute();
    await db.insertInto('posts').values({ id: randomUUID(), user_id: userId, title: 'Hello', body: 'First post' }).execute();
    console.log('Seed complete');
  } catch (err) {
    console.error(err);
  } finally {
    await db.destroy();
    await pool.end();
  }
})();
