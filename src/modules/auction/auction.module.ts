import { Module } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { AuctionController } from './auction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auction } from './entities/auction.entity';
import { AuctionBid } from './entities/auctionbid.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auction, AuctionBid])],
  controllers: [AuctionController],
  providers: [AuctionService],
})
export class AuctionModule {}
