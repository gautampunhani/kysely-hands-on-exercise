# Kysely SQL Query Builder - Guide

## Table of Contents

- [Introduction](#introduction)
- [Setup & Configuration](#setup--configuration)
- [Basic CRUD Operations](#basic-crud-operations)
- [Query Building](#query-building)
- [Joins & Relationships](#joins--relationships)
- [Aggregations & Grouping](#aggregations--grouping)
- [Transactions](#transactions)
- [Subqueries](#subqueries)
- [Common Table Expressions (CTEs)](#common-table-expressions-ctes)
- [Raw SQL Expressions](#raw-sql-expressions)
- [Type Safety](#type-safety)
- [Migrations](#migrations)
- [Advanced Features](#advanced-features)

## Introduction
Kysely is a type-safe and flexible SQL query builder for TypeScript. It allows you to write SQL queries using a fluent, composable API with full TypeScript inference. Unlike ORMs that abstract away SQL, Kysely embraces SQL while providing full type safety and autocompletion.

**Key Benefits:**
- 🛡️ 100% type-safe queries
- 🔍 Full autocompletion
- 🚀 No runtime overhead
- 📖 SQL-like syntax
- 🔧 Extensible and modular

## Setup & Configuration
Configure Kysely with your database. Kysely supports multiple SQL dialects such as PostgreSQL, MySQL, SQLite, and more.

```typescript
import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'

// Define your database schema
interface Database {
  users: UserTable
  posts: PostTable
  profiles: ProfileTable
}

// Initialize Kysely
const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      database: 'workshop_db',
      host: 'localhost',
      user: 'workshop',
      password: 'workshop',
      port: 5432,
      max: 10,
    })
  })
})
```

---

## Basic CRUD Operations

### Create
```typescript
await db.insertInto('users').values({ name: 'Alice', email: 'alice@example.com' }).execute()
```

### Read
```typescript
const users = await db.selectFrom('users').selectAll().execute()
```

### Update
```typescript
await db.updateTable('users').set({ name: 'Alicia' }).where('id', '=', 1).execute()
```

### Delete
```typescript
await db.deleteFrom('users').where('id', '=', 1).execute()
```

---

## Query Building
Kysely provides a fluent API for complex query construction.

```typescript
const result = await db
  .selectFrom('users')
  .select(['id', 'name'])
  .where('name', 'like', '%john%')
  .orderBy('id desc')
  .execute()
```

---

## Joins & Relationships

```typescript
const result = await db
  .selectFrom('users')
  .innerJoin('posts', 'users.id', 'posts.user_id')
  .select(['users.name', 'posts.title'])
  .execute()
```

---

## Aggregations & Grouping

```typescript
const stats = await db
  .selectFrom('orders')
  .select(({ fn }) => [fn.count('id').as('total_orders'), fn.avg('amount').as('avg_amount')])
  .groupBy('customer_id')
  .execute()
```

---

## Transactions

```typescript
await db.transaction().execute(async (trx) => {
  await trx.insertInto('users').values({ name: 'John' }).execute()
  await trx.insertInto('accounts').values({ balance: 1000 }).execute()
})
```

---

## Subqueries

```typescript
const subquery = db.selectFrom('orders').select('customer_id').where('amount', '>', 500)
const result = await db.selectFrom('customers').where('id', 'in', subquery).execute()
```

---

## Common Table Expressions (CTEs)

```typescript
const activeUsers = db
  .selectFrom('users')
  .selectAll()
  .where('is_active', '=', true)
  .as('active_users')

const result = await db
  .with(activeUsers)
  .selectFrom('active_users')
  .select(['id', 'name'])
  .execute()
```

---

## Raw SQL Expressions

```typescript
const result = await db
  .selectFrom('users')
  .select(db.raw('COUNT(*) as user_count'))
  .execute()
```

---

## Type Safety
Kysely ensures compile-time type safety for all queries, catching schema mismatches early.

```typescript
// Type-safe: Kysely knows the columns of each table.
const user = await db.selectFrom('users').select(['id', 'name']).where('id', '=', 1).executeTakeFirst()
```

---

## Migrations

Kysely supports migrations through third-party tools or scripts.

```typescript
import { Migrator, FileMigrationProvider } from 'kysely'
import * as path from 'path'
import * as fs from 'fs/promises'

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder: path.join(__dirname, 'migrations'),
  }),
})

await migrator.migrateToLatest()
```

---

## Advanced Features
- JSON column operations
- Complex joins & conditional logic
- Schema introspection & type generation
- Plugin system for custom dialects or query transformers

```typescript
const result = await db
  .selectFrom('users')
  .select(({ fn, json }) => [fn.count('id').as('count'), json.buildObject({ id: 'users.id' }).as('meta')])
  .execute()
```
