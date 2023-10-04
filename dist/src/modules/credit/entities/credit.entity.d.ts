import { User } from '../../users/entities/user.entity';
export declare enum CreditStatus {
    NEW = "NEW",
    APPROVED = "APPROVED",
    DECLINED = "DECLINED"
}
export declare class Credit {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    amount: number;
    userId: number;
    status: CreditStatus;
    user: User;
}
