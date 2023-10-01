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
exports.CreditService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../users/entities/user.entity");
const credit_entity_1 = require("./entities/credit.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const debit_entity_1 = require("../debit/entities/debit.entity");
const common_2 = require("@nestjs/common");
let CreditService = class CreditService {
    constructor(usersRepository, creditRepository, debitRepository) {
        this.usersRepository = usersRepository;
        this.creditRepository = creditRepository;
        this.debitRepository = debitRepository;
    }
    async balance(userId) {
        const totalDebit = await this.debitRepository.sum('amount', {
            userId: userId,
        });
        const totalCredit = await this.creditRepository.sum('amount', {
            userId: userId,
        });
        return totalDebit - totalCredit;
    }
    async withdraw(userId, creditDto) {
        const currentBalance = await this.balance(userId);
        if (creditDto.amount >= currentBalance) {
            throw new common_2.BadRequestException('This transaction cannot be processed. The requested amount is higher than your current balance.');
        }
        else if (creditDto.amount <= 0) {
            throw new common_2.BadRequestException('This transaction cannot be processed. The requested amount is below the required amount');
        }
        const user = await this.usersRepository.findOneBy({
            id: userId,
        });
        const data = {
            amount: creditDto.amount,
            user: user,
        };
        this.creditRepository.create(data);
        return this.creditRepository.save(data);
    }
};
exports.CreditService = CreditService;
exports.CreditService = CreditService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(credit_entity_1.Credit)),
    __param(2, (0, typeorm_1.InjectRepository)(debit_entity_1.Debit)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CreditService);
//# sourceMappingURL=credit.service.js.map