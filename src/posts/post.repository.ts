import { EntityRepository, Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostStatus } from './post-status.enum';
import { GetPostFilterDto } from './dto/get-post-filter.dto';
import { User } from '../auth/user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  private logger = new Logger('PostRepository', { timestamp: true });

  async getPosts(filterDto: GetPostFilterDto, user: User): Promise<Post[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('post');

    query.where({ user });

    if (status) {
      query.andWhere('post.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(post.title) LIKE LOWER(:search) OR LOWER(post.body) LIKE LOWER(:search))',
        {
          search: `%${search}%`,
        },
      );
    }

    try {
      return await query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user ${
          user.username
        }. Filter: ${JSON.stringify(filterDto)}`,
        error,
      );
      throw new InternalServerErrorException();
    }
  }

  async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const { title, body } = createPostDto;
    const post = this.create({
      title,
      body,
      status: PostStatus.DRAFT,
      user,
    });

    return this.save(post);
  }
}
