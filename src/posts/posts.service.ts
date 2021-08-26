import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from './post.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { UpdatePostStatusDto } from './dto/update-post-status.dto';
import { GetPostFilterDto } from './dto/get-post-filter.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) {}

  async getPostById(id: string): Promise<Post> {
    const post = await this.postRepository.findOne(id);

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  createPost(createPostDto: CreatePostDto): Promise<Post> {
    return this.postRepository.createPost(createPostDto);
  }

  async deletePost(id: string): Promise<void> {
    const result = await this.postRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  getPosts(filterDto: GetPostFilterDto): Promise<Post[]> {
    return this.postRepository.getPosts(filterDto);
  }

  async updatePostStatus(
    id: string,
    updatePostStatusDto: UpdatePostStatusDto,
  ): Promise<Post> {
    const post = await this.getPostById(id);
    post.status = updatePostStatusDto.status;

    return await this.postRepository.save(post);
  }
}
