import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserBio1787660173794 implements MigrationInterface {
  name = 'AddUserBio1787660173794';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "bio" character varying(500)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "bio"`);
  }
}
