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

@Entity()
export class Credit {
  //primary key for every tables
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  created_at?: Date; // Creation date

  @UpdateDateColumn()
  updated_at?: Date; // Last updated date

  @Column({ type: 'decimal' })
  amount: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.withdrawals)
  @JoinColumn({ name: 'userId' })
  user: User;
}
