import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedTestCol1696671250492 implements MigrationInterface {
    name = 'AddedTestCol1696671250492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`debit\` ADD \`test\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`debit\` DROP COLUMN \`test\``);
    }

}
