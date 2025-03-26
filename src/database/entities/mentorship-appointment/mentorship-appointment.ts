import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

enum EnumMentorshipStatus {
  PENDIND = 'pendente',
  ACCEPTED = 'aceita',
  CONCLUDED = 'concluida',
  REJECTED = 'rejeitada',
}

enum EnumMentorshipType {
  PROJECTO = 'projecto',
  ESTUDANTIL = 'estudantil',
}

@Entity('mentorship_appointment')
export class MentorshipAppointment {
  @PrimaryGeneratedColumn('uuid', { name: 'mentorship_appointment_id' })
  id: string;

  mentoring: User[];

  mentor: User[];

  @Column({
    name: 'status',
    type: 'enum',
    enum: EnumMentorshipStatus,
    default: EnumMentorshipStatus.PENDIND,
  })
  status: EnumMentorshipStatus;

  @CreateDateColumn({ name: 'inviteDate', type: 'date' })
  inviteDate: Date;

  @Column({ name: 'type', type: 'enum', enum: EnumMentorshipType })
  type: EnumMentorshipType;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
