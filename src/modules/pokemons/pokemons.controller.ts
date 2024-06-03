import { Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  ApiHeaders,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PaginatedListResponseDto } from 'common/dtos/paginated-list.response.dto';
import { ApiKeyAuthGuard } from 'core/auth/guards/key-auth.guard';
import { HeadersInterceptor } from 'core/interceptors/headers.interceptor';
import type { PokemonResponseDto } from './dto/pokemon.response.dto';
import { PokemonsService } from './pokemons.service';

@UseGuards(ApiKeyAuthGuard)
@UseInterceptors(HeadersInterceptor)
@ApiTags('Pokemon')
@ApiSecurity('api-key', ['api-key'])
@ApiHeaders([
  {
    name: 'flag',
    description: 'Requested flag name',
    example: 'paris',
    required: true,
  },
])
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  @ApiOperation({ summary: 'Get pokemon list', description: 'A more detailed explanation of what the api does' })
  @ApiParam({
    name: 'limit',
    required: false,
    description: 'paginated list limit',
  })
  @ApiParam({
    name: 'offset',
    required: false,
    description: 'paginated list offset',
  })
  @ApiResponse({
    status: 200,
    type: PaginatedListResponseDto,
    description: 'An array of pokemon',
    isArray: true,
  })
  findAll(@Param('limit') limit?: number, @Param('offset') offset?: number): Promise<PaginatedListResponseDto> {
    return this.pokemonsService.findAll(limit, offset);
  }

  @Get(':name')
  @ApiOperation({ summary: 'Find pokemon by name', description: 'A more detailed explanation of what the api does' })
  @ApiParam({
    name: 'name',
    description: 'Wanted pokemon exact name',
  })
  @ApiResponse({
    status: 200,
    description: 'pokemon details',
  })
  findOne(@Param('name') name: string): Promise<PokemonResponseDto> {
    return this.pokemonsService.findOne(name);
  }
}
