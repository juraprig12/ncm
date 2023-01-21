import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnToUser1674223699301 implements MigrationInterface {
    name = 'AddColumnToUser1674223699301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
