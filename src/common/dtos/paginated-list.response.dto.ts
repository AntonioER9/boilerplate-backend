import { ApiProperty } from '@nestjs/swagger';

export class PaginatedListResponseDto {
  @ApiProperty()
  count!: number;

  @ApiProperty()
  next: string | undefined;

  @ApiProperty()
  previous: string | undefined;

  @ApiProperty()
  results!: unknown[];
}
