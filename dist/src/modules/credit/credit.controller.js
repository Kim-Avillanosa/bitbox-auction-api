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
exports.CreditController = void 0;
const common_1 = require("@nestjs/common");
const credit_service_1 = require("./credit.service");
const credit_dto_1 = require("./dto/credit.dto");
const jwt_service_1 = require("../../jwt/jwt.service");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
const common_2 = require("@nestjs/common");
let CreditController = class CreditController {
    constructor(creditService, jwtUtil) {
        this.creditService = creditService;
        this.jwtUtil = jwtUtil;
    }
    withdraw(createDebitDto, req) {
        const authHeader = req.headers.authorization;
        const token = this.jwtUtil.decode(authHeader);
        return this.creditService.withdraw(token.sub, {
            amount: createDebitDto.amount,
        });
    }
};
exports.CreditController = CreditController;
__decorate([
    (0, common_1.Post)('withdraw'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [credit_dto_1.CreditDto, Object]),
    __metadata("design:returntype", void 0)
], CreditController.prototype, "withdraw", null);
exports.CreditController = CreditController = __decorate([
    (0, common_1.UseInterceptors)(common_2.ClassSerializerInterceptor),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('credit'),
    __metadata("design:paramtypes", [credit_service_1.CreditService,
        jwt_service_1.JWTUtil])
], CreditController);
//# sourceMappingURL=credit.controller.js.map