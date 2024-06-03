import { Entity, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from 'common/entities/custom-base.entity';

@Entity()
export class Note extends CustomBaseEntity {
  @Property()
  title!: string;

  @Property()
  content!: string;

  @Property()
  flagId!: number;

  constructor(title: string, content: string, flagId: number) {
    super();
    this.title = title;
    this.content = content;
    this.flagId = flagId;
  }
}
