import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeFieldType21674583972660 implements MigrationInterface {
    name = 'ChangeFieldType21674583972660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Sources" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "Sources" ADD "date" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Sources" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "Sources" ADD "date" TIMESTAMP NOT NULL`);
    }

}
