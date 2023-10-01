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
exports.CronService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const auction_entity_1 = require("../auction/entities/auction.entity");
const auctionbid_entity_1 = require("../auction/entities/auctionbid.entity");
const credit_entity_1 = require("../credit/entities/credit.entity");
const debit_entity_1 = require("../debit/entities/debit.entity");
const user_entity_1 = require("../users/entities/user.entity");
let CronService = class CronService {
    constructor(auctionRepository, auctionBidRepository, creditRepository, debitRepository, usersRepository) {
        this.auctionRepository = auctionRepository;
        this.auctionBidRepository = auctionBidRepository;
        this.creditRepository = creditRepository;
        this.debitRepository = debitRepository;
        this.usersRepository = usersRepository;
    }
    async getAuctions(status) {
        const currentDate = new Date();
        const query = this.auctionRepository
            .createQueryBuilder('auction')
            .leftJoin(auctionbid_entity_1.AuctionBid, 'bid', 'bid.auctionId = auction.id')
            .select(['auction', 'MAX(bid.amount) AS currentBid'])
            .where('auction.status = :status', { status })
            .andWhere('auction.expirationDate > :currentDate', { currentDate })
            .groupBy('auction.id')
            .getMany();
        return query;
    }
    async ping() {
        const pendingAuctions = await this.getAuctions(auction_entity_1.AuctionStatus.ONGOING);
        if (pendingAuctions.length <= 0) {
            return 'Nothing so far.';
        }
        pendingAuctions.forEach(async (item) => {
            const highestBidder = await this.auctionBidRepository.find({
                where: { auctionId: item.id },
                order: { amount: 'DESC' },
                take: 1,
                relations: ['user', 'auction'],
            });
            const highest = highestBidder[0];
            const others = highestBidder.filter((x) => x != highest);
            const highestCredit = await this.creditRepository.findOneBy({
                userId: highest.userId,
                amount: highest.amount,
            });
            highestCredit.status = credit_entity_1.CreditStatus.APPROVED;
            await this.creditRepository.update(highestCredit.id, highestCredit);
            others.forEach(async (other) => {
                const currentCredit = await this.creditRepository.findOneBy({
                    userId: highest.userId,
                    amount: highest.amount,
                });
                currentCredit.status = credit_entity_1.CreditStatus.DECLINED;
                await this.creditRepository.update(currentCredit.id, currentCredit);
            });
            const currentItem = item;
            currentItem.status = auction_entity_1.AuctionStatus.COMPLETED;
            this.auctionRepository.update(item.id, currentItem);
        });
        return `$scanned and changed ${pendingAuctions.length}`;
    }
};
exports.CronService = CronService;
exports.CronService = CronService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(auction_entity_1.Auction)),
    __param(1, (0, typeorm_1.InjectRepository)(auctionbid_entity_1.AuctionBid)),
    __param(2, (0, typeorm_1.InjectRepository)(credit_entity_1.Credit)),
    __param(3, (0, typeorm_1.InjectRepository)(debit_entity_1.Debit)),
    __param(4, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CronService);
//# sourceMappingURL=cron.service.js.map