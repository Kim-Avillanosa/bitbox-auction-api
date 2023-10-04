import { User } from '../../users/entities/user.entity';
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

@Entity()
export class Debit {
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

  @ManyToOne(() => User, (user) => user.deposits)
  @JoinColumn({ name: 'userId' })
  user: User;
}
