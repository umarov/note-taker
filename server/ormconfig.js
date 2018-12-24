require('dotenv').config()

const {
  PG_DB_HOST,
  PG_DB,
  PG_DB_USER,
  PG_DB_PASSWORD,
  CONTAINERIZED,
  NODE_ENV
} = process.env

if (CONTAINERIZED) {
  module.exports = {
    type: 'postgres',
    host: PG_DB_HOST,
    port: 5432,
    database: PG_DB,
    username: PG_DB_USER,
    password: PG_DB_PASSWORD,
    entities: ['./**/*.entity{.ts,.js}'],
    migrations: ['migrations/*.ts'],
    synchronize: false,
    logging: NODE_ENV === 'development',
    cli: {
      migrationsDir: 'migrations'
    }
  }
} else {
  module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: PG_DB,
    username: PG_DB_USER,
    password: PG_DB_PASSWORD,
    entities: ['./**/*.entity{.ts,.js}'],
    migrations: ['migrations/*.ts'],
    synchronize: false,
    logging: true,
    cli: {
      migrationsDir: 'migrations'
    }
  }
}
