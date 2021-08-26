import { Injectable, NotFoundException } from '@nestjs/common';
import { Post, PostStatus } from './post.model';
import { v4 as uuid } from 'uuid';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostFilterDto } from './dto/get-post-filter.dto';
import { UpdatePostStatusDto } from './dto/update-post-status.dto';

@Injectable()
export class PostsService {
  private posts: Post[] = [];

  getAllPosts(): Post[] {
    return this.posts;
  }

  getPostsWithFilters(filterDto: GetPostFilterDto): Post[] {
    const { status, search } = filterDto;
    let posts = this.getAllPosts();

    if (status) {
      posts = posts.filter((post) => post.status === status);
    }

    if (search) {
      posts = posts.filter(
        (post) => post.title.includes(search) || post.body.includes(search),
      );
    }

    return posts;
  }

  getPostById(id: string): Post {
    const post = this.posts.find((post) => post.id === id);

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  deletePost(id: string): void {
    this.getPostById(id);

    this.posts = this.posts.filter((post) => post.id !== id);
  }

  updatePostStatus(id: string, updatePostStatusDto: UpdatePostStatusDto): Post {
    const post = this.getPostById(id);
    post.status = updatePostStatusDto.status;

    return post;
  }

  createPost(createPostDto: CreatePostDto): Post {
    const { title, body } = createPostDto;
    const post: Post = {
      id: uuid(),
      title,
      body,
      status: PostStatus.DRAFT,
    };
    this.posts.push(post);

    return post;
  }
}
