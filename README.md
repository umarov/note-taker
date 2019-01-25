# Note Taker

## Server

### Install dependencies

```shell
cd server
yarn
```

You have two way to setup the server.

1. Use docker
2. Use local postgres and manually start the server

### Docker

Make sure `docker` and `docker-compose` are installed.

Setup local environment variables

```shell
cp .env.example .env
```

To build the containers

```shell
yarn run build:docker:dev
```

To start them

```shell
yarn run start:docker:dev
```

Server will be available at `http://localhost:3000`.
Server is running on `nodemon` in development. So you don't have to restart and redeploy the server container when you make a change.

Limitation with `docker` setup locally is that you can't create migrations with the `yarn run generate-migrations` command. That assumes that you have a local DB running (as if you are inside the container). It pulls settings from `ormconfig.js` file. I have tried creating migrations inside the container, but then the file permission gets messed up and you can't edit the file without `sudo`.

If you want to create migrations, follow along and setup Postgres locally.

#### Using local Postgres

#### Setup the database

Make sure to have Postgres installed

1. Create the note-taker user

```shell
sudo -u postgres createuser -d -s -r note-taker
```

2. Enter postgres console and create the database and set the `note-taker` user password

```
psql
```

```sql
create database "note-taker";
alter user "note-taker" with password 'note-taker-password';
```

#### Run migrations

```shell
yarn run migrations
```

#### Start server

```shell
yarn run start:dev
```

### Development

#### Code changes and adding new things

Server is built with NestJS. So if you want to add new components, use CLI that comes with NestJS. Look at the NestJS documentation.

#### Database

The database integration is provided by TypeORM. If you make changes to an entity, you will need a migration.

TypeORM can automatically generate a migration from your changes to the entities.

Before you do that, make sure your local database has all existing migrations.

```shell
yarn run migrations
```

Then, you need to run:

```shell
yarn run generate-migrations NameOfYourMigration
```

That will create a migration in the `migrations` folder. To run the migration, you need to run:

```shell
yarn run migrations
```

This will apply your migrations and update the `migrations` table.

## UI

UI is build with VueJS. It uses TypeScript, Vuetify and other vue libraries. Setup and build is pretty simple.

```
cd ui
yarn
```

#### Start UI server

```shell
yarn run serve
```
