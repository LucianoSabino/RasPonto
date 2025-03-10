import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

// Resolve corretamente o __dirname para compatibilidade com Windows e Linux
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração comum para todas as versões
const commonConfig = {
  migrations: {
    directory: path.resolve(__dirname, "..", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "..", "seeds"),
  },
};

// Configuração para cada ambiente
const development = {
  ...commonConfig,
  client: "sqlite3",
  connection: {
    filename: path.resolve(
      __dirname,
      "..",
      "..",
      "..",
      "..",
      "database.sqlite"
    ),
  },
  useNullAsDefault: true,
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON");
      done();
    },
  },
};

const test = {
  ...development,
  connection: ":memory:", // Banco em memória para testes
};

const production = {
  ...commonConfig,
  client: "pg",

  // Canimho do arquivo Onde quero salvar o banco de dados sqlite, nesse caso vai ser na raiz do projeto
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT) || 5432,
  },
};

// Exporta todas as configurações
const knexConfig = { development, test, production };

export default knexConfig;
