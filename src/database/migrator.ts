
import 'reflect-metadata';
import { Migrator, FileMigrationProvider } from '@kysely/migrator';
import { Kysely } from 'kysely';
import { PostgresDialect } from '@kysely/postgres';
import { Pool } from 'pg';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL ||
    `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`
});
const db = new Kysely({ dialect: new PostgresDialect({ pool }) as any } as any);
const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({ path: path.resolve(__dirname, 'migrations') as any } as any) as any,
});
async function run() {
  const cmd = process.argv[2] || 'up';
  if (cmd === 'up') {
    console.log('Running migrations up');
    const result = await migrator.migrateToLatest();
    console.log(result);
  } else if (cmd === 'down') {
    console.log('Rolling back last migration');
    const result = await migrator.migrateDown();
    console.log(result);
  } else {
    console.log('Unknown command', cmd);
  }
  await db.destroy();
  await pool.end();
}
run().catch(err => {
  console.error(err);
  process.exit(1);
});
