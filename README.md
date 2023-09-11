This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Using Prisma Commands

To setup and using Prisma:

-   Check env file and change DATABASE_URL follow your database configs.
-   DATABASE_URL="mysql://database_user:database_password@HOST:PORT/database_name"

After check env file, then run commands below:

-   npx prisma generate => create interface for tables in database.
-   npx prisma db push => create table into database.

## Run Project

-   npm run dev: To start project on port 1327, if you want to change default port, edit in package.json file.
-   npx prisma studio: To start prisma studio on port 5555 to watch nearly action to database.
