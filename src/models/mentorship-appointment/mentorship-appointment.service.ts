import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/database/entities/profile/profile.entity';
import { Repository } from 'typeorm';
import { CreateMentorshipAppointment } from './dtos/create-mentorship-appointment.dto';
import { UpdateMentorshipAppointment } from './dtos/update-mentorship-appointment.dto';
import { User } from 'src/database/entities/user/user.entity';
import { Request } from 'express';
import { UsersService } from '../users/users.service';
import { MentorshipAppointment } from 'src/database/entities/mentorship-appointment/mentorship-appointment.entity';
import { TagMentorship } from 'src/database/entities/tag-mentorship/tag-mentorship.entity';

@Injectable()
export class MentorshipAppointmentService {
  constructor(
    @InjectRepository(MentorshipAppointment)
    private readonly mentorshipAppointmentRepo: Repository<MentorshipAppointment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(TagMentorship)
    private readonly tagRepo: Repository<TagMentorship>,
    private readonly userService: UsersService,
  ) {}

  async findAll(request: Request) {
    try {
      const { userId } = request['user'];

      const appointments = await this.mentorshipAppointmentRepo.find({
        where: {
          mentoring: {
            id: userId,
          },
        },
        order: {
          createdAt: 'DESC',
        },
      });

      return {
        statusCode: 200,
        method: 'GET',
        message: 'all mentorship appointment fetched sucessfully.',
        data: [{ count: appointments.length }, appointments],
        path: '/mentorshipt-appointments/all',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(`Failed to fetch  | Error Message: ${error.message}`);
      throw new HttpException(
        {
          statusCode: 400,
          method: 'GET',
          message: 'Failure to fetch mentorship appointment.',
          path: '/mentorshipt-appointments/all',
          timestamp: Date.now(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(
    request: Request,
    createMentorshipAppointment: CreateMentorshipAppointment,
  ) {
    try {
      const { idUser } = request['user'];
      const user = await this.userRepository.findOne({
        where: {
          id: idUser,
        },
      });

      const mentorshipAppointmentToSave = this.mentorshipAppointmentRepo.create(
        {
          ...createMentorshipAppointment,
          mentoring: user,
        },
      );

      const savedMentorshipAppointment =
        await this.mentorshipAppointmentRepo.save(mentorshipAppointmentToSave);

      createMentorshipAppointment.tags.forEach(async (element) => {
        const newTag = this.tagRepo.create({
          description: element.description,
          mentorship: savedMentorshipAppointment,
        });
        await this.tagRepo.save(newTag);
      });

      return {
        statusCode: 201,
        method: 'POST',
        message: 'appointment requested created sucessfully',
        data: { a: savedMentorshipAppointment },
        path: '/mentorship-appointments/create/mentorship-appointment',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(
        `Failed to create new mentorship appointment | Error Message: ${error.message}`,
      );

      throw new HttpException(
        {
          statusCode: 400,
          method: 'POST',
          message: 'Failed to create new mentorship appointments',
          error: error.message,
          path: '/mentorship-appointments/create/mentorship-appointment',
          timestamp: Date.now(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // async findByPk(request: Request) {
  //   try {
  //     const { idUser } = request['user'];

  //     const profile = await this.profilesRepository
  //       .createQueryBuilder('profile')
  //       .leftJoinAndSelect('profile.tags', 'tag')
  //       .where('profile.userId = :userId', { userId: idUser })
  //       .getOne();

  //     return {
  //       statusCode: 200,
  //       method: 'GET',
  //       message: 'Profile fetched sucessfully.',
  //       data: profile,
  //       path: '/profile',
  //       timestamp: Date.now(),
  //     };
  //   } catch (error) {
  //     console.log(
  //       `Failed to fetch this Profile. | Error Message: ${error.message}`,
  //     );

  //     throw new HttpException(
  //       {
  //         statusCode: 404,
  //         method: 'GET',
  //         message: 'Failed to fetch this profile.',
  //         error: error.message,
  //         path: '/profile',
  //         timestamp: Date.now(),
  //       },
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  // }

  // async updateOne(
  //   request: Request,
  //   updateMentorshipAppointment: Partial<UpdateMentorshipAppointment>,
  // ) {
  //   try {
  //     const { idUser } = request['user'];

  //     const profiles = await this.profilesRepository
  //       .createQueryBuilder('profile')
  //       .leftJoin('profile.tags', 'tag')
  //       .where('profile.userId = :userId', { userId: idUser })
  //       .getMany();

  //     await this.profilesRepository.update(updateMentorshipAppointment);

  //     const { user, birthday, createdAt, updatedAt } =
  //       await this.profilesRepository.findOneBy({ id: profiles[0].id });

  //     return {
  //       statusCode: 200,
  //       method: 'PUT',
  //       message: 'Profile updated sucessfully',
  //       data: {
  //         id: profiles[0].id,
  //         user,
  //         birthday,
  //         createdAt,
  //         updatedAt,
  //       },
  //       path: '/profiles/profile/:id',
  //       timestamp: Date.now(),
  //     };
  //   } catch (error) {
  //     console.log(
  //       `Failed to update new Profile | Error Message: ${error.message}`,
  //     );

  //     throw new HttpException(
  //       {
  //         statusCode: 400,
  //         method: 'PUT',
  //         message: 'Não foi possível atualizar o dados do perfil do usuário!',
  //         error: error.message,
  //         path: '/profiles/profile/:id',
  //         timestamp: Date.now(),
  //       },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }

  // async deleteOne(id: string) {
  //   try {
  //     const tagToDelete = await this.profilesRepository.findOneBy({ id });
  //     if (!tagToDelete)
  //       throw new HttpException(
  //         {
  //           statusCode: 404,
  //           method: 'GET',
  //           message: 'Profile Not Found',
  //           path: '/profiles/profile/:id',
  //           timestamp: Date.now(),
  //         },
  //         HttpStatus.NOT_FOUND,
  //       );

  //     await this.profilesRepository.remove(tagToDelete);

  //     return {
  //       statusCode: 200,
  //       method: 'DELETE',
  //       message: 'Profile deleted sucessfully',
  //       path: '/profiles/delete/profile/:id',
  //       timestamp: Date.now(),
  //     };
  //   } catch (error) {
  //     console.log(`Failed to delete Profile | Error Message: ${error.message}`);

  //     throw new HttpException(
  //       {
  //         statusCode: 400,
  //         method: 'DELETE',
  //         message: 'Failed to delete Profile',
  //         error: error.message,
  //         path: '/profiles/delete/profile/:id',
  //         timestamp: Date.now(),
  //       },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }
}
