import { Injectable, NotFoundException } from '@nestjs/common';

export interface Post {
  id: number;
  title: string;
  body: string;
  authorId: number;
}

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private nextId = 1;

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const post = this.posts.find((p) => p.id === id);
    if (!post) throw new NotFoundException(`Пост ${id} не найден`);
    return post;
  }

  create(data: Omit<Post, 'id'>): Post {
    const post = { id: this.nextId++, ...data };
    this.posts.push(post);
    return post;
  }
}
