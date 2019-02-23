require("dotenv").config();

const { NODE_ENV } = process.env;

const isDevelopment = NODE_ENV === "development";
const isTest = NODE_ENV === "test";
const isProduction = NODE_ENV === "production";
const isStaging = NODE_ENV === "staging";

const isDevelopmentOrTest = isDevelopment || isTest;

module.exports = {
  isDevelopment,
  isTest,
  isProduction,
  isStaging,
  isDevelopmentOrTest,
};
