import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialFile1696432856318 implements MigrationInterface {
    name = 'InitialFile1696432856318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`auction\` ADD \`imageSrc\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`auction\` DROP COLUMN \`itemName\``);
        await queryRunner.query(`ALTER TABLE \`auction\` ADD \`itemName\` varchar(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`auction\` DROP COLUMN \`itemName\``);
        await queryRunner.query(`ALTER TABLE \`auction\` ADD \`itemName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`auction\` DROP COLUMN \`imageSrc\``);
    }

}
