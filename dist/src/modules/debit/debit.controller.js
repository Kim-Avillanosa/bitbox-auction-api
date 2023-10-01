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
exports.DebitController = void 0;
const common_1 = require("@nestjs/common");
const debit_service_1 = require("./debit.service");
const auth_guard_1 = require("../auth/auth.guard");
const jwt_service_1 = require("../../jwt/jwt.service");
const swagger_1 = require("@nestjs/swagger");
const deposit_dto_1 = require("./dto/deposit.dto");
const common_2 = require("@nestjs/common");
let DebitController = class DebitController {
    constructor(debitService, jwtUtil) {
        this.debitService = debitService;
        this.jwtUtil = jwtUtil;
    }
    deposit(createDebitDto, req) {
        const authHeader = req.headers.authorization;
        const token = this.jwtUtil.decode(authHeader);
        return this.debitService.deposit(token.sub, {
            amount: createDebitDto.amount,
        });
    }
};
exports.DebitController = DebitController;
__decorate([
    (0, common_1.Post)('deposit'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deposit_dto_1.DepositDto, Object]),
    __metadata("design:returntype", void 0)
], DebitController.prototype, "deposit", null);
exports.DebitController = DebitController = __decorate([
    (0, common_1.UseInterceptors)(common_2.ClassSerializerInterceptor),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('debit'),
    (0, swagger_1.ApiTags)('debit'),
    __metadata("design:paramtypes", [debit_service_1.DebitService,
        jwt_service_1.JWTUtil])
], DebitController);
//# sourceMappingURL=debit.controller.js.map