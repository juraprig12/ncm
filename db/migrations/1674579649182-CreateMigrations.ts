import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMigrations1674579649182 implements MigrationInterface {
    name = 'CreateMigrations1674579649182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Sources" ("id" SERIAL NOT NULL, "comment" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "email" character varying NOT NULL, "usersId" integer, CONSTRAINT "PK_e1b783b9d78cdb5b482b663d1ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Sources" ADD CONSTRAINT "FK_a0e30ac68fafaf4ac955dbe885d" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Sources" DROP CONSTRAINT "FK_a0e30ac68fafaf4ac955dbe885d"`);
        await queryRunner.query(`DROP TABLE "Sources"`);
    }

}
