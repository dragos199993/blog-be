export interface Post {
  id: string;
  title: string;
  body: string;
  status: PostStatus;
}

export enum PostStatus {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
}
