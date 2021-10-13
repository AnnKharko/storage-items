import { Module } from '@nestjs/common';
import { ItemModule } from './item/item.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { WarehouseModule } from './warehouse/warehouse.module';
import { ItemWarehouseModule } from './item-warehouse/item-warehouse.module';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfigAsync } from '../config/typeOrm.config';

@Module({
  imports: [
    ItemModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      // load: [config],
    }),
    WarehouseModule,
    ItemWarehouseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
