import { MigrationInterface, QueryRunner } from "typeorm";

export class Sample1695925376711 implements MigrationInterface {
    name = 'Sample1695925376711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`sample\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`sample\``);
    }

}
