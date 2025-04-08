import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Test } from '../test/test.entity';

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

  @Column({ name: 'enunciation', type: 'json' })
  enunciation: string;

  @Column({ name: 'reply_option', type: 'varchar' })
  replyOption: string;

  @Column({ name: 'correct_order', type: 'int' })
  correctOrder: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: EnumMentorshipStatus,
    default: EnumMentorshipStatus.PENDIND,
  })
  status: EnumMentorshipStatus;

  @CreateDateColumn({ name: 'invite_date', type: 'timestamp' })
  inviteDate: Date;

  @ManyToOne(() => Test, (test) => test.question)
  test: Test[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
