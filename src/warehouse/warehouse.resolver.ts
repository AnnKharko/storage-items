import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WarehouseService } from './warehouse.service';
import { Warehouse } from './entities/warehouse.entity';
import { CreateWarehouseInput } from './dto/create-warehouse.input';
import { UpdateWarehouseInput } from './dto/update-warehouse.input';

@Resolver(() => Warehouse)
export class WarehouseResolver {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Mutation(() => Warehouse, { name: 'createWarehouse' })
  create(@Args('warehouse') warehouse: CreateWarehouseInput) {
    return this.warehouseService.create(warehouse);
  }

  @Query(() => [Warehouse], { name: 'getAllWarehouse' })
  findAll() {
    return this.warehouseService.findAll();
  }

  @Query(() => Warehouse, { name: 'getOneWarehouse' })
  findOne(@Args('id') id: string) {
    return this.warehouseService.findOne(id);
  }

  @Mutation(() => Warehouse)
  updateWarehouse(@Args('warehouse') warehouse: UpdateWarehouseInput) {
    return this.warehouseService.update(warehouse.id, warehouse);
  }

  @Mutation(() => Warehouse)
  removeWarehouse(@Args('id') id: string) {
    return this.warehouseService.remove(id);
  }
}
