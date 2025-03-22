import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('feedback')
export class Feedback {
  @PrimaryGeneratedColumn('uuid', { name: 'feedback_id' })
  id: string;

  @Column({ name: 'comment', type: 'varchar', nullable: true })
  comment: string;

  @Column({ name: 'score', type: 'int', default: 0 })
  score: number;

  @ManyToOne(() => User, (users) => users.feedback)
  autor: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  // Pensar bem sobre quem dá o feedback:
  // @ManyToOne(() => User, (users) => users.notifications)
  // mentorship: MentorShip;
}
