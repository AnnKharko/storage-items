import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { ItemWarehouseService } from './item-warehouse.service';
import { ItemWarehouse } from './entities/itemWarehouse.entity';
import { CreateItemWarehouseDTO } from './dto/create-item-werehouse';
@Resolver()
export class ItemWarehouseResolver {
  constructor(private readonly itemWarehouseService: ItemWarehouseService) {}

  @Query(() => ItemWarehouse, { name: 'findItemWarehouse' })
  findItem(@Args('id') id: string) {
    return this.itemWarehouseService.getItemWarehouse(id);
  }

  @Mutation(() => ItemWarehouse, { name: 'createItemWarehouse' })
  create(@Args('itemWarehouse') itemWarehouse: CreateItemWarehouseDTO) {
    return this.itemWarehouseService.createItemWarehouse(itemWarehouse);
  }
}
