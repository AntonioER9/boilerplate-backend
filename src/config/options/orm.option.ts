import type { ConnectionOptions, Options, SeederOptions } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const connOptions: ConnectionOptions = {
  host: process.env['DB_HOST'] ?? '',
  port: process.env['DB_PORT'] ? Number.parseInt(process.env['DB_PORT'], 10) : 5432, //3306
  dbName: process.env['DB_NAME'] ?? '',
  user: process.env['DB_USERNAME'] ?? '',
  password: process.env['DB_PASSWORD'] ?? '',
};

const entitiesOptions = { entities: ['./dist/**/*.entity.js'], entitiesTs: ['./src/**/*.entity.ts'] };

const cacheOptions = { options: { cacheDir: 'database/temp' } };

const schemaGeneratorOptions = { disableForeignKeys: false, ignoreSchema: ['CustomBaseEntity', 'BaseEntity'] };

const seederOptions: SeederOptions = {
  path: './database/seeders',
  defaultSeeder: 'DatabaseSeeder',
  glob: '!(*.d).{js,ts}',
  emit: 'ts',
};

const ormOptions: Options = {
  type: 'postgresql',
  allowGlobalContext: true,
  ...connOptions,
  ...entitiesOptions,
  cache: cacheOptions,
  schemaGenerator: schemaGeneratorOptions,
  seeder: seederOptions,
  debug: (process.env['DB_LOG'] && process.env['DB_LOG'] == 'true') || false,
  metadataProvider: TsMorphMetadataProvider,
};

export default ormOptions;
