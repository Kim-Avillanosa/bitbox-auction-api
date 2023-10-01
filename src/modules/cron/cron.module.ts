import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credit } from '../credit/entities/credit.entity';
import { User } from '../users/entities/user.entity';
import { Debit } from '../debit/entities/debit.entity';
import { Auction } from '../auction/entities/auction.entity';
import { AuctionBid } from '../auction/entities/auctionbid.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Credit, User, Debit, Auction, AuctionBid]),
  ],
  controllers: [CronController],
  providers: [CronService],
})
export class CronModule {}
