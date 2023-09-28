import { MigrationInterface, QueryRunner } from "typeorm";

export class RevertSample1695925434739 implements MigrationInterface {
    name = 'RevertSample1695925434739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`sample\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`sample\` varchar(255) NOT NULL`);
    }

}
