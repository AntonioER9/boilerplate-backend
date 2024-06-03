const originsLocal = [/https?:\/\/localhost:\d{4}/, /https?:\/\/192\.168\.\d{1,3}\.\d{1,3}:\d{4}/];
const originsStg = ['*.ecomm-stg.cencosud.com'];
const originsProd = ['*.ecomm.cencosud.com'];

const origin = [...originsProd, ...originsStg, ...originsLocal];

export const corsOptions: object = {
  preflightContinue: false,
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  optionsSuccessStatus: 204,
  origin,
};
