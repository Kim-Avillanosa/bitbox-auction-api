"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebitModule = void 0;
const common_1 = require("@nestjs/common");
const debit_service_1 = require("./debit.service");
const debit_controller_1 = require("./debit.controller");
const jwt_service_1 = require("../../jwt/jwt.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const debit_entity_1 = require("./entities/debit.entity");
let DebitModule = class DebitModule {
};
exports.DebitModule = DebitModule;
exports.DebitModule = DebitModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([debit_entity_1.Debit, user_entity_1.User])],
        controllers: [debit_controller_1.DebitController],
        providers: [debit_service_1.DebitService, jwt_service_1.JWTUtil],
    })
], DebitModule);
//# sourceMappingURL=debit.module.js.map