import { Injectable } from '@nestjs/common';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction, AuctionStatus } from './entities/auction.entity';
import { Repository } from 'typeorm';
import { BidDto } from './dto/bid.dto';
import { BadRequestException } from '@nestjs/common';
import { AuctionBid } from './entities/auctionbid.entity';
import { Credit, CreditStatus } from '../credit/entities/credit.entity';
import { Debit } from '../debit/entities/debit.entity';
import * as moment from 'moment-timezone';
import {
  convertGMTtoGMT8,
  passMsToTimezone,
} from 'src/helper/convertGMTtoGMT8';

@Injectable()
export class AuctionService {
  constructor(
    @InjectRepository(Auction)
    private auctionRepository: Repository<Auction>,

    @InjectRepository(AuctionBid)
    private auctionBidRepository: Repository<AuctionBid>,

    @InjectRepository(Credit)
    private creditRepository: Repository<Credit>,

    @InjectRepository(Debit)
    private debitRepository: Repository<Debit>,
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

  async getAuction(id: number) {
    const query = this.auctionRepository
      .createQueryBuilder('auction')
      .leftJoin(AuctionBid, 'bid', 'bid.auctionId = auction.id')
      .select(['auction', 'MAX(bid.amount) AS currentBid'])
      .where('auction.id = :id', { id })
      .getRawOne();

    return query;
  }

  // Create an auction
  async create(created_by: string, createAuctionDto: CreateAuctionDto) {
    let timezoneDate = passMsToTimezone(createAuctionDto.duration);

    const data = {
      created_by: created_by,
      itemName: createAuctionDto.name,
      startPrice: createAuctionDto.startAmount,
      // Store the formatted expiration date as a string in 'Asia/Singapore' timezone
      expiration: timezoneDate,
    };

    const createdAuction = this.auctionRepository.create(data);
    const savedAuction = await this.auctionRepository.save(createdAuction);

    return savedAuction;
  }

  // Create a bid
  async startBid(id: number) {
    const currentAuction = await this.auctionRepository.findOneBy({
      id: id,
    });
    currentAuction.status = AuctionStatus.ONGOING;
    return this.auctionRepository.update(id, currentAuction);
  }

  // Get bid list
  async getBidList(id: number) {
    const bidCount = await this.auctionBidRepository.count({
      where: {
        auctionId: id,
      },
    });

    if (bidCount > 0) {
      const highestBidder = await this.auctionBidRepository.find({
        where: { auctionId: id },
        order: { created_at: 'DESC' },
        relations: ['user', 'auction'],
      });

      return highestBidder;
    }

    return [];
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

  async balance(id: number): Promise<{ balance: number }> {
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

    const totalCredit: number = parseFloat(totalCreditResult.total) || 0;

    const overall = totalDebit - totalCredit;
    return Promise.resolve({
      balance: overall,
    });
  }

  // place bid
  async placeBid(id: number, userId: number, bid: BidDto) {
    const wallet = await this.balance(userId);

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

    if (wallet.balance < bid.amount)
      throw new BadRequestException(
        `Sorry, but it appears you don't have a sufficient balance to place a bid for that amount. Please check your account balance and try again with a valid bid amount.`,
      );

    if (currentAuction.startPrice > bid.amount)
      throw new BadRequestException(
        'Sorry, The submitted amount is lower than the start price',
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

    const creditData = {
      amount: bid.amount,
      userId: userId,
    };

    await this.creditRepository.create(creditData);

    await this.creditRepository.save(creditData);

    await this.auctionBidRepository.create(data);

    return this.auctionBidRepository.save(data);
  }
}
