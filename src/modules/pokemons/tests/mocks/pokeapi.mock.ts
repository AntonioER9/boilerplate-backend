export const mockedListResponse = {
  count: 1279,
  previous: undefined,
  next: '',
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
    {
      name: 'venusaur',
      url: 'https://pokeapi.co/api/v2/pokemon/3/',
    },
  ],
};

export const mockedDetailResponse = {
  id: 25,
  height: 4,
  weight: 60,
  name: 'pikachu',
  types: [
    {
      type: {
        name: 'electric',
      },
    },
  ],
  moves: [
    {
      move: {
        name: 'mega-punch',
      },
    },
  ],
};
