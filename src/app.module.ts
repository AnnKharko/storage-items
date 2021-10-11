import { Module } from '@nestjs/common';
import { ItemModule } from './item/item.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Item } from './item/entities/item.entity';
import { WarehouseModule } from './warehouse/warehouse.module';
import { Warehouse } from './warehouse/entities/warehouse.entity';
import { ItemWarehouseModule } from './item-warehouse/item-warehouse.module';
import { ItemWarehouse } from './item-warehouse/entities/itemWarehouse.entity';

@Module({
  imports: [
    ItemModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'author',
      password: 'qwerty',
      database: 'storage',
      entities: [Item, Warehouse , ItemWarehouse],
      // entities: ['/**/*.entity(.ts,.js)'],
      synchronize: true,
      logging: true,
    }),
    WarehouseModule,
    ItemWarehouseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
