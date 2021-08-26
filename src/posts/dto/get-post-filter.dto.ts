import { PostStatus } from '../post.model';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class GetPostFilterDto {
  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
