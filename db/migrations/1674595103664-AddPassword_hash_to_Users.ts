import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordHashToUsers1674595103664 implements MigrationInterface {
    name = 'AddPasswordHashToUsers1674595103664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password_hash" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password_hash"`);
    }

}
