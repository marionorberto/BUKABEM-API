import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Test } from '../test/test';

enum EnumMentorshipStatus {
  PENDIND = 'pendente',
  ACCEPTED = 'aceita',
  CONCLUDED = 'concluida',
  REJECTED = 'rejeitada',
}

@Entity('question')
export class Question {
  @PrimaryGeneratedColumn('uuid', { name: 'question_id' })
  id: string;

  @Column({ name: 'enunciation', type: 'varchar' })
  enunciation: string;

  @Column({ name: 'replyOption', type: 'json' })
  replyOption: string;

  @Column({ name: 'correctOrder', type: 'int' })
  correctOrder: number;

  @Column({ name: 'status', type: 'enum', enum: EnumMentorshipStatus })
  status: EnumMentorshipStatus;

  @CreateDateColumn({ name: 'inviteDate', type: 'date' })
  inviteDate: Date;

  @ManyToOne(() => Test, (test) => test.question)
  test: Test[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
