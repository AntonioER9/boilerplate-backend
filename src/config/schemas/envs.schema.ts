import Joi from 'joi';

export const envSchema = Joi.object({
  APP_NAME: Joi.string().required(),
  APP_ENV: Joi.string().required(),
  APP_REPO_URL: Joi.string().required(),
  APP_DESC: Joi.string().required(),
  APP_PORT: Joi.number().required(),
  APP_VERSION: Joi.string().required(),
  APP_DEBUG: Joi.boolean().optional().default(false),
  APP_API_KEY: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_LOG: Joi.boolean().optional().default(false),
  POKEAPI_BASE_URL: Joi.string().required(),
  POKEAPI_POKEMON_ENDPOINT: Joi.string().required(),
});
