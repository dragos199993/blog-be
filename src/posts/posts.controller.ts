import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post as HttpPost,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostFilterDto } from './dto/get-post-filter.dto';
import { UpdatePostStatusDto } from './dto/update-post-status.dto';
import { Post } from './post.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  private logger = new Logger('PostController');

  constructor(private postsService: PostsService) {}

  @Get()
  getPosts(
    @Query() filterDto: GetPostFilterDto,
    @GetUser() user: User,
  ): Promise<Post[]> {
    this.logger.verbose(
      `User "${
        user.username
      }" retrieving all tasks with filters: "${JSON.stringify(filterDto)}"`,
    );
    return this.postsService.getPosts(filterDto, user);
  }

  @Get('/:id')
  getPostById(@Param('id') id: string, @GetUser() user: User): Promise<Post> {
    return this.postsService.getPostById(id, user);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.postsService.deletePost(id, user);
  }

  @HttpPost()
  createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<Post> {
    this.logger.verbose(
      `User "${user.username}" creating task with: "${JSON.stringify(
        createPostDto,
      )}"`,
    );
    return this.postsService.createPost(createPostDto, user);
  }

  @Patch('/:id/status')
  updatePostStatus(
    @Param('id') id: string,
    @Body() updatePostStatusDto: UpdatePostStatusDto,
    @GetUser() user: User,
  ): Promise<Post> {
    return this.postsService.updatePostStatus(id, updatePostStatusDto, user);
  }
}
