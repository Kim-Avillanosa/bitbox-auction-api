import { Module } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { AuctionController } from './auction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './entities/auction.entity';
import { AuctionBid } from './entities/auctionbid.entity';
import { JWTUtil } from '../../jwt/jwt.service';
import { Credit } from '../credit/entities/credit.entity';
import { Debit } from '../debit/entities/debit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auction, AuctionBid, Credit, Debit])],
  controllers: [AuctionController],
  providers: [AuctionService, JWTUtil],
})
export class AuctionModule {}
