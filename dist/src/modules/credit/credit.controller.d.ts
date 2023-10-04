import { CreditService } from './credit.service';
import { CreditDto } from './dto/credit.dto';
import { JWTUtil } from '../../jwt/jwt.service';
export declare class CreditController {
    private readonly creditService;
    private readonly jwtUtil;
    constructor(creditService: CreditService, jwtUtil: JWTUtil);
    withdraw(createDebitDto: CreditDto, req: any): Promise<{
        amount: number;
        user: import("../users/entities/user.entity").User;
    } & import("./entities/credit.entity").Credit>;
}
