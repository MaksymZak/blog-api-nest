import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

/**
 * Описание таблицы `users` в виде класса.
 * То же самое, что писали бы руками через CREATE TABLE в дне 8.
 */
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // unique: true даёт и ограничение уникальности, и индекс под ним
  @Column({ unique: true, length: 255 })
  email: string;

  // тип колонки не указан — TypeORM возьмёт его из design:type (урок 6)
  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true, length: 500 })
  bio: string;

  @Exclude() // что это значит — разберём после эксперимента
  @Column({ name: 'password_hash', default: '' })
  passwordHash: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
