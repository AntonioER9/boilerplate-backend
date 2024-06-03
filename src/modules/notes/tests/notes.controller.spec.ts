import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from '../notes.controller';

describe('NotesController', () => {
  let controller: NotesController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
    })
      .useMocker(createMock)
      .compile();

    controller = moduleRef.get<NotesController>(NotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
