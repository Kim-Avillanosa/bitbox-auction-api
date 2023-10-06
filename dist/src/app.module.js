"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const cli_module_1 = require("./cli/cli.module");
const orm_config_1 = require("./db/orm.config");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const debit_module_1 = require("./modules/debit/debit.module");
const credit_module_1 = require("./modules/credit/credit.module");
const auction_module_1 = require("./modules/auction/auction.module");
const jwt_service_1 = require("./jwt/jwt.service");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const cron_module_1 = require("./modules/cron/cron.module");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
let AppModule = class AppModule {
    constructor(dataSource) { }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            users_module_1.UsersModule,
            cli_module_1.CliModule,
            auth_module_1.AuthModule,
            debit_module_1.DebitModule,
            credit_module_1.CreditModule,
            auction_module_1.AuctionModule,
            cron_module_1.CronModule,
            throttler_1.ThrottlerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => [
                    {
                        ttl: config.get('THROTTLE_TTL'),
                        limit: config.get('THROTTLE_LIMIT'),
                    },
                ],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: () => {
                    return orm_config_1.ormConfig;
                },
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'docs'),
                serveRoot: '/swagger',
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            jwt_service_1.JWTUtil,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    }),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AppModule);
//# sourceMappingURL=app.module.js.map