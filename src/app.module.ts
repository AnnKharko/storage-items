import { Module } from '@nestjs/common';
import { ItemModule } from './item/item.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Item } from './item/entities/item.entity';
import { WarehouseModule } from './warehouse/warehouse.module';
import { Warehouse } from './warehouse/entities/warehouse.entity';

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
      username: '',
      password: '',
      database: '',
      entities: [Item, Warehouse],
      // entities: ['/**/*.entity(.ts,.js)'],
      synchronize: true,
    }),
    WarehouseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
