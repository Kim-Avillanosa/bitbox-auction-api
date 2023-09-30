import { Injectable } from '@nestjs/common';
import { CreditDto } from './dto/credit.dto';
import { User } from '../users/entities/user.entity';
import { Credit } from './entities/credit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CreditService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Credit)
    private creditRepository: Repository<Credit>,
  ) {}

  async withdraw(userId: number, creditDto: CreditDto) {
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
