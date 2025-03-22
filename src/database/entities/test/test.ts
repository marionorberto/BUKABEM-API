import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EnumTestMateria } from 'src/models/test/interfaces/interfaces';
import { Question } from '../question/question';

@Entity('test')
export class Test {
  @PrimaryGeneratedColumn('uuid', { name: 'test_id' })
  id: string;

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'materia', type: 'enum', enum: EnumTestMateria })
  materia: EnumTestMateria;

  @Column({ name: 'score', type: 'int', default: 0 })
  score: number;

  @OneToMany(() => Question, (question) => question.test, {
    cascade: true,
    eager: true,
  })
  question: Question[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
