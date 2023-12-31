import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auction, AuctionStatus } from '../auction/entities/auction.entity';
import { AuctionBid } from '../auction/entities/auctionbid.entity';
import { Credit, CreditStatus } from '../credit/entities/credit.entity';
import { Debit } from '../debit/entities/debit.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CronService {
  constructor(
    @InjectRepository(Auction)
    private auctionRepository: Repository<Auction>,

    @InjectRepository(AuctionBid)
    private auctionBidRepository: Repository<AuctionBid>,

    @InjectRepository(Credit)
    private creditRepository: Repository<Credit>,
  ) {}

  async getAuctions(status: AuctionStatus) {
    const currentDate = new Date();

    const query = this.auctionRepository
      .createQueryBuilder('auction')
      .leftJoin(AuctionBid, 'bid', 'bid.auctionId = auction.id')
      .select(['auction', 'MAX(bid.amount) AS currentBid'])
      .where('auction.status = :status', { status })
      .andWhere('auction.expiration < :currentDate', { currentDate })
      .groupBy('auction.id')
      .getMany();

    return query;
  }

  async ping() {
    //get pending auctions that are to expire
    const pendingAuctions = await this.getAuctions(AuctionStatus.ONGOING);

    if (pendingAuctions.length <= 0) {
      return Promise.resolve('Nothing so far.');
    }

    /// update status to completed
    pendingAuctions.forEach(async (item) => {
      const highestBidder = await this.auctionBidRepository.find({
        where: { auctionId: item.id },
        order: { amount: 'DESC' },
        relations: ['user', 'auction'],
      });

      if (highestBidder.length > 0) {
        // winner
        const highest = highestBidder[0];
        // others
        const others = highestBidder.filter((x) => x.id !== highest.id);
        //get current credit
        const highestCredit = await this.creditRepository.findOneBy({
          userId: highest.userId,
          amount: highest.amount,
        });
        highestCredit.status = CreditStatus.APPROVED;
        await this.creditRepository.update(highestCredit.id, highestCredit);

        others.forEach(async (other) => {
          //get current credit
          let currentCredit = await this.creditRepository.findOneBy({
            userId: other.userId,
            amount: other.amount,
          });

          if (currentCredit) {
            currentCredit.status = CreditStatus.DECLINED;
            await this.creditRepository.update(currentCredit.id, currentCredit);
          }
        });
      }

      item.status = AuctionStatus.COMPLETED;
      this.auctionRepository.update(item.id, item);
    });

    return Promise.resolve(`Scanned and changed ${pendingAuctions.length}`);
  }
}
