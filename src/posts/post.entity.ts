import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostStatus } from './post-status.enum';
import { User } from '../auth/user.entity';
import { Exclude } from 'class-transformer';

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

  @ManyToOne((_type) => User, (user) => user.posts, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
