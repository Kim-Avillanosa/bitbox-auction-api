import { DebitService } from './debit.service';
import { JWTUtil } from '../../jwt/jwt.service';
import { DepositDto } from './dto/deposit.dto';
export declare class DebitController {
    private readonly debitService;
    private readonly jwtUtil;
    constructor(debitService: DebitService, jwtUtil: JWTUtil);
    deposit(createDebitDto: DepositDto, req: any): Promise<{
        amount: number;
        user: import("../users/entities/user.entity").User;
    } & import("./entities/debit.entity").Debit>;
}
