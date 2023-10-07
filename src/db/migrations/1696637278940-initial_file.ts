import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialFile1696637278940 implements MigrationInterface {
  name = 'InitialFile1696637278940';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`auction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`itemName\` varchar(50) NOT NULL, \`created_by\` varchar(255) NOT NULL, \`startPrice\` decimal(5,2) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`expiration\` datetime NOT NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`status\` enum ('PENDING', 'ONGOING', 'COMPLETED') NOT NULL DEFAULT 'PENDING', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`credit\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`amount\` decimal(5,2) NOT NULL, \`userId\` int NOT NULL, \`status\` enum ('NEW', 'APPROVED', 'DECLINED') NOT NULL DEFAULT 'NEW', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`debit\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`amount\` decimal(5,2) NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`auction_bid\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`amount\` decimal(5,2) NOT NULL, \`userId\` int NOT NULL, \`auctionId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`credit\` ADD CONSTRAINT \`FK_9f5fdca6886a2ecdb6d34b23d70\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`debit\` ADD CONSTRAINT \`FK_970615c04f5acbda862ec606546\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`auction_bid\` ADD CONSTRAINT \`FK_cfb16c22a56316167f6c8db4596\` FOREIGN KEY (\`auctionId\`) REFERENCES \`auction\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`auction_bid\` ADD CONSTRAINT \`FK_f5ef1c6bb4242d326eb83c4fce7\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`auction_bid\` DROP FOREIGN KEY \`FK_f5ef1c6bb4242d326eb83c4fce7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`auction_bid\` DROP FOREIGN KEY \`FK_cfb16c22a56316167f6c8db4596\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`debit\` DROP FOREIGN KEY \`FK_970615c04f5acbda862ec606546\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`credit\` DROP FOREIGN KEY \`FK_9f5fdca6886a2ecdb6d34b23d70\``,
    );
    await queryRunner.query(`DROP TABLE \`auction_bid\``);
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`debit\``);
    await queryRunner.query(`DROP TABLE \`credit\``);
    await queryRunner.query(`DROP TABLE \`auction\``);
  }
}
