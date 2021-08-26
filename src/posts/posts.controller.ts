import {
  Body,
  Controller,
  Delete,
  Get,
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

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getPosts(@Query() filterDto: GetPostFilterDto): Promise<Post[]> {
    return this.postsService.getPosts(filterDto);
  }

  @Get('/:id')
  getPostById(@Param('id') id: string): Promise<Post> {
    return this.postsService.getPostById(id);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string): Promise<void> {
    return this.postsService.deletePost(id);
  }

  @HttpPost()
  createPost(@Body() createPostDto: CreatePostDto): Promise<Post> {
    return this.postsService.createPost(createPostDto);
  }

  @Patch('/:id/status')
  updatePostStatus(
    @Param('id') id: string,
    @Body() updatePostStatusDto: UpdatePostStatusDto,
  ): Promise<Post> {
    return this.postsService.updatePostStatus(id, updatePostStatusDto);
  }
}
