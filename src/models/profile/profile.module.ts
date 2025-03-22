import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Profile } from 'src/database/entities/profile/profile.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { UsersModule } from 'src/models/users/user.module';
import { User } from 'src/database/entities/user/user.entity';
import { UsersService } from 'src/models/users/user.service';
import { TagsModule } from 'src/models/tags/tags.module';
import { TagsService } from 'src/models/tags/tags.service';
import { Tags } from 'src/database/entities/tag/tag.entity';
import { Followers } from 'src/database/entities/followers/followers.entity';

@Module({
  imports: [
    UsersModule,
    TagsModule,
    TypeOrmModule.forFeature([Profile, User, Tags, Followers]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, UsersService, TagsService],
  exports: [ProfileService, UsersService, TagsService],
})
export class ProfileModule {}
