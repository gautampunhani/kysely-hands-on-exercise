
import 'reflect-metadata';
import { Kysely, sql } from 'kysely';
import { PostgresDialect } from '@kysely/postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { randomUUID } from 'crypto';
dotenv.config();
(async function demo() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL ||
      `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`
  });
  const db = new Kysely({ dialect: new PostgresDialect({ pool }) as any } as any);
  try {
    await db.transaction().execute(async (trx) => {
      const userId = randomUUID();
      await trx.insertInto('users').values({ id: userId, name: 'TxUser', email: 'tx@example.com' }).execute();
      // simulate error to force rollback
      // throw new Error('Force rollback');
      await trx.insertInto('posts').values({ id: randomUUID(), user_id: userId, title: 'Tx post', body: 'inside tx' }).execute();
    });
    console.log('Transaction completed');
  } catch (err) {
    console.error('Transaction failed:', err);
  } finally {
    await db.destroy();
    await pool.end();
  }
})();
