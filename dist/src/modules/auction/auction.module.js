"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionModule = void 0;
const common_1 = require("@nestjs/common");
const auction_service_1 = require("./auction.service");
const auction_controller_1 = require("./auction.controller");
const typeorm_1 = require("@nestjs/typeorm");
const auction_entity_1 = require("./entities/auction.entity");
const auctionbid_entity_1 = require("./entities/auctionbid.entity");
const jwt_service_1 = require("../../jwt/jwt.service");
const credit_entity_1 = require("../credit/entities/credit.entity");
let AuctionModule = class AuctionModule {
};
exports.AuctionModule = AuctionModule;
exports.AuctionModule = AuctionModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([auction_entity_1.Auction, auctionbid_entity_1.AuctionBid, credit_entity_1.Credit])],
        controllers: [auction_controller_1.AuctionController],
        providers: [auction_service_1.AuctionService, jwt_service_1.JWTUtil],
    })
], AuctionModule);
//# sourceMappingURL=auction.module.js.map