import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCommentsTable1794497530910 implements MigrationInterface {
    name = 'AddCommentsTable1794497530910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "body" text NOT NULL, "post_id" integer NOT NULL, "author_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_259bf9825d9d198608d1b46b0b" ON "comments"  ("post_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_e6d38899c31997c45d128a8973" ON "comments"  ("author_id") `);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e6d38899c31997c45d128a8973b" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e6d38899c31997c45d128a8973b"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_259bf9825d9d198608d1b46b0b5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e6d38899c31997c45d128a8973"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_259bf9825d9d198608d1b46b0b"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
