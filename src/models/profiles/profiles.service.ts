import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/database/entities/profile/profile.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { User } from 'src/database/entities/user/user.entity';
import { Request } from 'express';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UsersService,
  ) {}

  async findAll() {
    try {
      const allProfiles = await this.profilesRepository.find({
        relations: {
          user: true,
        },
        order: {
          createdAt: 'DESC',
        },
      });

      return {
        statusCode: 200,
        method: 'GET',
        message: 'profiles fetched sucessfully.',
        data: [{ count: allProfiles }, allProfiles],
        path: '/profiles',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(`Failed to fetch profiles | Error Message: ${error.message}`);
      throw new HttpException(
        {
          statusCode: 400,
          method: 'GET',
          message: 'Failure to fetch profiles.',
          path: '/profiles/all',
          timestamp: Date.now(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(createProfileDto: CreateProfileDto) {
    try {
      const [lastUserCreated] = await this.userRepository.find({
        order: { createdAt: 'DESC' },
        take: 1,
      });

      if (!lastUserCreated) {
        throw new Error('Nenhum usuário encontrado para criar perfil.');
      }

      const profileToSave = this.profilesRepository.create({
        ...createProfileDto,
        user: lastUserCreated,
      });

      const profileSaved = await this.profilesRepository.save(profileToSave);

      const {
        id,
        birthday,
        sex,
        course,
        classe,
        imgUrl,
        personalDescription,
        professionalExperience,
        user,
        createdAt,
      } = profileSaved;

      return {
        statusCode: 201,
        method: 'POST',
        message: 'Profile created sucessfully',
        data: {
          id,
          birthday,
          sex,
          course,
          classe,
          imgUrl,
          personalDescription,
          professionalExperience,
          user,
          createdAt,
        },
        path: '/profiles/create/profile',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(
        `Failed to create new Profile | Error Message: ${error.message}`,
      );

      throw new HttpException(
        {
          statusCode: 400,
          method: 'POST',
          message: 'Failed to create new Profile',
          error: error.message,
          path: '/profiles/create/profile',
          timestamp: Date.now(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByPk(request: Request) {
    try {
      const { idUser } = request['user'];

      const profile = await this.profilesRepository
        .createQueryBuilder('profile')
        .leftJoinAndSelect('profile.tags', 'tag')
        .where('profile.userId = :userId', { userId: idUser })
        .getOne();

      return {
        statusCode: 200,
        method: 'GET',
        message: 'Profile fetched sucessfully.',
        data: profile,
        path: '/profile',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(
        `Failed to fetch this Profile. | Error Message: ${error.message}`,
      );

      throw new HttpException(
        {
          statusCode: 404,
          method: 'GET',
          message: 'Failed to fetch this profile.',
          error: error.message,
          path: '/profile',
          timestamp: Date.now(),
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateOne(request: Request, updateTagDto: Partial<UpdateProfileDto>) {
    try {
      const { idUser } = request['user'];

      const profiles = await this.profilesRepository
        .createQueryBuilder('profile')
        .leftJoin('profile.tags', 'tag')
        .where('profile.userId = :userId', { userId: idUser })
        .getMany();

      await this.profilesRepository.update(profiles[0].id, updateTagDto);

      const { user, birthday, createdAt, updatedAt } =
        await this.profilesRepository.findOneBy({ id: profiles[0].id });

      return {
        statusCode: 200,
        method: 'PUT',
        message: 'Profile updated sucessfully',
        data: {
          id: profiles[0].id,
          user,
          birthday,
          createdAt,
          updatedAt,
        },
        path: '/profiles/profile/:id',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(
        `Failed to update new Profile | Error Message: ${error.message}`,
      );

      throw new HttpException(
        {
          statusCode: 400,
          method: 'PUT',
          message: 'Não foi possível atualizar o dados do perfil do usuário!',
          error: error.message,
          path: '/profiles/profile/:id',
          timestamp: Date.now(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteOne(id: string) {
    try {
      const tagToDelete = await this.profilesRepository.findOneBy({ id });
      if (!tagToDelete)
        throw new HttpException(
          {
            statusCode: 404,
            method: 'GET',
            message: 'Profile Not Found',
            path: '/profiles/profile/:id',
            timestamp: Date.now(),
          },
          HttpStatus.NOT_FOUND,
        );

      await this.profilesRepository.remove(tagToDelete);

      return {
        statusCode: 200,
        method: 'DELETE',
        message: 'Profile deleted sucessfully',
        path: '/profiles/delete/profile/:id',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.log(`Failed to delete Profile | Error Message: ${error.message}`);

      throw new HttpException(
        {
          statusCode: 400,
          method: 'DELETE',
          message: 'Failed to delete Profile',
          error: error.message,
          path: '/profiles/delete/profile/:id',
          timestamp: Date.now(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
