import type { PaginatedListResponseDto } from 'common/dtos/paginated-list.response.dto';
import type { Note } from 'modules/notes/entities/note.entity';

export const mockedListResponse: PaginatedListResponseDto = {
  count: 1,
  previous: undefined,
  next: '',
  results: [
    {
      title: 'dummy title',
      content: 'dummy content',
      flagId: 1,
    },
  ],
};

export const mockedDetailResponse: Note = {
  id: 1,
  title: 'dummy title',
  content: 'dummy content',
  flagId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};
