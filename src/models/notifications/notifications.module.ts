import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Notifications } from 'src/database/entities/notification/notification.entity';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { User } from 'src/database/entities/user/user.entity';
import { UsersService } from 'src/models/users/user.service';
import { Followers } from 'src/database/entities/followers/followers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notifications, User, Followers])],
  providers: [NotificationsService, UsersService],
  controllers: [NotificationsController],
  exports: [NotificationsService, UsersService],
})
export class NotificationsModule {}
