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

  async getAuctions(status: AuctionStatus) {
    const query = this.auctionRepository
      .createQueryBuilder('auction')
      .leftJoin(AuctionBid, 'bid', 'bid.auctionId = auction.id')
      .select(['auction', 'MAX(bid.amount) AS currentBid'])
      .where('auction.status = :status', { status })
      .groupBy('auction.id')
      .getRawMany();

    return query;
  }

  // Create an auction
  async create(created_by: string, createAuctionDto: CreateAuctionDto) {
    const data = {
      created_by: created_by,
      itemName: createAuctionDto.name,
      startPrice: createAuctionDto.startAmount,
      expiration: createAuctionDto.expiration,
    };
    this.auctionRepository.create(data);

    return this.auctionRepository.save(data);
  }

  // Create a bid
  async startBid(id: number) {
    const currentAuction = await this.auctionRepository.findOneBy({
      id: id,
    });
    currentAuction.status = AuctionStatus.ONGOING;
    return this.auctionRepository.update(id, currentAuction);
  }

  // Get highest bidder based on auction id
  async highestBidder(id: number) {
    const bidCount = await this.auctionBidRepository.count({
      where: {
        auctionId: id,
      },
    });

    if (bidCount > 0) {
      const highestBidder = await this.auctionBidRepository.find({
        where: { auctionId: id },
        order: { amount: 'DESC' },
        take: 1,
        relations: ['user', 'auction'],
      });

      return highestBidder[0];
    }

    return { message: 'No bids yet' };
  }

  // place bid
  async placeBid(id: number, userId: number, bid: BidDto) {
    const currentAuction = await this.auctionRepository.findOneBy({
      id: id,
    });

    const bidCount = await this.auctionBidRepository.count({
      where: {
        auctionId: id,
      },
    });

    const highestBid = await this.auctionBidRepository.maximum('amount', {
      auctionId: id,
    });

    if (currentAuction.startPrice > bid.amount)
      throw new BadRequestException(
        'Sorry, The  submitted amount is lower than the start price',
      );

    if (currentAuction.status !== AuctionStatus.ONGOING)
      throw new BadRequestException(
        'Sorry, you can only place your bid on items that are currently being auctioned.',
      );

    if (bidCount > 0 && highestBid >= bid.amount)
      throw new BadRequestException(
        'Sorry, The submitted amount is greater than the highest bid amount',
      );

    const data = {
      amount: bid.amount,
      auctionId: id,
      userId: userId,
    };
    await this.auctionBidRepository.create(data);

    return this.auctionBidRepository.save(data);
  }
}
