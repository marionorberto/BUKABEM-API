import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MentorshipAppointment } from 'src/database/entities/mentorship-appointment/mentorship-appointment.entity';
import { MentorshipAppointmentController } from './mentorship-appointment.controller';
import { MentorshipAppointmentService } from './mentorship-appointment.service';
import { UsersModule } from 'src/models/users/users.module';
import { User } from 'src/database/entities/user/user.entity';
import { UsersService } from 'src/models/users/users.service';
import { TagMentorship } from 'src/database/entities/tag-mentorship/tag-mentorship.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([MentorshipAppointment, User, TagMentorship]),
  ],
  controllers: [MentorshipAppointmentController],
  providers: [MentorshipAppointmentService, UsersService],
  exports: [MentorshipAppointmentService, UsersService],
})
export class MentorshipAppointmentModule {}
