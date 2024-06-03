import { ApiProperty } from '@nestjs/swagger';

export class PokemonResponseDto {
  @ApiProperty()
  public name!: string;

  @ApiProperty()
  public url!: string;

  @ApiProperty()
  public id!: number;

  @ApiProperty()
  public type: string | undefined;

  @ApiProperty()
  public height: number | undefined;

  @ApiProperty()
  public weight: number | undefined;

  @ApiProperty()
  public moves: string[] | undefined;
}
