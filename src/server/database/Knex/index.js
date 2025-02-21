import knex from "knex";
import "dotenv/config";
import knexConfig from "./knexfile.js";

const getEnvironment = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return knexConfig.production;
    case "test":
      return knexConfig.test;
    default:
      return knexConfig.development;
  }
};

const db = knex(getEnvironment()); // Instância do Knex

export const Knex = db;
