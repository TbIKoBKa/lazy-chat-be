import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// Check typeORM documentation for more information.
const config: PostgresConnectionOptions = {
  name: 'default',
  type: 'postgres',
  entities: [],
  // We are using migrations, synchronize should set to false.
  synchronize: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  // migrationsRun: process.env.NODE_ENV !== "production",
  migrationsRun: true,
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'each',
  namingStrategy: new SnakeNamingStrategy(),
  logging: process.env.NODE_ENV === 'development',
  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or server folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [],
};

export default config;
