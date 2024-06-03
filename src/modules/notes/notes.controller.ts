import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiHeaders,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { PaginatedListResponseDto } from 'common/dtos/paginated-list.response.dto';
import { ApiKeyAuthGuard } from 'core/auth/guards/key-auth.guard';
import { HeadersInterceptor } from 'core/interceptors/headers.interceptor';
import type { CreateNoteDto } from './dto/create-note.dto';
import type { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { NotesService } from './notes.service';

@UseGuards(ApiKeyAuthGuard)
@UseInterceptors(HeadersInterceptor)
@ApiTags('Notes')
@ApiSecurity('api-key', ['api-key'])
@Controller('notes')
@ApiHeaders([
  {
    name: 'flag',
    description: 'Requested flag name',
    example: 'paris',
    required: true,
  },
])
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  @ApiOperation({ summary: 'Get notes list', description: 'A more detailed explanation of what the api does' })
  @ApiParam({
    name: 'limit',
    required: false,
    description: 'paginated list limit',
  })
  @ApiParam({
    name: 'offset',
    required: false,
    description: 'paginated list offset',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'An array of notes by flag',
    type: PaginatedListResponseDto,
    isArray: true,
  })
  findAll(@Param('limit') limit?: number, @Param('offset') offset?: number): Promise<PaginatedListResponseDto> {
    return this.notesService.findAllByFlag(limit, offset);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find note by id', description: 'A more detailed explanation of what the api does' })
  @ApiParam({
    name: 'id',
    description: 'Wanted note id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'note details',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create note', description: 'A more detailed explanation of what the api does' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Note,
    description: 'Created note',
  })
  create(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return this.notesService.create(createNoteDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update note', description: 'A more detailed explanation of what the api does' })
  @ApiParam({
    name: 'id',
    description: 'Note ID to update',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Note,
    description: 'Updated note',
  })
  @ApiNotFoundResponse({
    description: 'Note not found',
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateNoteDto: UpdateNoteDto): Promise<Note> {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete note', description: 'A more detailed explanation of what the api does' })
  @ApiParam({
    name: 'id',
    description: 'Note ID to delete',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiNotFoundResponse({
    description: 'Note not found',
  })
  remove(@Param('id') id: number): Promise<void> {
    return this.notesService.remove(id);
  }
}
