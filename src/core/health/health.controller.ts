import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
  MikroOrmHealthIndicator,
} from '@nestjs/terminus';
import { HealthResponseDto } from './dtos/health.response.dto';
import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly healthService: HealthService,
    private readonly healthCheckService: HealthCheckService,
    private readonly database: MikroOrmHealthIndicator,
    private readonly http: HttpHealthIndicator,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Simple endpoint to check the app is alive',
    description: 'A more detailed explanation of what the api does',
  })
  @ApiResponse({
    status: 200,
    type: HealthResponseDto,
  })
  status(): HealthResponseDto {
    return this.healthService.getStatus();
  }

  @HealthCheck()
  @ApiOperation({
    summary: 'Checks if associated externals services are alive/available',
    description: 'A more detailed explanation of what the api does',
  })
  @ApiResponse({
    type: Promise<HealthCheckResult>,
  })
  @Get('check')
  check(): Promise<HealthCheckResult> {
    // * Can't use configService on controller
    return this.healthCheckService.check([
      () => this.database.pingCheck('database', { timeout: 1500 }),
      () => this.http.pingCheck('pokeapi', process.env['POKEAPI_BASE_URL'] ?? ''),
    ]);
  }
}
