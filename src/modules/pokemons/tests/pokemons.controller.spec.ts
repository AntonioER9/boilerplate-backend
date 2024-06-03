import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { PokemonsController } from '../pokemons.controller';

describe('PokemonsController', () => {
  let pokemonController: PokemonsController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [PokemonsController],
    })
      .useMocker(createMock)
      .compile();

    pokemonController = moduleRef.get<PokemonsController>(PokemonsController);
  });

  it('should be defined', () => {
    expect(pokemonController).toBeDefined();
  });
});
