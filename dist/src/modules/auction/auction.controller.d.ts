import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { BidDto } from './dto/bid.dto';
import { JWTUtil } from '../../jwt/jwt.service';
import { AuctionStatus } from './entities/auction.entity';
export declare class AuctionController {
    private readonly auctionService;
    private readonly jwtUtil;
    constructor(auctionService: AuctionService, jwtUtil: JWTUtil);
    create(createAuctionDto: CreateAuctionDto, req: any): Promise<import("./entities/auction.entity").Auction>;
    getBid(id: number): Promise<any>;
    start(id: number): Promise<import("typeorm").UpdateResult>;
    placeBid(id: number, bid: BidDto, req: any): Promise<{
        amount: number;
        auctionId: number;
        userId: number;
    } & import("./entities/auctionbid.entity").AuctionBid>;
    getHigestBidder(id: number): Promise<import("./entities/auctionbid.entity").AuctionBid | {
        message: string;
    }>;
    getBidders(id: number): Promise<import("./entities/auctionbid.entity").AuctionBid[]>;
    getAuctions(status: AuctionStatus): Promise<any[]>;
}
