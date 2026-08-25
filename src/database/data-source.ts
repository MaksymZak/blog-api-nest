import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

// CLI не поднимает Nest, поэтому .env читаем сами
config();

/**
 * Подключение для консольной утилиты TypeORM (миграции).
 *
 * Это НЕ то подключение, которое использует приложение —
 * у приложения своё, через TypeOrmModule.forRootAsync в app.module.ts.
 * Утилита ничего не знает про Nest и ConfigService, поэтому ей нужен
 * отдельный файл, который она может просто импортировать.
 */
export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  // здесь сущности задаются глобом по файлам, а не через forFeature
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],

  synchronize: false,
  migrationsTableName: 'migrations',
});
