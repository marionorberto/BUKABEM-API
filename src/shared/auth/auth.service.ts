import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from 'src/models/users/users.service';
import { SignInDto } from './dtos/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ acess_token: string }> {
    try {
      const userData = await this.usersService.findOne({
        where: {
          email: signInDto.email,
        },
      });
      if (!userData.id)
        throw new HttpException(
          {
            statusCode: 401,
            method: 'POST',
            message: 'email ou password inválida!',
            path: '/users',
            timestamp: Date.now(),
          },
          HttpStatus.UNAUTHORIZED,
        );

      const isPasswordValid = await this.validatePassword(
        signInDto.password,
        userData.password,
      );

      if (!isPasswordValid)
        throw new HttpException(
          {
            statusCode: 401,
            method: 'POST',
            message: 'email ou password inválida!',
            path: '/users',
            timestamp: Date.now(),
          },
          HttpStatus.UNAUTHORIZED,
        );

      const payloads = {
        userId: userData.id,
        username: userData.username,
      };

      return { acess_token: await this.jwtService.signAsync(payloads) };
    } catch (error) {
      console.log(
        `Failed to authenticate User | Error Message: ${error.message}`,
      );

      throw new HttpException(
        {
          statusCode: 401,
          method: 'POST',
          message: 'email ou password inválida!',
          error: error.message,
          path: '/users',
          timestamp: Date.now(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcryptjs.compare(plainPassword, hashedPassword);
  }
}
