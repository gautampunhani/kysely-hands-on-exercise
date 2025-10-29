
import type { Kysely, Selectable } from 'kysely';
import type { Database } from '../types/db';

// Example typed query helpers
export function selectUserByEmail(db: Kysely<Database>, email: string): Promise<Selectable<Database['users']> | undefined> {
  return db.selectFrom('users').selectAll().where('email', '=', email).executeTakeFirst();
}

export function selectUsersWithPostCount(db: Kysely<Database>) {
  // demonstrates subquery and aggregation with types
  const sub = db.selectFrom('posts').select(db.fn.count('id').as('post_count')).whereRef('posts.user_id', '=', 'users.id');
  return db.selectFrom('users')
    .selectAll()
    .select(sub.as('post_count'))
    .execute();
}
