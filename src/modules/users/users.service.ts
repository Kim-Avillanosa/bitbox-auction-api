import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Debit } from '../debit/entities/debit.entity';
import { Credit, CreditStatus } from '../credit/entities/credit.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Credit)
    private creditRepository: Repository<Credit>,

    @InjectRepository(Debit)
    private debitRepository: Repository<Debit>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    var userCount = await this.usersRepository.count({
      where: {
        email: createUserDto.email,
      },
    });

    if (userCount > 0) {
      throw new BadRequestException(
        `Apologies, but it appears that this email address is already in use within our system. If you believe this is a mistake or need assistance, please reach out to our support team for further help. Thank you!`,
      );
    }

    var request = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(request);
  }

  findAll(): Promise<User[]> {
    var response = this.usersRepository.find({
      select: ['id', 'email', 'created_at', 'updated_at', 'deposits'],
    });

    return response;
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      select: ['id', 'email', 'created_at', 'updated_at', 'deposits'],
      where: {
        id: id,
      },
    });
  }

  findByEmail(email): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    this.usersRepository.delete(id);
  }

  async balance(id: number): Promise<{ balance: number }> {
    const debitCount = await this.debitRepository.count({
      where: {
        userId: id,
      },
    });
    //

    if (debitCount == 0) {
      return { balance: 0 };
    }

    const totalDebit = await this.debitRepository.sum('amount', {
      userId: id,
    });

    const totalCreditResult = await this.creditRepository
      .createQueryBuilder()
      .select('SUM(amount)', 'total')
      .where('userId = :userId', { userId: id })
      .andWhere((qb) => {
        qb.where('status = :approved', {
          approved: CreditStatus.APPROVED,
        }).orWhere('status = :new', { new: CreditStatus.NEW });
      })
      .getRawOne();

    const totalCredit: number = totalCreditResult.total;

    const overall = totalDebit - totalCredit;

    return Promise.resolve({
      balance: overall,
    });
  }
}
