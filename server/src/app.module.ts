import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [TypeOrmModule.forRoot(), NotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
