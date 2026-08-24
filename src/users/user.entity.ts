import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

/**
 * Описание таблицы `users` в виде класса.
 * То же самое, что писали руками через CREATE TABLE в дне 8.
 *
 * Пока это только описание схемы — сервисы всё ещё работают
 * на массивах в памяти. Переезд на репозитории будет в дне 12.
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
