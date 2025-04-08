import {
  Controller,
  Param,
  Body,
  Post,
  Get,
  Put,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MentorshipAppointmentService } from './mentorship-appointment.service';
import { CreateMentorshipAppointment } from './dtos/create-mentorship-appointment.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/shared/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('mentorship-appointments')
export class MentorshipAppointmentController {
  constructor(
    private mentorshipAppointmentService: MentorshipAppointmentService,
  ) {}

  @Get('all')
  async findAll(@Req() request: Request) {
    return await this.mentorshipAppointmentService.findAll(request);
  }

  // @Get('find/mentorship-appointment/:id')
  // async findByPk(@Param('id') id: string) {
  //   return await this.profileService.findByPk(id);
  // }

  @Post('create/mentorship-appointment')
  create(
    @Req() request: Request,
    @Body() createMentorshipAppointment: CreateMentorshipAppointment,
  ) {
    return this.mentorshipAppointmentService.create(
      request,
      createMentorshipAppointment,
    );
  }

  // @Put('update/mentorship-appointment/:id')
  // async updateOne(
  //   @Param('id') id: string,
  //   @Body() updateMentorshipAppointment: Partial<UpdateMentorshipAppointment>,
  // ) {
  //   return this.profileService.updateOne(request, updateMentorshipAppointment);
  // }

  // @Delete('delete/mentorship-appointment/:id')
  // async deleteOne(@Param('id') id: string) {
  //   return await this.profileService.deleteOne(id);
  // }
}
