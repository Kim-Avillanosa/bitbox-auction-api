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
exports.Auction = exports.AuctionStatus = void 0;
const typeorm_1 = require("typeorm");
const auctionbid_entity_1 = require("./auctionbid.entity");
var AuctionStatus;
(function (AuctionStatus) {
    AuctionStatus["PENDING"] = "PENDING";
    AuctionStatus["ONGOING"] = "ONGOING";
    AuctionStatus["COMPLETED"] = "COMPLETED";
})(AuctionStatus || (exports.AuctionStatus = AuctionStatus = {}));
let Auction = class Auction {
};
exports.Auction = Auction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Auction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Auction.prototype, "itemName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Auction.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal' }),
    __metadata("design:type", Number)
], Auction.prototype, "startPrice", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Auction.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Auction.prototype, "expiration", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Auction.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: AuctionStatus,
        default: AuctionStatus.PENDING,
    }),
    __metadata("design:type", String)
], Auction.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => auctionbid_entity_1.AuctionBid, (bids) => bids.auction),
    __metadata("design:type", Array)
], Auction.prototype, "bids", void 0);
exports.Auction = Auction = __decorate([
    (0, typeorm_1.Entity)()
], Auction);
//# sourceMappingURL=auction.entity.js.map