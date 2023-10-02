import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ConfigService, ConfigModule } from '@nestjs/config';
import { CliModule } from './cli/cli.module';
import { ormConfig } from './db/orm.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DebitModule } from './modules/debit/debit.module';
import { CreditModule } from './modules/credit/credit.module';
import { AuctionModule } from './modules/auction/auction.module';
import { JWTUtil } from './jwt/jwt.service';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CronModule } from './modules/cron/cron.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  // add orm module to create persistence instance
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 5000,
        limit: 1,
      },
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        return ormConfig;
      },
    }),
    UsersModule,
    CliModule,
    AuthModule,
    DebitModule,
    CreditModule,
    AuctionModule,
    CronModule,
  ],
  controllers: [AppController],
  providers: [AppService, JWTUtil],
})
export class AppModule {
  constructor(dataSource: DataSource) {}
}
