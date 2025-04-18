import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MentorProfile } from '../mentor-profile/mentor-profile.entity';

@Entity('mentor_major')
export class MentorMajor {
  @PrimaryGeneratedColumn('uuid', { name: 'mentor_major' })
  id: string;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @ManyToOne(() => MentorProfile, (mentor) => mentor.major, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  mentor: MentorProfile;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
