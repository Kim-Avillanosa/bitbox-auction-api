import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credit } from '../credit/entities/credit.entity';
import { Auction } from '../auction/entities/auction.entity';
import { AuctionBid } from '../auction/entities/auctionbid.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Credit, Auction, AuctionBid])],
  controllers: [CronController],
  providers: [CronService],
})
export class CronModule {}
