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
import {
  EnumClasse,
  EnumCourse,
} from 'src/models/profiles/interfaces/interfaces';

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

  @Column({ name: 'classe', type: 'enum', enum: EnumClasse })
  classe: EnumClasse;

  @Column({ name: 'personal_description', type: 'text', nullable: true })
  personalDescription: string;

  @Column({ name: 'professional_experience', type: 'int', nullable: true })
  professionalExperience: number;

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
