import { DepositDto } from './dto/deposit.dto';
import { Repository } from 'typeorm';
import { Debit } from './entities/debit.entity';
import { User } from '../users/entities/user.entity';
export declare class DebitService {
    private usersRepository;
    private debitRepository;
    constructor(usersRepository: Repository<User>, debitRepository: Repository<Debit>);
    deposit(userId: number, depositDto: DepositDto): Promise<{
        amount: number;
        user: User;
    } & Debit>;
}
