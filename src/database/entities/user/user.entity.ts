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
import { EnumType } from 'src/models/users/interfaces/interfaces';
import { Feedback } from '../feedback/feedback.entity';
import { TestResult } from '../test-result/test-result.entity';
import { MentorSocialNetwork } from '../mentor-social-network.ts/mentor-social-network.entity';
import { Turm } from '../turm/turm.entity';
import { MentorshipAppointment } from '../mentorship-appointment/mentorship-appointment.entity';

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

  @Column({
    name: 'type',
    type: 'enum',
    enum: EnumType,
    default: EnumType.ESTUDANTE,
  })
  type: EnumType;

  @OneToMany(() => TestResult, (testResult) => testResult.user, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  testResult: TestResult[];

  @OneToMany(() => Notification, (notification) => notification.user, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  notification: Notification[];

  @OneToMany(() => Feedback, (feedback) => feedback.autor, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  feedback: Feedback[];

  @OneToMany(() => MentorSocialNetwork, (socialNetwork) => socialNetwork.user, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  mentorSocialNetworkUrl: MentorSocialNetwork[];

  @ManyToMany(() => Turm, {
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  turm: Turm[];

  @OneToMany(
    () => MentorshipAppointment,
    (mentorshipAppointment) => mentorshipAppointment.mentoring,
  )
  mentorshipAppointment: MentorshipAppointment;

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
