import { EntityRepository, Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostStatus } from './post-status.enum';
import { GetPostFilterDto } from './dto/get-post-filter.dto';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async getPosts(filterDto: GetPostFilterDto): Promise<Post[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('post');

    if (status) {
      query.andWhere('post.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(post.title) LIKE LOWER(:search) OR LOWER(post.body) LIKE LOWER(:search)',
        {
          search: `%${search}%`,
        },
      );
    }

    return await query.getMany();
  }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const { title, body } = createPostDto;
    const post = this.create({
      title,
      body,
      status: PostStatus.DRAFT,
    });

    return this.save(post);
  }
}
