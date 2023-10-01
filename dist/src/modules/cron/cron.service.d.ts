import { Repository } from 'typeorm';
import { Auction, AuctionStatus } from '../auction/entities/auction.entity';
import { AuctionBid } from '../auction/entities/auctionbid.entity';
import { Credit } from '../credit/entities/credit.entity';
import { Debit } from '../debit/entities/debit.entity';
import { User } from '../users/entities/user.entity';
export declare class CronService {
    private auctionRepository;
    private auctionBidRepository;
    private creditRepository;
    private debitRepository;
    private usersRepository;
    constructor(auctionRepository: Repository<Auction>, auctionBidRepository: Repository<AuctionBid>, creditRepository: Repository<Credit>, debitRepository: Repository<Debit>, usersRepository: Repository<User>);
    getAuctions(status: AuctionStatus): Promise<Auction[]>;
    ping(): Promise<string>;
}
