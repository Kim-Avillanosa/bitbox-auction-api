"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormConfig = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const configService = new config_1.ConfigService();
exports.ormConfig = {
    timezone: '+08:00',
    type: 'mysql',
    port: 3306,
    host: configService.get('TYPEORM_DATABASE_HOST'),
    username: configService.get('TYPEORM_DATABASE_USERNAME'),
    password: configService.get('TYPEORM_DATABASE_PASSWORD'),
    database: configService.get('TYPEORM_DATABASE_NAME'),
    logging: false,
    synchronize: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: ['dist/db/migration/*.{.ts,.js}'],
    migrationsRun: true,
    migrationsTableName: 'migrations',
};
const dataSource = new typeorm_1.DataSource(exports.ormConfig);
exports.default = dataSource;
//# sourceMappingURL=orm.config.js.map