import { AuctionBid } from './auctionbid.entity';
export declare enum AuctionStatus {
    PENDING = "PENDING",
    ONGOING = "ONGOING",
    COMPLETED = "COMPLETED"
}
export declare class Auction {
    id?: number;
    itemName: string;
    startPrice: number;
    created_at?: Date;
    expiration: Date;
    updated_at?: Date;
    status: AuctionStatus;
    bids: AuctionBid[];
}
