import { AuctionService } from './auction.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { BidDto } from './dto/bid.dto';
import { JWTUtil } from 'src/jwt/jwt.service';
import { AuctionStatus } from './entities/auction.entity';
export declare class AuctionController {
    private readonly auctionService;
    private readonly jwtUtil;
    constructor(auctionService: AuctionService, jwtUtil: JWTUtil);
    create(createAuctionDto: CreateAuctionDto): Promise<{
        itemName: string;
        startPrice: number;
    } & import("./entities/auction.entity").Auction>;
    start(id: number): Promise<import("typeorm").UpdateResult>;
    placeBid(id: number, bid: BidDto, req: any): Promise<{
        amount: number;
        auctionId: number;
        userId: number;
    } & import("./entities/auctionbid.entity").AuctionBid>;
    getHigestBidder(id: number): Promise<import("./entities/auctionbid.entity").AuctionBid | {
        message: string;
    }>;
    getAuctions(status: AuctionStatus): Promise<import("./entities/auction.entity").Auction[]>;
}
