import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('mentor_social_network')
export class MentorSocialNetwork {
  @PrimaryGeneratedColumn('uuid', { name: 'mentor_social_network_id' })
  id: string;

  @Column({ name: 'description', type: 'varchar' })
  description: string;

  @Column({ name: 'url', type: 'varchar' })
  url: string;

  @ManyToOne(() => User, (user) => user.mentorSocialNetworkUrl)
  user: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
