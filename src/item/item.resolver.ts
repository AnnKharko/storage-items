import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Item } from './entities/item.entity';
import { ItemService } from './item.service';
import { CreateItemDTO } from './dto/create-item.import';

@Resolver(() => Item)
export class ItemResolver {
  constructor(private itemService: ItemService) {}

  @Query(() => [Item], { name: 'findAllItems' })
  findAll() {
    return this.itemService.findAll();
  }

  @Query(() => Item)
  findOne(@Args('id') id: string) {
    return this.itemService.findOne(id);
  }

  @Mutation(() => Item, { name: 'createItem' })
  create(@Args('item') item: CreateItemDTO) {
    return this.itemService.create(item);
  }
}
