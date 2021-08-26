import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PostStatus } from './post-status.enum';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  status: PostStatus;
}
