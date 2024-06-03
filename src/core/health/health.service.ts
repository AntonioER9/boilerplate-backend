import { Inject, Injectable } from '@nestjs/common';
import { HelpCenterLogger } from 'core/logger/logger.service';
import type { HealthResponseDto } from './dtos/health.response.dto';

@Injectable()
export class HealthService {
  constructor(
    @Inject(HelpCenterLogger)
    private readonly logger: HelpCenterLogger,
  ) {}

  getStatus(): HealthResponseDto {
    return {
      status: 'Running',
      uptime: `${process.uptime().toFixed(0)} seconds`,
      dateTime: new Date().toString(),
      logLevels: this.logger.getLogLevels(),
    };
  }
}
