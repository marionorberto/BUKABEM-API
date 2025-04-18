import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import {
  EnumMentorshipStatus,
  EnumMentorshipType,
} from 'src/models/mentorship-appointment/interfaces/interface';
import { TagMentorship } from '../tag-mentorship/tag-mentorship.entity';

@Entity('mentorship_appointment')
export class MentorshipAppointment {
  @PrimaryGeneratedColumn('uuid', { name: 'mentorship_appointment_id' })
  id: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: EnumMentorshipStatus,
    default: EnumMentorshipStatus.PENDIND,
  })
  status: EnumMentorshipStatus;

  @CreateDateColumn({ name: 'invite_date', type: 'timestamp' })
  inviteDate: Date;

  @Column({ name: 'type', type: 'enum', enum: EnumMentorshipType })
  type: EnumMentorshipType;

  @Column({ name: 'message', type: 'text' })
  message: string;

  @ManyToOne(() => User, (user) => user.mentorshipAppointment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  mentoring: User;

  @OneToMany(() => TagMentorship, (tag) => tag.mentorship, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  tag: TagMentorship[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
