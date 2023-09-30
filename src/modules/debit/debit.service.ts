import { Injectable } from '@nestjs/common';
import { DepositDto } from './dto/deposit.dto';
import { Repository } from 'typeorm';
import { Debit } from './entities/debit.entity';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DebitService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Debit)
    private debitRepository: Repository<Debit>,
  ) {}

  async deposit(userId: number, depositDto: DepositDto) {
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
}
