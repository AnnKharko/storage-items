import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Item } from './entities/item.entity';
import { ItemService } from './item.service';
import { CreateItemDTO } from './dto/create-item.import';
import { UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { AuthGuard } from '../auth/guards/auth.guard';

@Resolver(() => Item)
export class ItemResolver {
  constructor(private itemService: ItemService) {}

  @Query(() => [Item], { name: 'findAllItems' })
  findAll() {
    return this.itemService.findAll();
  }

  @Query(() => Item, { name: 'findItem' })
  @UseGuards(AuthGuard)
  // @UseGuards(JwtAuthGuard)
  findOne(@Args('id') id: string) {
    return this.itemService.findOne(id);
  }

  @Mutation(() => Item, { name: 'createItem' })
  @UseGuards(AuthGuard)
  create(@Args('item') item: CreateItemDTO) {
    return this.itemService.create(item);
  }
}
