import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemWarehouse } from './entities/itemWarehouse.entity';
import { ItemWarehouseService } from './item-warehouse.service';
import { ItemWarehouseResolver } from './item-warehouse.resolver';
import { WarehouseService } from '../warehouse/warehouse.service';
import { ItemService } from '../item/item.service';
import { ItemModule } from 'src/item/item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemWarehouse]),
    // WarehouseService,
    // ItemModule,
  ],
  providers: [ItemWarehouseModule, ItemWarehouseService, ItemWarehouseResolver],
  // exports: [ItemWarehouseService],
})
export class ItemWarehouseModule {}
