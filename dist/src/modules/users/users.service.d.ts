import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Debit } from '../debit/entities/debit.entity';
import { Credit } from '../credit/entities/credit.entity';
export declare class UsersService {
    private usersRepository;
    private creditRepository;
    private debitRepository;
    constructor(usersRepository: Repository<User>, creditRepository: Repository<Credit>, debitRepository: Repository<Debit>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findByEmail(email: any): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult>;
    remove(id: number): Promise<void>;
    balance(id: number): Promise<{
        balance: number;
    }>;
}
