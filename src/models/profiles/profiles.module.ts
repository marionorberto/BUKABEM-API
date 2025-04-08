import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Profile } from 'src/database/entities/profile/profile.entity';
import { ProfileController } from './profiles.controller';
import { ProfileService } from './profiles.service';
import { UsersModule } from 'src/models/users/users.module';
import { User } from 'src/database/entities/user/user.entity';
import { UsersService } from 'src/models/users/users.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Profile, User])],
  controllers: [ProfileController],
  providers: [ProfileService, UsersService],
  exports: [ProfileService, UsersService],
})
export class ProfileModule {}
