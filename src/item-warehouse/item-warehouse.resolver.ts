import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { ItemWarehouseService } from './item-warehouse.service';
import { ItemWarehouse } from './entities/itemWarehouse.entity';
import { CreateItemWarehouseDTO } from './dto/create-item-werehouse';
import { UpdateItemWarehouseDTO } from './dto/update-itemwarehouse';
import { SendDto } from '../send.dto';
@Resolver()
export class ItemWarehouseResolver {
  constructor(private readonly itemWarehouseService: ItemWarehouseService) {}

  @Query(() => ItemWarehouse, { name: 'findItemWarehouse' })
  findItem(@Args('id') id: string) {
    return this.itemWarehouseService.getItemWarehouse(id);
  }

  @Query(() => [ItemWarehouse], { name: 'findAllItemWarehouse' })
  findAllItemWarehouse() {
    return this.itemWarehouseService.getAllItemWarehouses();
  }

  @Query(() => [ItemWarehouse], { name: 'findWarehouseWithAllItems' })
  findWarehouseWithAllItems(@Args('id') id: string) {
    return this.itemWarehouseService.getWarehouseWithAllItems(id);
  }

  @Mutation(() => ItemWarehouse, { name: 'createItemWarehouse' })
  create(@Args('itemWarehouse') itemWarehouse: CreateItemWarehouseDTO) {
    return this.itemWarehouseService.createItemWarehouse(itemWarehouse);
  }
  @Mutation(() => ItemWarehouse, { name: 'updateItemWarehouse' })
  updateItemWarehouse(
    @Args('updateItemWarehouse') updateItemWarehouse: UpdateItemWarehouseDTO,
  ) {
    return this.itemWarehouseService.updateItemWarehouse(updateItemWarehouse);
  }

  @Mutation(() => SendDto, { name: 'deleteItemWarehouse' })
  deleteItemWarehouse(@Args('id') id: string) {
    return this.itemWarehouseService.deleteItemWarehouse(id);
  }
}
