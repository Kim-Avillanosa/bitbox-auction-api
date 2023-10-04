import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { AuctionBid } from './auctionbid.entity';

export enum AuctionStatus {
  PENDING = 'PENDING',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
}

@Entity()
export class Auction {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false })
  itemName: string;

  @Column({ nullable: false })
  created_by: string;

  @Column('decimal', { precision: 5, scale: 2 })
  startPrice: number;

  @CreateDateColumn()
  created_at?: Date; // Creation date

  @Column()
  expiration: Date;

  @UpdateDateColumn()
  updated_at?: Date; // Last updated date

  @Column({
    type: 'enum',
    enum: AuctionStatus,
    default: AuctionStatus.PENDING,
  })
  status: AuctionStatus; // Last updated date

  @OneToMany(() => AuctionBid, (bids) => bids.auction)
  bids: AuctionBid[];
}
