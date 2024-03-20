# Auth.js OrchidORM Adapter

An adapter for Auth.js/NextAuth.js to allow you to connect to any database service via OrchidORM.

User table is required, optional tables are:
- **account**: for OAuth2 providers, stores provider info and token data;
- **session**: to store user session when choosing database strategy, not needed for `jwt` strategy;
- **verificationToken**: for [Email](https://next-auth.js.org/providers/email) provider.

See required table structures in this [migration](./demos/nextjs/src/db/migrations/0001_create-auth-tables.ts) file.

Table names can be changed, but column names should be as it is in the file above. Tables may have additional columns.

For proper typing of NextAuth functions, override NextAuth types in the [types/next-auth.d.ts](./demos/nextjs/types/next-auth.d.ts).

## NextJS demo

This repo contains demo NextJS project with GitHub and Email providers.

- Auth.js config is in [src/app/(auth)/auth.ts](./demos/nextjs/src/app/(auth)/auth.ts).
- database files (migrations, tables, configs) are in [src/db](./demos/nextjs/src/db).

To run it locally:
- pull the repo
- `cd demos/nextjs`
- `pnpm i`
- create GitHub App: click on your picture on GitHub -> Settings -> Developer settings -> New GitHub App
- `cp .env.example .env.local` and edit secrets
- run `pnpm db create` to create database with credentials from `.env.local`
- `pnpm db up` to run migrations
- `pnpm dev` to launch NextJS
