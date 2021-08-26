import { PostStatus } from '../post.model';
import { IsEnum } from 'class-validator';

export class UpdatePostStatusDto {
  @IsEnum(PostStatus)
  status: PostStatus;
}
