import { Auction } from '../../auction/entities/auction.entity';
import { User } from '../../users/entities/user.entity';
export declare class AuctionBid {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    amount: number;
    userId: number;
    auctionId: number;
    auction: Auction;
    user: User;
}
