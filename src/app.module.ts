import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './models/profile/profile.module';
import { AuthModule } from './core/auth/auth.module';
import { PostsModule } from './models/posts/posts.module';
import { TypeOrmModule } from './config/datasource';
import { UsersModule } from './models/users/user.module';
import { NotificationsModule } from './models/notifications/notifications.module';
import { FileUploadModule } from './models/file-upload/file-upload.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './models/email/email.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 60000,
        limit: 10,
      },
      {
        name: 'medium',
        ttl: 60000,
        limit: 25,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 50,
      },
    ]),
    TypeOrmModule,
    UsersModule,
    AuthModule,
    PostsModule,
    ProfileModule,
    NotificationsModule,
    FileUploadModule,
    ConfigModule.forRoot({ isGlobal: true }),
    EmailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  constructor(private readonly datasource: DataSource) {}
}
