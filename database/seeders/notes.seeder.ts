import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Note } from '../../src/modules/notes/entities/note.entity';

export class NotesSeeder extends Seeder {
  async run(em: EntityManager, _: Dictionary): Promise<void> {
    em.create(Note, {
      title: 'Hello World',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non maximus nibh, nec commodo ex. Integer imperdiet at massa nec.',
      flagId: 1,
    });
    em.create(Note, {
      title: 'Test',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non maximus nibh, nec commodo ex. Integer imperdiet at massa nec.',
      flagId: 1,
    });
    em.create(Note, {
      title: 'World test',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non maximus nibh, nec commodo ex. Integer imperdiet at massa nec.',
      flagId: 2,
    });
  }
}
