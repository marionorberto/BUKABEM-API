import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EnumMentorshipStatus } from 'src/models/mentorship-appointment/interfaces/interfaces';
import { MentorshipAppointment } from '../mentorship-appointment/mentorship-appointment';

@Entity('mentorship_session')
export class MentorshipSession {
  @PrimaryGeneratedColumn('uuid', { name: 'mentorship_session_id' })
  id: string;

  @Column({ name: 'link_session', type: 'varchar' })
  linkSession: string;

  @Column({ name: 'status', type: 'enum', enum: EnumMentorshipStatus })
  status: EnumMentorshipStatus;

  @CreateDateColumn({ name: 'dateBooked', type: 'timestamp' })
  dateBooked: Date;

  @OneToOne(() => MentorshipAppointment, { cascade: true })
  @JoinColumn()
  mentorshipAppointment: MentorshipAppointment;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
