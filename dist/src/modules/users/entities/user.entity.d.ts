import { AuctionBid } from 'src/modules/auction/entities/auctionbid.entity';
import { Credit } from 'src/modules/credit/entities/credit.entity';
import { Debit } from 'src/modules/debit/entities/debit.entity';
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
