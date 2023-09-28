// import ColumnEncryptionTransformer from 'src/db/encryption/ColumnEncryptionTransformer';
import ColumnEncryptionTransformer from 'src/db/encryption/ColumnEncryptionTransformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column()
  password: string;
}
