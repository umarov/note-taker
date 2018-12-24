import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Note } from './note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
  ) {}

  public getAllNotes() {
    return this.notesRepository.find();
  }

  public getOneNote(id: number) {
    return this.notesRepository.findOne({ id });
  }

  public async createNote(note: Partial<Note>) {
    return this.notesRepository.save(
      await this.notesRepository.create(note)
    );
  }

  public async updateNote(id: number, note: Partial<Note>) {
    const { createdAt, updatedAt, ...restOfNote } = note;
    await this.notesRepository.update(id, restOfNote);

    return this.getOneNote(id);
  }

  public async deleteNote(id: number) {
    await this.notesRepository.delete(id);

    return {
      deleted: true,
    };
  }
}
