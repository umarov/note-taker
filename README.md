# Note Taker

## Local Setup

### Server

#### Install dependencies

```shell
cd server
yarn
```

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

#### Start Development

```shell
yarn run start:dev
```

### Development

#### Code changes and adding new things

Server is built with NestJS. So if you want to add new components, use CLI that comes with NestJS. Look at the NestJS documentation.

#### Database

The database integration is provided by TypeORM. If you make changes to an entity, you will need a migration.

TypeORM can automatically generate a migration from your changes to the entities. To do that, you need to run:

```shell
yarn run generate-migrations NameOfYourMigration
```

That will create a migration in the `migrations` folder. To run the migration, you need to run:

```shell
yarn run migrations
```

This will apply your migrations and update the `migrations` table.


