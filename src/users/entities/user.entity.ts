import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EncryptionTransformer } from 'typeorm-encrypted';

@Entity()
export class User {
  //primary key for every tables
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn()
  created_at?: Date; // Creation date

  @UpdateDateColumn()
  updated_at?: Date; // Last updated date

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
}
