import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { EnumClass } from 'src/models/profile/interfaces/interface';
import { EnumCourse } from 'src/models/course/interfaces/interfaces';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn('uuid', { name: 'profile_id' })
  id: string;

  @Column({ name: 'birthday', type: 'date' })
  birthday: Date;

  @Column({ name: 'sex', type: 'varchar' })
  sex: string;

  @Column({ name: 'imgUrl', type: 'varchar', nullable: true })
  imgUrl: string;

  @Column({ name: 'class', type: 'enum', enum: EnumClass })
  class: EnumClass;

  @Column({ name: 'personalDescription', type: 'text', nullable: true })
  personalDescription: string;

  @Column({ name: 'professionalExperience', type: 'varchar', nullable: true })
  professionalExperience: string;

  @Column({ name: 'course', type: 'enum', enum: EnumCourse })
  course: EnumCourse;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  user: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
