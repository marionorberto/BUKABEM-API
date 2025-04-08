import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import {
  EnumMentorshipStatus,
  EnumMentorshipType,
} from 'src/models/mentorship-appointment/interfaces/interface';

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

  @ManyToOne(() => User, (user) => user.mentorshipAppointment)
  mentoring: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
