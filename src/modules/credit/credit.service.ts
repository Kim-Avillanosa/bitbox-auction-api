import { Injectable } from '@nestjs/common';
import { CreditDto } from './dto/credit.dto';
import { User } from '../users/entities/user.entity';
import { Credit } from './entities/credit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Debit } from '../debit/entities/debit.entity';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class CreditService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Credit)
    private creditRepository: Repository<Credit>,
    @InjectRepository(Debit)
    private debitRepository: Repository<Debit>,
  ) {}

  async balance(userId: number) {
    const totalDebit = await this.debitRepository.sum('amount', {
      userId: userId,
    });

    const totalCredit = await this.creditRepository.sum('amount', {
      userId: userId,
    });

    return totalDebit - totalCredit;
  }

  async withdraw(userId: number, creditDto: CreditDto) {
    const currentBalance = await this.balance(userId);

    if (creditDto.amount >= currentBalance) {
      throw new BadRequestException(
        'This transaction cannot be processed. The requested amount is higher than your current balance.',
      );
    } else if (creditDto.amount <= 0) {
      throw new BadRequestException(
        'This transaction cannot be processed. The requested amount is below the required amount',
      );
    }

    const user = await this.usersRepository.findOneBy({
      id: userId,
    });

    const data = {
      amount: creditDto.amount,
      user: user,
    };

    this.creditRepository.create(data);

    return this.creditRepository.save(data);
  }
}
