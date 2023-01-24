import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeFieldType1674582665149 implements MigrationInterface {
    name = 'ChangeFieldType1674582665149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Sources" RENAME COLUMN "email" TO "link"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Sources" RENAME COLUMN "link" TO "email"`);
    }

}
