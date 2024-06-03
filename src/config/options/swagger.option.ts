import type { SwaggerCustomOptions } from '@nestjs/swagger';
import type { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import type { SwaggerUiOptions } from '@nestjs/swagger/dist/interfaces/swagger-ui-options.interface';

export const apiKeySwaggerBearerName = 'api-key';

export const apiKeySwaggerBearerOptions: SecuritySchemeObject = {
  type: 'apiKey',
  in: 'header',
  name: 'api-key',
  description: 'Enter API key',
};

const swaggerUIOptions: SwaggerUiOptions = {
  displayRequestDuration: true,
  tagsSorter: 'alpha',
  persistAuthorization: true,
};

export const swaggerOptions: SwaggerCustomOptions = {
  swaggerOptions: swaggerUIOptions,
};
