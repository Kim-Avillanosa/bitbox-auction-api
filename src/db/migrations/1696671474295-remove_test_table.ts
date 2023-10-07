import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveTestTable1696671474295 implements MigrationInterface {
    name = 'RemoveTestTable1696671474295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`debit\` DROP COLUMN \`test\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`debit\` ADD \`test\` int NOT NULL`);
    }

}
