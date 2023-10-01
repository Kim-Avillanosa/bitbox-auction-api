import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export enum CreditStatus {
  NEW = 'NEW',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
}

@Entity()
export class Credit {
  //primary key for every tables
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

  @Column({
    type: 'enum',
    enum: CreditStatus,
    default: CreditStatus.NEW,
  })
  status: CreditStatus; // Last updated date

  @ManyToOne(() => User, (user) => user.withdrawals)
  @JoinColumn({ name: 'userId' })
  user: User;
}
