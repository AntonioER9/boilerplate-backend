import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appOptions, validationOptions } from 'config/options/app.option';
import { corsOptions } from 'config/options/cors.option';
import { apiKeySwaggerBearerName, apiKeySwaggerBearerOptions, swaggerOptions } from 'config/options/swagger.option';
import 'newrelic';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), appOptions);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.enableShutdownHooks();

  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.get<string>('name', ''))
    .setDescription(configService.get<string>('description', ''))
    .setVersion(configService.get<string>('version', ''))
    .setExternalDoc('Project Repository', configService.get<string>('repoUrl', ''))
    .addApiKey(apiKeySwaggerBearerOptions, apiKeySwaggerBearerName)
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument, swaggerOptions);

  // * In case you want to validate DB on init
  // await app.get(MikroORM).getSchemaGenerator().ensureDatabase();
  await app.register(cors, corsOptions);
  await app.register(helmet);
  await app.listen(configService.get<number>('port', 5000), '0.0.0.0');
}

void bootstrap();
