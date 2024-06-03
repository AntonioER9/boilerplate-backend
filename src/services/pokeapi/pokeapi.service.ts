import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosHeaders, AxiosRequestConfig, isAxiosError } from 'axios';
import type { PaginatedListResponseDto } from 'common/dtos/paginated-list.response.dto';
import { HelpCenterLogger } from 'core/logger/logger.service';
import type { PokeapiResponse } from './pokeapi.types';

@Injectable()
export class PokeapiService {
  private readonly headers: AxiosHeaders = new AxiosHeaders({ Accept: 'application/json' });
  private requestConfig: AxiosRequestConfig;

  constructor(
    private readonly logger: HelpCenterLogger,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.requestConfig = {
      method: '',
      baseURL: this.configService.get<string>('pokeApi.baseUrl', ''),
      url: '',
      headers: this.headers,
      params: undefined,
    };
  }

  async getAllPokemons(limit?: number, offset?: number): Promise<PaginatedListResponseDto> {
    const endpoint = this.configService.get<string>('pokeApi.pokemonEndpoint', '');
    const params = { limit, offset };
    return (await this.apiCall('get', endpoint, params)) as PaginatedListResponseDto;
  }

  async findOnePokemon(name: string): Promise<PokeapiResponse> {
    const endpoint = this.configService.get<string>('pokeApi.pokemonEndpoint', '');
    return (await this.apiCall('get', `${endpoint}/${name}`)) as PokeapiResponse;
  }

  private async apiCall(method: string, endpoint: string, params?: unknown): Promise<unknown> {
    try {
      this.requestConfig.method = method;
      this.requestConfig.url = endpoint;
      this.requestConfig.params = params;

      // ? check if its better to use observables or promises
      // * In case you prefer observable way from 'rxjs'
      // const observable = this.httpService.request(this.requestConfig).pipe(map((response) => response.data as unknown));
      // return await firstValueFrom(observable);

      this.logger.hcDebug('apiCall', 'trying to call the API', { request: this.requestConfig });

      // * In case you prefer using axios directly
      const response = await this.httpService.axiosRef.request(this.requestConfig);
      return response.data as unknown;
    } catch (error: unknown) {
      throw this.handleAxiosError(error);
    }
  }

  private handleAxiosError(error: AxiosError | unknown): HttpException {
    if (isAxiosError(error) && error.response) {
      this.logger.hcWarn('apiCall', error.message, { error });
      throw new HttpException(error.response.statusText, error.response.status);
    }
    this.logger.hcWarn('apiCall', 'An unknown error ocurred', error as object);
    throw new InternalServerErrorException();
  }
}
