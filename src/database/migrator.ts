
import 'reflect-metadata';
import { Migrator, FileMigrationProvider } from 'kysely';
import { Kysely } from 'kysely';
import { PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { promises as fs } from 'fs'

dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL ||
    `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`
});
const db = new Kysely({ dialect: new PostgresDialect({ pool }) as any } as any);
console.info(__dirname)
const migrationProvider = new FileMigrationProvider({
  fs, // This is required
  path, // This is required
  migrationFolder: path.join(__dirname, 'migrations'),
})
const migrator = new Migrator({
  db,
  provider: migrationProvider,
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
