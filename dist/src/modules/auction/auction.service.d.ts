import { CreateAuctionDto } from './dto/create-auction.dto';
import { Auction, AuctionStatus } from './entities/auction.entity';
import { Repository } from 'typeorm';
import { BidDto } from './dto/bid.dto';
import { AuctionBid } from './entities/auctionbid.entity';
import { Credit } from '../credit/entities/credit.entity';
import { Debit } from '../debit/entities/debit.entity';
export declare class AuctionService {
    private auctionRepository;
    private auctionBidRepository;
    private creditRepository;
    private debitRepository;
    constructor(auctionRepository: Repository<Auction>, auctionBidRepository: Repository<AuctionBid>, creditRepository: Repository<Credit>, debitRepository: Repository<Debit>);
    getAuctions(status: AuctionStatus): Promise<any[]>;
    getAuction(id: number): Promise<any>;
    create(created_by: string, createAuctionDto: CreateAuctionDto): Promise<{
        created_by: string;
        itemName: string;
        startPrice: number;
        expiration: Date;
    } & Auction>;
    startBid(id: number): Promise<import("typeorm").UpdateResult>;
    getBidList(id: number): Promise<AuctionBid[]>;
    highestBidder(id: number): Promise<AuctionBid | {
        message: string;
    }>;
    balance(id: number): Promise<{
        balance: number;
    }>;
    placeBid(id: number, userId: number, bid: BidDto): Promise<{
        amount: number;
        auctionId: number;
        userId: number;
    } & AuctionBid>;
}
