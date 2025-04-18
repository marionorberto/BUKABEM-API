import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MentorshipAppointment } from '../mentorship-appointment/mentorship-appointment.entity';

@Entity('tag_mentorship')
export class TagMentorship {
  @PrimaryGeneratedColumn('uuid', { name: 'tag_mentorship' })
  id: string;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @ManyToOne(() => MentorshipAppointment, (mentorship) => mentorship.tag, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  mentorship: MentorshipAppointment;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
