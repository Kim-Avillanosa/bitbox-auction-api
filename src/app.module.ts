import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

const typeOrmModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: [],
  synchronize: true,
});

@Module({
  // add orm module to create persistence instance
  imports: [typeOrmModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
