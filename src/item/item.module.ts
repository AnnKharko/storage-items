import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemResolver } from './item.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemWarehouseService } from '../item-warehouse/item-warehouse.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemService, ItemResolver],
  // exports: [ItemService],
})
export class ItemModule {}
