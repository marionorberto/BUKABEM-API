import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtContants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeaders(request);

    if (!token)
      throw new HttpException('invalid token', HttpStatus.UNAUTHORIZED);

    try {
      const payloads = this.jwtService.verifyAsync(token, {
        secret: jwtContants.secret,
      });

      request['user'] = payloads;
    } catch {
      throw new HttpException('token not valid', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }

  extractTokenFromHeaders(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'bearer' ? token : undefined;
  }
}
