
// Kysely migration (TS) - up / down exports
export async function up(db: any) {
  await db.schema.createTable('users')
    .addColumn('id', 'uuid', col => col.primaryKey())
    .addColumn('name', 'text', col => col.notNull())
    .addColumn('email', 'text', col => col.notNull())
    .addColumn('created_at', 'timestamp', col => col.notNull().defaultTo(db.fn.now()))
    .execute();
  await db.schema.createTable('posts')
    .addColumn('id', 'uuid', col => col.primaryKey())
    .addColumn('user_id', 'uuid', col => col.notNull())
    .addColumn('title', 'text', col => col.notNull())
    .addColumn('body', 'text', col => col.notNull())
    .addColumn('created_at', 'timestamp', col => col.notNull().defaultTo(db.fn.now()))
    .execute();
}
export async function down(db: any) {
  await db.schema.dropTable('posts').execute();
  await db.schema.dropTable('users').execute();
}
