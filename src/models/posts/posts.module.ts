import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/database/entities/posts/posts.entity';
import { PostsContents } from 'src/database/entities/posts-contents/posts-contents.entity';
import { PostsSections } from 'src/database/entities/posts-sections/posts-sections.entity';
import { UsersService } from 'src/models/users/user.service';
import { User } from 'src/database/entities/user/user.entity';
import { Tags } from 'src/database/entities/tag/tag.entity';
import { TagsService } from 'src/models/tags/tags.service';
import { PostLikes } from 'src/database/entities/posts-likes/posts-likes.entity';
import { PostComments } from 'src/database/entities/posts-comments/posts-comments.entity';
import { PostSaved } from 'src/database/entities/posts-saved/posts-saved.entity';
import { Followers } from 'src/database/entities/followers/followers.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Posts,
      PostsSections,
      PostsContents,
      User,
      Tags,
      PostLikes,
      PostComments,
      PostSaved,
      Followers,
    ]),
  ],
  providers: [PostsService, UsersService, TagsService],
  controllers: [PostsController],
  exports: [PostsService, UsersService, TagsService],
})
export class PostsModule {}
