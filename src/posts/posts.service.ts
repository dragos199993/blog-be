import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from './post.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { UpdatePostStatusDto } from './dto/update-post-status.dto';
import { GetPostFilterDto } from './dto/get-post-filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) {}

  async getPostById(id: string, user: User): Promise<Post> {
    const post = await this.postRepository.findOne({ id, user });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    return this.postRepository.createPost(createPostDto, user);
  }

  async deletePost(id: string, user: User): Promise<void> {
    const result = await this.postRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  getPosts(filterDto: GetPostFilterDto, user: User): Promise<Post[]> {
    return this.postRepository.getPosts(filterDto, user);
  }

  async updatePostStatus(
    id: string,
    updatePostStatusDto: UpdatePostStatusDto,
    user: User,
  ): Promise<Post> {
    const post = await this.getPostById(id, user);
    post.status = updatePostStatusDto.status;

    return await this.postRepository.save(post);
  }
}
