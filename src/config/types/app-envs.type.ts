export type AppEnvs = {
  name: string | undefined;
  env: string | undefined;
  repoUrl: string | undefined;
  port: number | undefined;
  version: string | undefined;
  description: string | undefined;
  debug: boolean | undefined;

  auth: {
    apiKey: string | undefined;
  };

  database: {
    host: string | undefined;
    port: number | undefined;
    user: string | undefined;
    password: string | undefined;
    dbName: string | undefined;
    log: boolean | undefined;
  };

  pokeApi: {
    baseUrl: string | undefined;
    pokemonEndpoint: string | undefined;
  };
};
