import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

export interface Post {
  id: number;
  title: string;
  body: string;
  authorId: number;
}

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UsersService) {}
  private posts: Post[] = [];
  private nextId = 1;

  create(data: Omit<Post, 'id'>): Post {
    this.usersService.findOne(data.authorId); // бросит 404, если автора нет
    const post = { id: this.nextId++, ...data };
    this.posts.push(post);
    return post;
  }

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const post = this.posts.find((p) => p.id === id);
    if (!post) throw new NotFoundException(`Пост ${id} не найден`);
    return post;
  }

  update(id: number, data: Partial<Omit<Post, 'id'>>): Post {
    const post = this.findOne(id); // findOne сам бросит 404, если не найден
    Object.assign(post, data);
    return post;
  }

  remove(id: number): void {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Пост ${id} не найден`);
    this.posts.splice(index, 1);
  }
}
