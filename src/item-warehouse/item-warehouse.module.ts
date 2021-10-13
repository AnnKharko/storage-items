import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemWarehouse } from './entities/itemWarehouse.entity';
import { ItemWarehouseService } from './item-warehouse.service';
import { ItemWarehouseResolver } from './item-warehouse.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([ItemWarehouse])],
  providers: [ItemWarehouseModule, ItemWarehouseService, ItemWarehouseResolver],
})
export class ItemWarehouseModule {}
