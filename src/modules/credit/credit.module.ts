import { Module } from '@nestjs/common';
import { CreditService } from './credit.service';
import { CreditController } from './credit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credit } from './entities/credit.entity';
import { User } from '../users/entities/user.entity';
import { JWTUtil } from 'src/jwt.module.ts';
import { Debit } from '../debit/entities/debit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Credit, User, Debit])],
  controllers: [CreditController],
  providers: [CreditService, JWTUtil],
})
export class CreditModule {}
