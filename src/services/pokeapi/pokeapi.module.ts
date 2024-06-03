import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PokeapiService } from './pokeapi.service';
import { LoggerModule } from 'core/logger/logger.module';

@Module({
  imports: [LoggerModule, HttpModule],
  providers: [PokeapiService],
  exports: [PokeapiService],
})
export class PokeapiModule {}
