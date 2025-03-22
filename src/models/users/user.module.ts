import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user/user.entity';
import { Followers } from 'src/database/entities/followers/followers.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Followers])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
