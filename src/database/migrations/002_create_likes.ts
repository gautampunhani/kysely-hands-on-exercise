export async function up(db: any) {
  await db.schema.createTable('post_likes')
    .addColumn('postid', 'uuid', col => col.notNull())
    .addColumn('liked_by_id', 'uuid', col => col.notNull())
    .addColumn('created_at', 'timestamp', col => col.notNull().defaultTo('now()'))
    .addPrimaryKeyConstraint('post_likes_pk', ['postid', 'liked_by_id'])
    .execute();
}
export async function down(db: any) {
  await db.schema.dropTable('post_likes').execute();
}
