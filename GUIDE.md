# Kysely SQL Query Builder - Workshop Guide

*A type-safe and autocompletion-friendly SQL query builder for TypeScript*

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

Kysely (pronounced "Key-seh-lee") is a type-safe SQL query builder for TypeScript. Unlike ORMs that abstract away SQL, Kysely embraces SQL while providing full type safety and autocompletion.

**Key Benefits:**
- 🛡️ 100% type-safe queries
- 🔍 Full autocompletion
- 🚀 No runtime overhead
- 📖 SQL-like syntax
- 🔧 Extensible and modular

## Setup & Configuration

### Database Connection
Configure Kysely with your database. This example uses PostgreSQL, but Kysely also supports MySQL and SQLite.

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