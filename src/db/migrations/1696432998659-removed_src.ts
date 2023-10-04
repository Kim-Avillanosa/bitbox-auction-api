import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedSrc1696432998659 implements MigrationInterface {
    name = 'RemovedSrc1696432998659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`auction\` DROP COLUMN \`imageSrc\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`auction\` ADD \`imageSrc\` varchar(255) NOT NULL`);
    }

}
