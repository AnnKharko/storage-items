import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Item } from '../src/item/entities/item.entity';
import { Warehouse } from '../src/warehouse/entities/warehouse.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../src/user/entities/user.entity';
import { Auth } from '../src/auth/entities/auth.entity';
import { ItemWarehouse } from '../src/item-warehouse/entities/itemWarehouse.entity';
import { Dev } from '../src/dev/entities/dev.entity';
import { RefreshToken } from '../src/authorization/entities/refresh-token.entity';

export default class TypeOrmConfig {
  static getOrmConfig(configureService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configureService.get('HOST'),
      port: 5432,
      username: configureService.get('USERNAME'),
      database: configureService.get('DATABASE'),
      password: configureService.get('PASSWORD'),
      entities: [Item, Warehouse, ItemWarehouse, User, Auth, Dev, RefreshToken],
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
