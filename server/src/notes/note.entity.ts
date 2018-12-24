import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('varchar')
  public title: string;

  @Column('varchar', { nullable: true })
  public content: string;

  @Column('int', { nullable: true })
  public views: number;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
