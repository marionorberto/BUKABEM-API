import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Notification } from '../notification/notification.entity';
import { EnumUserTypes } from 'src/models/users/interfaces/interfaces';
import { Feedback } from '../feedback/feedback.entity';
import { TestResult } from '../test-result/test-result';
import { MentorSocialNetwork } from '../mentor-social-network.ts/mentor-social-network';
import { Turm } from '../turm/turm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Column({ name: 'username', type: 'varchar', length: '40', unique: true })
  username: string;

  @Column({ name: 'email', type: 'varchar', length: '40', unique: true })
  email: string;

  @Column({ name: 'password_hash', type: 'text' })
  @Exclude()
  password: string;

  @Column({ name: 'type', type: 'enum', enum: EnumUserTypes })
  type: EnumUserTypes;

  @OneToMany(() => TestResult, (testResult) => testResult.user, {
    cascade: true,
    eager: true,
  })
  testResult: TestResult[];

  @OneToMany(() => Notification, (notification) => notification.user, {
    cascade: true,
    eager: true,
  })
  notification: Notification[];

  @OneToMany(() => Feedback, (feedback) => feedback.autor, {
    cascade: true,
    eager: true,
  })
  feedback: Feedback[];

  @OneToMany(() => MentorSocialNetwork, (socialNetwork) => socialNetwork.user, {
    cascade: true,
    eager: true,
  })
  mentorSocialNetworkUrl: MentorSocialNetwork[];

  @ManyToMany(() => Turm, { cascade: true, eager: true })
  @JoinTable()
  turm: Turm[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcryptjs.genSalt(10);
      this.password = await bcryptjs.hash(this.password, salt);
    }
  }
}
