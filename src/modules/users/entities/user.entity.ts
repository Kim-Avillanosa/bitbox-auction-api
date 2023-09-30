import { Credit } from 'src/modules/credit/entities/credit.entity';
import { Debit } from 'src/modules/debit/entities/debit.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { EncryptionTransformer } from 'typeorm-encrypted';

@Entity()
export class User {
  @Column({ nullable: false })
  email: string;

  @Column({
    nullable: false,
    transformer: new EncryptionTransformer({
      key: 'e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61',
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      iv: 'ff5ac19190424b1d88f9419ef949ae56',
    }),
  })
  password: string;

  //primary key for every tables
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  created_at?: Date; // Creation date

  @UpdateDateColumn()
  updated_at?: Date; // Last updated date

  @OneToMany(() => Debit, (debit) => debit.user)
  deposits: Debit[];

  @OneToMany(() => Credit, (credit) => credit.user)
  withdrawals: Credit[];
}
