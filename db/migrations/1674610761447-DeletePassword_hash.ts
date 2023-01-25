import { MigrationInterface, QueryRunner } from "typeorm";

export class DeletePasswordHash1674610761447 implements MigrationInterface {
    name = 'DeletePasswordHash1674610761447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password_hash"`);
        await queryRunner.query(`ALTER TABLE "Sources" DROP CONSTRAINT "FK_a0e30ac68fafaf4ac955dbe885d"`);
        await queryRunner.query(`ALTER TABLE "Sources" ALTER COLUMN "usersId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Sources" ADD CONSTRAINT "FK_a0e30ac68fafaf4ac955dbe885d" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Sources" DROP CONSTRAINT "FK_a0e30ac68fafaf4ac955dbe885d"`);
        await queryRunner.query(`ALTER TABLE "Sources" ALTER COLUMN "usersId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Sources" ADD CONSTRAINT "FK_a0e30ac68fafaf4ac955dbe885d" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password_hash" character varying`);
    }

}
