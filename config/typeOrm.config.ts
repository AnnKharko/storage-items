import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Item } from '../src/item/entities/item.entity';
import { Warehouse } from '../src/warehouse/entities/warehouse.entity';
import { ItemWarehouse } from '../src/item-warehouse/entities/itemWarehouse.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

export default class TypeOrmConfig {
  static getOrmConfig(configureService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configureService.get('HOST'),
      port: 5432,
      username: configureService.get('USERNAME'),
      database: configureService.get('DATABASE'),
      password: configureService.get('PASSWORD'),
      entities: [Item, Warehouse, ItemWarehouse],
      // entities: ['/**/*.entity(.ts,.js)'],
      synchronize: true,
      logging: true,
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
