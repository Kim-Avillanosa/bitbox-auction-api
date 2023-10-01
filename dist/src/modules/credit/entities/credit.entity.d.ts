import { User } from 'src/modules/users/entities/user.entity';
export declare class Credit {
    id?: number;
    created_at?: Date;
    updated_at?: Date;
    amount: number;
    userId: number;
    user: User;
}
