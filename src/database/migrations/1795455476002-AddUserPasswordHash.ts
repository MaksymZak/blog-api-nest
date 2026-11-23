import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserPasswordHash1795455476002 implements MigrationInterface {
  name = 'AddUserPasswordHash1795455476002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password_hash" character varying NOT NULL DEFAULT ''`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password_hash"`);
  }
}
