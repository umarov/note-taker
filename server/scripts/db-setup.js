const util = require("util");
const { Pool } = require("pg");
const { username: user, host, password, port, database } = require("../ormconfig");

const exec = util.promisify(require("child_process").exec);
const baseDatabaseName = process.env.PG_DB;

// This requires an existing DB to exist. That's why `postgres` is being used as the DB
const pool = new Pool({
  user,
  host,
  database: "postgres",
  password,
  port,
});

async function runMigrations() {
  try {
    await createEnvDatabase().finally(() => {
      return createTestDatabase();
    });
  } catch (_) {
    console.info("Database already exists, continuing with migrations");
    // Database already exists
  } finally {
    await exec("npm run migrations");
    console.info("Finished with migrations");
  }
}

function createEnvDatabase() {
  return pool.query(`CREATE DATABASE "${database}"`);
}

function createTestDatabase() {
  return pool.query(`CREATE DATABASE "${baseDatabaseName}-test"`);
}

runMigrations().catch(err => {
  console.log(err);
  process.exit(0);
});
