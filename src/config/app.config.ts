import type { AppEnvs } from './types/app-envs.type';

export const appEnvs = (): AppEnvs => {
  return {
    name: process.env['APP_NAME'],
    env: process.env['APP_ENV'],
    repoUrl: process.env['APP_REPO_URL'],
    port: process.env['APP_PORT'] ? Number.parseInt(process.env['APP_PORT'], 10) : 0,
    version: process.env['APP_VERSION'],
    description: process.env['APP_DESC'],
    debug: process.env['APP_DEBUG'] === 'true',

    auth: {
      apiKey: process.env['APP_API_KEY'] ?? '',
    },

    database: {
      host: process.env['DB_HOST'] ?? '',
      port: process.env['DB_PORT'] ? Number.parseInt(process.env['DB_PORT'], 10) : 0,
      user: process.env['DB_USERNAME'] ?? '',
      password: process.env['DB_PASSWORD'] ?? '',
      dbName: process.env['DB_NAME'] ?? '',
      log: process.env['DB_LOG'] === 'true',
    },

    pokeApi: {
      baseUrl: process.env['POKEAPI_BASE_URL'] ?? '',
      pokemonEndpoint: process.env['POKEAPI_POKEMON_ENDPOINT'] ?? '',
    },
  };
};
