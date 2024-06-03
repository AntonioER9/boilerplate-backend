import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ abstract: true })
export abstract class CustomBaseEntity {
  @PrimaryKey()
  @ApiProperty()
  public id!: number;

  @Property()
  @ApiProperty()
  createdAt?: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  @ApiProperty()
  updatedAt?: Date = new Date();
}
