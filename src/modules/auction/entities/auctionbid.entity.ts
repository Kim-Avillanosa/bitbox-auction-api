import { Auction } from 'src/modules/auction/entities/auction.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';

@Entity()
export class AuctionBid {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  created_at?: Date; // Creation date

  @UpdateDateColumn()
  updated_at?: Date; // Last updated date

  @Column('decimal', { precision: 5, scale: 2 })
  amount: number;

  @Column()
  userId: number;

  @Column()
  auctionId: number;

  @ManyToOne(() => Auction, (auction) => auction.bids)
  @JoinColumn({ name: 'auctionId' })
  auction: Auction;

  @ManyToOne(() => User, (user) => user.bids)
  user: User;
}
