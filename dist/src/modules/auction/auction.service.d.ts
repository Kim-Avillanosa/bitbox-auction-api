import { CreateAuctionDto } from './dto/create-auction.dto';
import { Auction, AuctionStatus } from './entities/auction.entity';
import { Repository } from 'typeorm';
import { BidDto } from './dto/bid.dto';
import { AuctionBid } from './entities/auctionbid.entity';
export declare class AuctionService {
    private auctionRepository;
    private auctionBidRepository;
    constructor(auctionRepository: Repository<Auction>, auctionBidRepository: Repository<AuctionBid>);
    getAuctions(status: AuctionStatus): Promise<any[]>;
    getAuction(id: number): Promise<any>;
    create(created_by: string, createAuctionDto: CreateAuctionDto): Promise<{
        created_by: string;
        itemName: string;
        startPrice: number;
        expiration: Date;
    } & Auction>;
    startBid(id: number): Promise<import("typeorm").UpdateResult>;
    getBidList(id: number): Promise<AuctionBid[] | {
        message: string;
    }>;
    highestBidder(id: number): Promise<AuctionBid | {
        message: string;
    }>;
    placeBid(id: number, userId: number, bid: BidDto): Promise<{
        amount: number;
        auctionId: number;
        userId: number;
    } & AuctionBid>;
}
