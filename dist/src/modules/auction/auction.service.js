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
exports.AuctionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auction_entity_1 = require("./entities/auction.entity");
const typeorm_2 = require("typeorm");
const common_2 = require("@nestjs/common");
const auctionbid_entity_1 = require("./entities/auctionbid.entity");
const credit_entity_1 = require("../credit/entities/credit.entity");
const debit_entity_1 = require("../debit/entities/debit.entity");
const convertGMTtoGMT8_1 = require("../../helper/convertGMTtoGMT8");
let AuctionService = class AuctionService {
    constructor(auctionRepository, auctionBidRepository, creditRepository, debitRepository) {
        this.auctionRepository = auctionRepository;
        this.auctionBidRepository = auctionBidRepository;
        this.creditRepository = creditRepository;
        this.debitRepository = debitRepository;
    }
    async getAuctions(status) {
        const query = this.auctionRepository
            .createQueryBuilder('auction')
            .leftJoin(auctionbid_entity_1.AuctionBid, 'bid', 'bid.auctionId = auction.id')
            .select(['auction', 'MAX(bid.amount) AS currentBid'])
            .where('auction.status = :status', { status })
            .groupBy('auction.id')
            .getRawMany();
        return query;
    }
    async getAuction(id) {
        const query = this.auctionRepository
            .createQueryBuilder('auction')
            .leftJoin(auctionbid_entity_1.AuctionBid, 'bid', 'bid.auctionId = auction.id')
            .select(['auction', 'MAX(bid.amount) AS currentBid'])
            .where('auction.id = :id', { id })
            .getRawOne();
        return query;
    }
    async create(created_by, createAuctionDto) {
        let timezoneDate = (0, convertGMTtoGMT8_1.passMsToTimezone)(createAuctionDto.duration);
        const data = {
            created_by: created_by,
            itemName: createAuctionDto.name,
            startPrice: createAuctionDto.startAmount,
            expiration: timezoneDate,
        };
        const createdAuction = this.auctionRepository.create(data);
        const savedAuction = await this.auctionRepository.save(createdAuction);
        return savedAuction;
    }
    async startBid(id) {
        const currentAuction = await this.auctionRepository.findOneBy({
            id: id,
        });
        currentAuction.status = auction_entity_1.AuctionStatus.ONGOING;
        return this.auctionRepository.update(id, currentAuction);
    }
    async getBidList(id) {
        const bidCount = await this.auctionBidRepository.count({
            where: {
                auctionId: id,
            },
        });
        if (bidCount > 0) {
            const highestBidder = await this.auctionBidRepository.find({
                where: { auctionId: id },
                order: { created_at: 'DESC' },
                relations: ['user', 'auction'],
            });
            return highestBidder;
        }
        return [];
    }
    async highestBidder(id) {
        const bidCount = await this.auctionBidRepository.count({
            where: {
                auctionId: id,
            },
        });
        if (bidCount > 0) {
            const highestBidder = await this.auctionBidRepository.find({
                where: { auctionId: id },
                order: { amount: 'DESC' },
                take: 1,
                relations: ['user', 'auction'],
            });
            return highestBidder[0];
        }
        return { message: 'No bids yet' };
    }
    async balance(id) {
        const totalDebit = await this.debitRepository.sum('amount', {
            userId: id,
        });
        const totalCreditResult = await this.creditRepository
            .createQueryBuilder()
            .select('SUM(amount)', 'total')
            .where('userId = :userId', { userId: id })
            .andWhere((qb) => {
            qb.where('status = :approved', {
                approved: credit_entity_1.CreditStatus.APPROVED,
            }).orWhere('status = :new', { new: credit_entity_1.CreditStatus.NEW });
        })
            .getRawOne();
        const totalCredit = parseFloat(totalCreditResult.total) || 0;
        const overall = totalDebit - totalCredit;
        return Promise.resolve({
            balance: overall,
        });
    }
    async placeBid(id, userId, bid) {
        const wallet = await this.balance(userId);
        const currentAuction = await this.auctionRepository.findOneBy({
            id: id,
        });
        const bidCount = await this.auctionBidRepository.count({
            where: {
                auctionId: id,
            },
        });
        const highestBid = await this.auctionBidRepository.maximum('amount', {
            auctionId: id,
        });
        if (wallet.balance < bid.amount)
            throw new common_2.BadRequestException(`Sorry, but it appears you don't have a sufficient balance to place a bid for that amount. Please check your account balance and try again with a valid bid amount.`);
        if (currentAuction.startPrice > bid.amount)
            throw new common_2.BadRequestException('Sorry, The submitted amount is lower than the start price');
        if (currentAuction.status !== auction_entity_1.AuctionStatus.ONGOING)
            throw new common_2.BadRequestException('Sorry, you can only place your bid on items that are currently being auctioned.');
        if (bidCount > 0 && highestBid >= bid.amount)
            throw new common_2.BadRequestException('Sorry, The submitted amount is greater than the highest bid amount');
        const data = {
            amount: bid.amount,
            auctionId: id,
            userId: userId,
        };
        const creditData = {
            amount: bid.amount,
            userId: userId,
        };
        await this.creditRepository.create(creditData);
        await this.creditRepository.save(creditData);
        await this.auctionBidRepository.create(data);
        return this.auctionBidRepository.save(data);
    }
};
exports.AuctionService = AuctionService;
exports.AuctionService = AuctionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auction_entity_1.Auction)),
    __param(1, (0, typeorm_1.InjectRepository)(auctionbid_entity_1.AuctionBid)),
    __param(2, (0, typeorm_1.InjectRepository)(credit_entity_1.Credit)),
    __param(3, (0, typeorm_1.InjectRepository)(debit_entity_1.Debit)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AuctionService);
//# sourceMappingURL=auction.service.js.map