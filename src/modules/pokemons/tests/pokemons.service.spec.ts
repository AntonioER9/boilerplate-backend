import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { HttpException, HttpStatus } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { PaginatedListResponseDto } from 'common/dtos/paginated-list.response.dto';
import { PokeapiService } from 'services/pokeapi/pokeapi.service';
import { PokemonResponseDto } from '../dto/pokemon.response.dto';
import { PokemonsService } from '../pokemons.service';
import { mockedDetailResponse, mockedListResponse } from './mocks/pokeapi.mock';

describe('PokemonsService', () => {
  let pokemonService: PokemonsService;
  let pokeapiService: DeepMocked<PokeapiService>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [PokemonsService],
    })
      .overrideProvider(REQUEST)
      .useValue({ headers: { 'flag-id': 1 } })
      .useMocker(createMock)
      .compile();

    pokemonService = moduleRef.get<PokemonsService>(PokemonsService);
    pokeapiService = moduleRef.get(PokeapiService);
  });

  it('should be defined', () => {
    expect(pokemonService).toBeDefined();
  });

  describe('listPokemons', () => {
    it('should obtain pokemons list', async () => {
      pokeapiService.getAllPokemons.mockResolvedValueOnce(mockedListResponse);
      await expect(pokemonService.findAll()).resolves.toBeInstanceOf(PaginatedListResponseDto);
    });
  });

  describe('findOne', () => {
    it('should obtain one pokemon', async () => {
      pokeapiService.findOnePokemon.mockResolvedValueOnce(mockedDetailResponse);
      await expect(pokemonService.findOne('pikachu')).resolves.toBeInstanceOf(PokemonResponseDto);
    });

    it('should throw error', async () => {
      pokeapiService.findOnePokemon.mockRejectedValueOnce(() => {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      });
      await expect(pokemonService.findOne('pika')).rejects.toThrowError(HttpException);
    });
  });
});
