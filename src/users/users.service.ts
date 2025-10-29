
import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { Kysely } from 'kysely';
import type { Database } from '../types/db';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService implements OnModuleDestroy {
  constructor(@Inject('KYSLEY_DB') private readonly db: Kysely<Database>) {}

  async create(name: string, email: string) {
    const id = randomUUID();
    await this.db.insertInto('users').values({ id, name, email }).execute();
    return { id, name, email };
  }

  async findAll() {
    return await this.db.selectFrom('users').selectAll().execute();
  }

  async findOne(id: string) {
    return await this.db.selectFrom('users').selectAll().where('id', '=', id).executeTakeFirst();
  }

  async onModuleDestroy() {
    await this.db.destroy();
  }
}
