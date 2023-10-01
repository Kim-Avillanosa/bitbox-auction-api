import { Injectable } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction, AuctionStatus } from './entities/auction.entity';
import { Repository } from 'typeorm';
import { BidDto } from './dto/bid.dto';
import { BadRequestException } from '@nestjs/common';
import { AuctionBid } from './entities/auctionbid.entity';

@Injectable()
export class AuctionService {
  constructor(
    @InjectRepository(Auction)
    private auctionRepository: Repository<Auction>,

    @InjectRepository(AuctionBid)
    private auctionBidRepository: Repository<AuctionBid>,
  ) {}

  async create(createAuctionDto: CreateAuctionDto) {
    const data = {
      itemName: createAuctionDto.name,
      startPrice: createAuctionDto.startAmount,
    };
    this.auctionRepository.create(data);

    return this.auctionRepository.save(data);
  }

  async startBid(id: number) {
    const currentAuction = await this.auctionRepository.findOneBy({
      id: id,
    });
    currentAuction.status = AuctionStatus.ONGOING;
    return this.auctionRepository.update(id, currentAuction);
  }

  highestBidder(id: number) {
    return `This action returns a #${id} auction`;
  }

  async placeBid(id: number, bid: BidDto) {
    const currentAuction = await this.auctionRepository.findOneBy({
      id: id,
    });

    const bidCount = await this.auctionBidRepository.count({
      where: {
        auctionId: id,
      },
    });

    if (currentAuction.startPrice > bid.amount) {
      throw new BadRequestException(
        'Sorry, The start price is lower than the submitted amount.',
      );
    }

    if (currentAuction.status !== AuctionStatus.ONGOING) {
      throw new BadRequestException(
        'Sorry, you can only place your bid on items that are currently being auctioned.',
      );
    }

    if (bidCount > 0) {
    }

    return '';
  }
}
