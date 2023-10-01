import { CreditDto } from './dto/credit.dto';
import { User } from '../users/entities/user.entity';
import { Credit } from './entities/credit.entity';
import { Repository } from 'typeorm';
import { Debit } from '../debit/entities/debit.entity';
export declare class CreditService {
    private usersRepository;
    private creditRepository;
    private debitRepository;
    constructor(usersRepository: Repository<User>, creditRepository: Repository<Credit>, debitRepository: Repository<Debit>);
    balance(userId: number): Promise<number>;
    withdraw(userId: number, creditDto: CreditDto): Promise<{
        amount: number;
        user: User;
    } & Credit>;
}
