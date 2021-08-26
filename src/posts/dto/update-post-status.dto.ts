import { IsEnum } from 'class-validator';
import { PostStatus } from '../post-status.enum';

export class UpdatePostStatusDto {
  @IsEnum(PostStatus)
  status: PostStatus;
}
