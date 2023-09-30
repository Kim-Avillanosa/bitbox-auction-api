import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Credit } from '../credit/entities/credit.entity';
import { Debit } from '../debit/entities/debit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Credit, Debit])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
