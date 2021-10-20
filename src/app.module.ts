import { Module } from '@nestjs/common';
import { ItemModule } from './item/item.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { WarehouseModule } from './warehouse/warehouse.module';
import { UserModule } from './user/user.module';
import { typeOrmConfigAsync } from '../configs/typeOrm.config';
import { ConfigModule } from '@nestjs/config';

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
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
