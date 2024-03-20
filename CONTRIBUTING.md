Install deps, copy `.env` file and edit `DATABASE_URL`, create and migrate database for tests.

```sh
pnpm i
cp .env.example env
pnpm db create # create if not exists
pnpm db up # migrate
```

Run tests in a watch mode:

```sh
pnpm t
```

Useful commands before committing:

```sh
pnpm check # run tests
pnpm lint # run eslint
pnpm format # run prettier
pnpm types # check types
```
