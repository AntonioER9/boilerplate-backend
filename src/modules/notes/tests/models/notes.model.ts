import type { Note } from 'modules/notes/entities/note.entity';
import { mockedDetailResponse } from '../mocks/notes.mock';

export class NotesModel {
  find(): Note[] {
    return [mockedDetailResponse];
  }

  findOne(): Note {
    return mockedDetailResponse;
  }

  persistAndFlush(): void {}

  removeAndFlush(): void {}
}

export class NotesModelNull {
  find(): Note[] {
    return [];
  }

  findOne(): undefined {
    return undefined;
  }

  persistAndFlush(): void {}

  removeAndFlush(): void {}
}
