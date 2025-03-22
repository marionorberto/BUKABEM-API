import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUsersDto } from './dtos/create-users.dto';
import { UpdateUsersDto } from './dtos/update-users.dto';
import { AuthGuard } from '../../shared/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly usersServices: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('all')
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    return await this.usersServices.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('user/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findByPk(@Param('id') id: string) {
    return await this.usersServices.findByPk(id);
  }

  @Post('create/user')
  create(@Body() createUserDto: CreateUsersDto) {
    return this.usersServices.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Put('update/user/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() updateUsersDto: UpdateUsersDto,
  ) {
    return await this.usersServices.updateOne(id, updateUsersDto);
  }

  @UseGuards(AuthGuard)
  @Delete('delete/user/:id')
  async deleteOne(@Param('id') id: string) {
    return await this.usersServices.deleteOne(id);
  }
}
