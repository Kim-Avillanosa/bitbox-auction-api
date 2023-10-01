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
exports.DebitService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const debit_entity_1 = require("./entities/debit.entity");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
let DebitService = class DebitService {
    constructor(usersRepository, debitRepository) {
        this.usersRepository = usersRepository;
        this.debitRepository = debitRepository;
    }
    async deposit(userId, depositDto) {
        const user = await this.usersRepository.findOneBy({
            id: userId,
        });
        const data = {
            amount: depositDto.amount,
            user: user,
        };
        this.debitRepository.create(data);
        return this.debitRepository.save(data);
    }
};
exports.DebitService = DebitService;
exports.DebitService = DebitService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_2.InjectRepository)(debit_entity_1.Debit)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], DebitService);
//# sourceMappingURL=debit.service.js.map