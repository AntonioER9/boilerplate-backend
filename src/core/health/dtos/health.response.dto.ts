import type { LogLevel } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDto {
  @ApiProperty()
  readonly status!: string;

  @ApiProperty()
  readonly uptime!: string;

  @ApiProperty()
  readonly dateTime!: string;

  @ApiProperty()
  readonly logLevels!: LogLevel[];
}
