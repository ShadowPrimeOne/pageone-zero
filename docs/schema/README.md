# 📚 Schema Documentation

This directory contains documentation for all database schema changes and migrations.

## 📋 Table of Contents

1. [Pages Table](./pages-table.md) - Schema for storing published pages and their modules

## 🔄 Migration Process

All schema changes should be:
1. Documented in this directory
2. Made idempotent (safe to rerun)
3. Include both the SQL commands and context
4. Reference the phase/feature they support

## 🛠️ Required Extensions

The following PostgreSQL extensions are required:
- `pgcrypto` - For UUID generation and encryption functions 