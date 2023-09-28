import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { ConfigService, ConfigModule } from '@nestjs/config';
import { CliModule } from './cli/cli.module';
import { ormConfig } from './db/orm.config';

@Module({
  // add orm module to create persistence instance
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(dataSource: DataSource) {}
}
