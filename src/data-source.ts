import "dotenv/config";
import path from "path";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

const dataSourceConfig = ((): DataSourceOptions => {
  const entitiesPath = path.join(__dirname, "./entities/**.{js,ts}");
  const migrationsPath = path.join(__dirname, "./migrations/**.{ts,js}");

  if (!process.env.DATABASE_URL)
    throw new Error("Database URL must be informed");

  if (process.env.NODE_DEV === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [entitiesPath],
    };
  }

  return {
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: true,
    entities: [entitiesPath],
    migrations: [migrationsPath],
  };
})();

const AppDataSource = new DataSource(dataSourceConfig);

export { AppDataSource };
