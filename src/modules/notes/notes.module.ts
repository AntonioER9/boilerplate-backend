import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { LoggerModule } from 'core/logger/logger.module';
import { Note } from './entities/note.entity';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

@Module({
  imports: [
    LoggerModule,
    MikroOrmModule.forFeature({
      entities: [Note],
    }),
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
