import { Module } from '@nestjs/common';
import { DebitService } from './debit.service';
import { DebitController } from './debit.controller';
import { JwtModule } from '@nestjs/jwt';
import { JWTUtil } from 'src/JWTUtil';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Debit } from './entities/debit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Debit, User])],

  controllers: [DebitController],
  providers: [DebitService, JWTUtil],
})
export class DebitModule {}
