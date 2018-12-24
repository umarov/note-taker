import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './note.entity';

@Controller('notes')
export class NotesController {
  constructor(
    private readonly notesService: NotesService
  ) {}

  @Get()
  public index() {
    return this.notesService.getAllNotes();
  }

  @Get(':id')
  public show(@Param('id') id: number) {
    return this.notesService.getOneNote(id);
  }

  @Post()
  public create(@Body('note') note: Partial<Note>) {
    return this.notesService.createNote(note);
  }

  @Put(':id')
  public update(@Param('id') id: number, @Body('note') note: Partial<Note>) {
    return this.notesService.updateNote(id, note);
  }

  @Delete(':id')
  public delete(@Param(':id') id: number) {
    return this.notesService.deleteNote(id);
  }
}
