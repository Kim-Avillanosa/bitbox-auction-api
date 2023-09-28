import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1695925234301 implements MigrationInterface {
    name = 'Initial1695925234301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`verified\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`verified\` tinyint NOT NULL DEFAULT '0'`);
    }

}
