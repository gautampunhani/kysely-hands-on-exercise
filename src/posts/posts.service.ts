
import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import type { Kysely } from 'kysely';
import type { Database } from '../types/db';
import { randomUUID } from 'crypto';

@Injectable()
export class PostsService implements OnModuleDestroy {
  constructor(@Inject('KYSLEY_DB') private readonly db: Kysely<Database>) {}

  async create(user_id: string, title: string, body: string) {
    const id = randomUUID();
    await this.db.insertInto('posts').values({ id, user_id, title, body }).execute();
    return { id, user_id, title, body };
  }

  async findAll() {
    return this.db.selectFrom('posts').selectAll().execute();
  }

  async findAllWithAuthors() {
    // typed join example: posts + users (selecting specific columns)
    return this.db.selectFrom('posts')
      .innerJoin('users', 'users.id', 'posts.user_id')
      .select([
        'posts.id as post_id',
        'posts.title as post_title',
        'users.id as author_id',
        'users.name as author_name'
      ])
      .execute();
  }

  async onModuleDestroy() {
    await this.db.destroy();
  }
}
