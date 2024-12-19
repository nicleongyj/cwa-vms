# CWA Admin Backend

This is a TypeScript + Express backend project for CWA Admin Portal.

## Initial Setup

1. Copy the necessary `.env` file from `.env.example`
```
$ cp .env.example .env.development
```
You may also like to copy a set of environment variables for production
```
$ cp .env.example .env.development
```

2. Start a local copy of your database, preferably using `docker-compose.yml`
```
$ docker compose -f docker-compose-workspace.yml up -d
```

2. Generate Prisma models
```
$ npm run db:generate
```

3. Start the application
```
$ npm run dev
```

## How do I deploy this?

WIP

