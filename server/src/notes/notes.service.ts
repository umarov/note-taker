import {
  Injectable,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
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

  public async getOneNote(id: number) {
    const note = await this.notesRepository.findOne({ id });

    if (note) {
      return note;
    }

    throw new HttpException(
      `Note with the ID of ${id} was not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  public async createNote(note: Partial<Note>) {
    return this.notesRepository.save(this.notesRepository.create(note));
  }

  public async updateNote(id: number, note: Partial<Note>) {
    await this.getOneNote(id);

    const { createdAt, updatedAt, ...restOfNote } = note;
    await this.notesRepository.update(id, restOfNote);

    return this.getOneNote(id);
  }

  public async deleteNote(id: number) {
    if (await this.getOneNote(id)) {
      await this.notesRepository.delete(id);

      return {
        deleted: true,
      };
    }
  }
}
