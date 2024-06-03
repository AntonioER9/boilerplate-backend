import { Module } from '@nestjs/common';
import { ApiKeyStrategy } from './strategies/apikey.strategy';

@Module({
  providers: [ApiKeyStrategy],
})
export class AuthModule {}
