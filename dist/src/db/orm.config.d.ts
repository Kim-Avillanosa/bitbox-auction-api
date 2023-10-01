import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
export declare const ormConfig: TypeOrmModuleOptions & DataSourceOptions;
declare const dataSource: DataSource;
export default dataSource;
