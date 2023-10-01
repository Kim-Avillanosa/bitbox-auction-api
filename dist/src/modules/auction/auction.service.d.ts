import { CreateAuctionDto } from './dto/create-auction.dto';
import { Auction, AuctionStatus } from './entities/auction.entity';
import { Repository } from 'typeorm';
import { BidDto } from './dto/bid.dto';
import { AuctionBid } from './entities/auctionbid.entity';
export declare class AuctionService {
    private auctionRepository;
    private auctionBidRepository;
    constructor(auctionRepository: Repository<Auction>, auctionBidRepository: Repository<AuctionBid>);
    getAuctions(status: AuctionStatus): Promise<Auction[]>;
    create(createAuctionDto: CreateAuctionDto): Promise<{
        itemName: string;
        startPrice: number;
    } & Auction>;
    startBid(id: number): Promise<import("typeorm").UpdateResult>;
    highestBidder(id: number): Promise<AuctionBid | {
        message: string;
    }>;
    placeBid(id: number, userId: number, bid: BidDto): Promise<{
        amount: number;
        auctionId: number;
        userId: number;
    } & AuctionBid>;
}
