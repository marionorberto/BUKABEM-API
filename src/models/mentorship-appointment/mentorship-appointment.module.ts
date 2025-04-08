import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MentorshipAppointment } from 'src/database/entities/mentorship-appointment/mentorship-appointment.entity';
import { MentorshipAppointmentController } from './mentorship-appointment.controller';
import { MentorshipAppointmentService } from './mentorship-appointment.service';
import { UsersModule } from 'src/models/users/users.module';
import { User } from 'src/database/entities/user/user.entity';
import { UsersService } from 'src/models/users/users.service';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([MentorshipAppointment, User]),
  ],
  controllers: [MentorshipAppointmentController],
  providers: [MentorshipAppointmentService, UsersService],
  exports: [MentorshipAppointmentService, UsersService],
})
export class MentorshipAppointmentModule {}
