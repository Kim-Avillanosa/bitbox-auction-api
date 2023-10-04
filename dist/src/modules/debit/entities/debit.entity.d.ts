import { User } from '../../users/entities/user.entity';
export declare class Debit {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    amount: number;
    userId: number;
    user: User;
}
