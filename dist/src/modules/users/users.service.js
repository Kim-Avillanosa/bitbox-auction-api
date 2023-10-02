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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const debit_entity_1 = require("../debit/entities/debit.entity");
const credit_entity_1 = require("../credit/entities/credit.entity");
let UsersService = class UsersService {
    constructor(usersRepository, creditRepository, debitRepository) {
        this.usersRepository = usersRepository;
        this.creditRepository = creditRepository;
        this.debitRepository = debitRepository;
    }
    async create(createUserDto) {
        var request = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(request);
    }
    findAll() {
        var response = this.usersRepository.find({
            select: ['id', 'email', 'created_at', 'updated_at', 'deposits'],
        });
        return response;
    }
    findOne(id) {
        return this.usersRepository.findOne({
            select: ['id', 'email', 'created_at', 'updated_at', 'deposits'],
            where: {
                id: id,
            },
        });
    }
    findByEmail(email) {
        return this.usersRepository.findOne({
            where: {
                email: email,
            },
        });
    }
    async update(id, updateUserDto) {
        return this.usersRepository.update(id, updateUserDto);
    }
    async remove(id) {
        this.usersRepository.delete(id);
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(credit_entity_1.Credit)),
    __param(2, (0, typeorm_1.InjectRepository)(debit_entity_1.Debit)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map