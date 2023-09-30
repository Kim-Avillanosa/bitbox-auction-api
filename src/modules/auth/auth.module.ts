import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { Credit } from '../credit/entities/credit.entity';
import { Debit } from '../debit/entities/debit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Credit, Debit]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1h', // for this sample i had changed the expiration to one hour
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
