import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post as HttpPost,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './post.model';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostFilterDto } from './dto/get-post-filter.dto';
import { UpdatePostStatusDto } from './dto/update-post-status.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getPosts(@Query() filterDto: GetPostFilterDto): Post[] {
    if (Object.keys(filterDto).length) {
      return this.postsService.getPostsWithFilters(filterDto);
    }

    return this.postsService.getAllPosts();
  }

  @Get('/:id')
  getPostById(@Param('id') id: string): Post {
    return this.postsService.getPostById(id);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string): void {
    return this.postsService.deletePost(id);
  }

  @HttpPost()
  createPost(@Body() createPostDto: CreatePostDto): Post {
    return this.postsService.createPost(createPostDto);
  }

  @Patch('/:id/status')
  updatePostStatus(
    @Param('id') id: string,
    @Body() updatePostStatusDto: UpdatePostStatusDto,
  ): Post {
    return this.postsService.updatePostStatus(id, updatePostStatusDto);
  }
}
