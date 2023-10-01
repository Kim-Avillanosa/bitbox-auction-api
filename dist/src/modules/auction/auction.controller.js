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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionController = void 0;
const common_1 = require("@nestjs/common");
const auction_service_1 = require("./auction.service");
const create_auction_dto_1 = require("./dto/create-auction.dto");
const bid_dto_1 = require("./dto/bid.dto");
const auth_guard_1 = require("../auth/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const jwt_service_1 = require("../../jwt/jwt.service");
const common_2 = require("@nestjs/common");
const auction_entity_1 = require("./entities/auction.entity");
let AuctionController = class AuctionController {
    constructor(auctionService, jwtUtil) {
        this.auctionService = auctionService;
        this.jwtUtil = jwtUtil;
    }
    create(createAuctionDto) {
        return this.auctionService.create(createAuctionDto);
    }
    start(id) {
        return this.auctionService.startBid(id);
    }
    placeBid(id, bid, req) {
        const authHeader = req.headers.authorization;
        const token = this.jwtUtil.decode(authHeader);
        return this.auctionService.placeBid(id, token.sub, bid);
    }
    getHigestBidder(id) {
        return this.auctionService.highestBidder(id);
    }
    getAuctions(status) {
        return this.auctionService.getAuctions(status);
    }
};
exports.AuctionController = AuctionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auction_dto_1.CreateAuctionDto]),
    __metadata("design:returntype", void 0)
], AuctionController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/start'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuctionController.prototype, "start", null);
__decorate([
    (0, common_1.Post)(':id/bid'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, bid_dto_1.BidDto, Object]),
    __metadata("design:returntype", void 0)
], AuctionController.prototype, "placeBid", null);
__decorate([
    (0, common_1.Get)(':id/best'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuctionController.prototype, "getHigestBidder", null);
__decorate([
    (0, common_1.Get)(':status'),
    __param(0, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuctionController.prototype, "getAuctions", null);
exports.AuctionController = AuctionController = __decorate([
    (0, common_1.UseInterceptors)(common_2.ClassSerializerInterceptor),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('auction'),
    (0, swagger_1.ApiTags)('auction'),
    __metadata("design:paramtypes", [auction_service_1.AuctionService,
        jwt_service_1.JWTUtil])
], AuctionController);
//# sourceMappingURL=auction.controller.js.map