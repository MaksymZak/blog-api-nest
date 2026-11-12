import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    // Дженерик Repository<Post> стирается при компиляции — в design:paramtypes
    // попадёт просто Repository. Поэтому токен указываем явно.
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly usersService: UsersService,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) throw new NotFoundException(`Пост ${id} не найден`);
    return post;
  }

  async create(dto: CreatePostDto): Promise<Post> {
    await this.usersService.findOne(dto.authorId); // бросит 404, если автора нет

    const post = this.postsRepository.create(dto); // только создаёт объект
    return this.postsRepository.save(post); // а вот это пишет в базу
  }

  async update(id: number, dto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id); // findOne сам бросит 404
    Object.assign(post, dto);
    return this.postsRepository.save(post);
  }

  async remove(id: number): Promise<void> {
    const result = await this.postsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Пост ${id} не найден`);
    }
  }
}
