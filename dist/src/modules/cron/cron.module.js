"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronModule = void 0;
const common_1 = require("@nestjs/common");
const cron_service_1 = require("./cron.service");
const cron_controller_1 = require("./cron.controller");
const typeorm_1 = require("@nestjs/typeorm");
const credit_entity_1 = require("../credit/entities/credit.entity");
const auction_entity_1 = require("../auction/entities/auction.entity");
const auctionbid_entity_1 = require("../auction/entities/auctionbid.entity");
let CronModule = class CronModule {
};
exports.CronModule = CronModule;
exports.CronModule = CronModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([credit_entity_1.Credit, auction_entity_1.Auction, auctionbid_entity_1.AuctionBid])],
        controllers: [cron_controller_1.CronController],
        providers: [cron_service_1.CronService],
    })
], CronModule);
//# sourceMappingURL=cron.module.js.map