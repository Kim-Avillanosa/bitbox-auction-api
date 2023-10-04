import { Repository } from 'typeorm';
import { Auction, AuctionStatus } from '../auction/entities/auction.entity';
import { AuctionBid } from '../auction/entities/auctionbid.entity';
import { Credit } from '../credit/entities/credit.entity';
export declare class CronService {
    private auctionRepository;
    private auctionBidRepository;
    private creditRepository;
    constructor(auctionRepository: Repository<Auction>, auctionBidRepository: Repository<AuctionBid>, creditRepository: Repository<Credit>);
    getAuctions(status: AuctionStatus): Promise<Auction[]>;
    ping(): Promise<string>;
}
