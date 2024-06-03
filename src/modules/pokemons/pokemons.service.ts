import { Inject, Injectable, Optional } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PaginatedListResponseDto } from 'common/dtos/paginated-list.response.dto';
import type { HelpCenterHeaders } from 'common/types/hc-header.type';
import { HelpCenterLogger } from 'core/logger/logger.service';
import type { Request } from 'express';
import type { PokeapiResponse } from 'services/pokeapi/pokeapi.types';
import { PokeapiService } from '../../services/pokeapi/pokeapi.service';
import { PokemonResponseDto } from './dto/pokemon.response.dto';

@Injectable()
export class PokemonsService {
  constructor(
    @Inject(HelpCenterLogger)
    private readonly logger: HelpCenterLogger,
    @Inject(PokeapiService)
    private readonly pokeApi: PokeapiService,
    @Inject(REQUEST)
    private request: Request,
    @Optional()
    @Inject('Headers')
    private hcHeaders: HelpCenterHeaders,
  ) {
    this.logger.setContext(PokemonsService.name);
    this.hcHeaders = this.request.headers as unknown as HelpCenterHeaders;
  }

  async findAll(limit?: number, offset?: number): Promise<PaginatedListResponseDto> {
    this.logger.hcDebug('findAll', 'trying to get all pokemons', { limit, offset, flagId: this.hcHeaders['flag-id'] });

    const pokeApiResponse: PaginatedListResponseDto = await this.pokeApi.getAllPokemons(
      limit,
      this.hcHeaders['flag-id'],
    );

    this.logger.hcDebug('findAll', 'pokemons returned', { count: pokeApiResponse.count });

    return this.mapToPaginatedResponse(pokeApiResponse);
  }

  async findOne(name: string): Promise<PokemonResponseDto> {
    this.logger.hcDebug('findOne', 'trying to get one pokemon', { name });

    const pokeApiResponse: PokeapiResponse = await this.pokeApi.findOnePokemon(name);

    this.logger.hcDebug('findOne', 'pokemon found', { pokemon: pokeApiResponse });

    return this.mapToPokemonResponse(pokeApiResponse);
  }

  // ? Better mapping?
  private mapToPaginatedResponse(pokeApiResponse: PaginatedListResponseDto): PaginatedListResponseDto {
    const list = new PaginatedListResponseDto();
    list.count = pokeApiResponse.count;
    list.results = pokeApiResponse.results;
    list.next = pokeApiResponse.next?.replace('pokeapi.co/api/v2/pokemon', `${this.request.hostname}/pokemons`);
    list.previous = pokeApiResponse.previous?.replace('pokeapi.co/api/v2/pokemon', `${this.request.hostname}/pokemons`);
    return list;
  }

  // ? Better mapping?
  private mapToPokemonResponse(pokeApiResponse: PokeapiResponse): PokemonResponseDto {
    const pokemon = new PokemonResponseDto();
    pokemon.name = pokeApiResponse.name;
    pokemon.id = pokeApiResponse.id;
    pokemon.height = pokeApiResponse.height;
    pokemon.weight = pokeApiResponse.weight;
    pokemon.type = pokeApiResponse.types.shift()?.type.name;
    pokemon.moves = pokeApiResponse.moves.map((value) => value.move.name);
    return pokemon;
  }
}
