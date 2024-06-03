import { Module } from '@nestjs/common';
import { LoggerModule } from 'core/logger/logger.module';
import { PokeapiModule } from 'services/pokeapi/pokeapi.module';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';

@Module({
  imports: [LoggerModule, PokeapiModule],
  controllers: [PokemonsController],
  providers: [PokemonsService],
})
export class PokemonsModule {}
