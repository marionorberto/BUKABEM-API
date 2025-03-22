import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Test } from '../test/test';

@Entity('test_result')
export class TestResult {
  @PrimaryGeneratedColumn('uuid', { name: 'test_result_id' })
  id: string;

  @Column({ name: 'score', type: 'int' })
  score: number;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  test: Test;

  @ManyToOne(() => User, (user) => user.testResult)
  user: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
