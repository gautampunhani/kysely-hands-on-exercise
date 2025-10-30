
import { Provider } from '@nestjs/common';
import { Kysely } from 'kysely';
import { PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import type { Database } from '../types/db';
dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL ||
    `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`
});
export const KyselyProviderToken = 'KYSLEY_DB';
export const kyselyProviders: Provider[] = [
  {
    provide: KyselyProviderToken,
    useFactory: () => {
      const db = new Kysely<Database>({
        dialect: new PostgresDialect({ pool } as any) as any,
      });
      return db;
    },
  },
  {
    provide: 'PG_POOL',
    useValue: pool,
  },
];
