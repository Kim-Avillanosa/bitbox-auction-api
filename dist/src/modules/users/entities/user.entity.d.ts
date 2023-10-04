import { AuctionBid } from '../../auction/entities/auctionbid.entity';
import { Credit } from '../../credit/entities/credit.entity';
import { Debit } from '../../debit/entities/debit.entity';
export declare class User {
    email: string;
    password: string;
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    deposits: Debit[];
    withdrawals: Credit[];
    bids: AuctionBid[];
}
