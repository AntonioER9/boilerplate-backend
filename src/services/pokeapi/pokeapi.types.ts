export type PokeapiBaseResponse = {
  name: string;
  url?: string;
};

export type PokeapiResponse = PokeapiBaseResponse & {
  id: number;
  height: number;
  weight: number;
  moves: {
    move: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
};
