import { createMock } from '@golevelup/ts-jest';
import type { EntityRepository } from '@mikro-orm/core';
import { getRepositoryToken } from '@mikro-orm/nestjs';
import { NotFoundException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { PaginatedListResponseDto } from 'common/dtos/paginated-list.response.dto';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { Note } from '../entities/note.entity';
import { NotesService } from '../notes.service';
import { NotesModel, NotesModelNull } from '../tests/models/notes.model';

describe('NotesService', () => {
  let notesService: NotesService;
  let notesRepository: EntityRepository<Note>;
  const REPOSITORY_TOKEN = getRepositoryToken(Note);

  beforeEach(async () => {
    const mockDataRepository = {
      provide: REPOSITORY_TOKEN,
      useClass: NotesModel,
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [NotesService, mockDataRepository],
    })
      .overrideProvider(REQUEST)
      .useValue({ headers: { 'flag-id': 1 } })
      .useMocker(createMock)
      .compile();

    notesService = moduleRef.get<NotesService>(NotesService);
    notesRepository = moduleRef.get<EntityRepository<Note>>(REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(notesService).toBeDefined();
  });

  it('should be defined', () => {
    expect(notesRepository).toBeDefined();
  });

  describe('listNotes', () => {
    it('should obtain notes list', async () => {
      await expect(notesService.findAllByFlag()).resolves.toBeInstanceOf(PaginatedListResponseDto);
    });
  });

  describe('findOne', () => {
    it('should obtain one note', async () => {
      // TODO: It should be instanceof Note
      await expect(notesService.findOne(1)).resolves.toBeInstanceOf(Object);
    });
  });

  describe('create', () => {
    it('should create one note', async () => {
      const createData = new CreateNoteDto();
      createData.title = 'Hello World';
      createData.content = 'What is going on.';
      createData.flagId = 1;
      // TODO: It should be instanceof Note
      await expect(notesService.create(createData)).resolves.toBeInstanceOf(Object);
    });
  });

  describe('update', () => {
    const updateData = new UpdateNoteDto();
    updateData.title = 'Updated title';
    updateData.content = 'Example of a very long text but not that long';
    updateData.flagId = 1;

    it('should update one note', async () => {
      // TODO: It should be instanceof Note
      await expect(notesService.update(1, updateData)).resolves.toBeInstanceOf(Object);
    });
  });

  describe('remove', () => {
    it('should remove one note', async () => {
      await expect(notesService.remove(1)).resolves.toBeUndefined();
    });
  });
});

describe('NotesService No Data', () => {
  let notesService: NotesService;
  let notesRepository: EntityRepository<Note>;
  const REPOSITORY_TOKEN = getRepositoryToken(Note);

  beforeEach(async () => {
    const mockDataRepository = {
      provide: REPOSITORY_TOKEN,
      useClass: NotesModelNull,
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [NotesService, mockDataRepository],
    })
      .overrideProvider(REQUEST)
      .useValue({ headers: { 'flag-id': 0 } })
      .useMocker(createMock)
      .compile();

    notesService = moduleRef.get<NotesService>(NotesService);
    notesRepository = moduleRef.get<EntityRepository<Note>>(REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(notesService).toBeDefined();
  });

  it('should be defined', () => {
    expect(notesRepository).toBeDefined();
  });

  describe('listNotes', () => {
    it('should be empty list', async () => {
      await expect(notesService.findAllByFlag()).resolves.toBeInstanceOf(PaginatedListResponseDto);
    });
  });

  describe('findOne', () => {
    it('should throw error', async () => {
      await expect(notesService.findOne(20)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('update', () => {
    const updateData = new UpdateNoteDto();
    updateData.title = 'Updated title';
    updateData.content = 'Example of a very long text but not that long';
    updateData.flagId = 2;

    it('should throw error', async () => {
      await expect(notesService.update(1, updateData)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should throw error', async () => {
      await expect(notesService.remove(2)).rejects.toThrowError(NotFoundException);
    });
  });
});
