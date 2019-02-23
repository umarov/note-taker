// @ts-check

const {
  isDevelopment,
  isTest,
  isProduction,
  isStaging,
  isDevelopmentOrTest,
} = require("./scripts/env");

const {
  PG_DB_HOST,
  PG_DB_PORT,
  PG_DB_USER,
  PG_DB_PASSWORD,
  PG_DB,
  NODE_ENV,
} = process.env;

const entities = isDevelopmentOrTest
  ? [`./src/**/**/*.entity.ts`]
  : [`./dist/src/**/*.entity.js`];
const migrations = isDevelopmentOrTest
  ? [`./migrations/*.ts`]
  : [`./dist/migrations/*.js`];

function logging() {
  if (isStaging || isProduction) {
    return ["info"];
  }

  if (isDevelopment) {
    return true;
  }

  if (isTest) {
    return ["error"];
  }
}

// Base config assumes functionality without docker
// @type { TypeOrmModuleOptions }
const baseConfig = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  database: `${PG_DB}-${NODE_ENV}`,
  username: PG_DB_USER,
  password: PG_DB_PASSWORD,
  entities,
  migrations,
  synchronize: isTest,
  logging: logging(),
  migrationsTableName: "migrations",
  cli: {
    migrationsDir: `./migrations`,
  },
  maxQueryExecutionTime: 1000,
};

if (PG_DB_HOST) {
  module.exports = {
    ...baseConfig,
    host: PG_DB_HOST,
    port: PG_DB_PORT,
  };
} else {
  module.exports = baseConfig;
}
