"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCronDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_cron_dto_1 = require("./create-cron.dto");
class UpdateCronDto extends (0, swagger_1.PartialType)(create_cron_dto_1.CreateCronDto) {
}
exports.UpdateCronDto = UpdateCronDto;
//# sourceMappingURL=update-cron.dto.js.map