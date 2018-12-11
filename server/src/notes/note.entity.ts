
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  content: string;

  @Column('int')
  views: number;

}
