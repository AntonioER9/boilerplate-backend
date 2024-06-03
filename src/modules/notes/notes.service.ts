import type { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable, NotFoundException, Optional } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PaginatedListResponseDto } from 'common/dtos/paginated-list.response.dto';
import type { HelpCenterHeaders } from 'common/types/hc-header.type';
import { HelpCenterLogger } from 'core/logger/logger.service';
import type { Request } from 'express';
import type { CreateNoteDto } from './dto/create-note.dto';
import type { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @Inject(HelpCenterLogger)
    private readonly logger: HelpCenterLogger,
    @InjectRepository(Note)
    private readonly entityRepo: EntityRepository<Note>,
    @Inject(REQUEST)
    private request: Request,
    @Optional()
    @Inject('Headers')
    private hcHeaders: HelpCenterHeaders,
  ) {
    this.logger.setContext(NotesService.name);
    this.hcHeaders = this.request.headers as unknown as HelpCenterHeaders;
  }

  async findAllByFlag(limit?: number, offset?: number): Promise<PaginatedListResponseDto> {
    this.logger.hcDebug('findAllByFlag', 'trying to get all notes', { limit, offset });

    const list = new PaginatedListResponseDto();
    list.results = await this.entityRepo.find({ flagId: this.hcHeaders['flag-id'] });
    list.count = list.results.length;

    this.logger.hcDebug('findAllByFlag', 'notes returned', { count: list.count });
    return list;
  }

  async findOne(id: number): Promise<Note> {
    this.logger.hcDebug('findOne', 'trying to find one note with ID', { id });

    const note = await this.entityRepo.findOne({ id: id });
    if (!note) {
      this.logger.hcWarn('findOne', `Note with id not found`, { id });
      throw new NotFoundException(`Note with id ${id} not found`);
    }

    this.logger.hcDebug('findOne', 'note found', { note });
    return note;
  }

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    this.logger.hcDebug('create', 'trying to create note', { createNoteDto });

    const note = new Note(createNoteDto.title, createNoteDto.content, createNoteDto.flagId);
    await this.entityRepo.persistAndFlush(note);

    this.logger.hcDebug('create', 'note created', { note });
    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    this.logger.hcDebug('findOne', `trying to update note with ID: ${id}`, {
      updateNoteDto,
    });

    const note = await this.findOne(id);
    if (updateNoteDto.title) note.title = updateNoteDto.title;
    if (updateNoteDto.content) note.content = updateNoteDto.content;
    await this.entityRepo.persistAndFlush(note);

    this.logger.hcDebug('create', 'note updated', { note });
    return note;
  }

  async remove(id: number): Promise<void> {
    this.logger.hcDebug('remove', `trying to delete note with ID: ${id}`);

    const note = await this.findOne(id);
    await this.entityRepo.removeAndFlush(note);

    this.logger.hcDebug('create', 'note removed', { note });
  }
}
