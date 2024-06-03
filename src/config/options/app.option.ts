import type { NestApplicationOptions, ValidationPipeOptions } from '@nestjs/common';
import type { ConfigModuleOptions } from '@nestjs/config';
import { appEnvs } from 'config/app.config';
import { envSchema } from 'config/schemas/envs.schema';

export const appOptions: NestApplicationOptions = {
  bufferLogs: true,
};

export const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  load: [appEnvs],
  expandVariables: true,
  validationSchema: envSchema,
  validationOptions: {
    stripUnknown: true,
  },
};

export const validationOptions: ValidationPipeOptions = { transform: true };
