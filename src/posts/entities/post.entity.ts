import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column('text')
  body: string;

  // Индекс по внешнему ключу — Postgres не создаёт его автоматически (день 9)
  @Index()
  @Column({ name: 'author_id' })
  authorId: number;

  // Стрелка () => User, а не просто User: откладывает обращение к классу
  // до момента построения схемы — иначе циклические импорты дадут undefined
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
