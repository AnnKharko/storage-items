import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DevService } from './dev.service';
import { Dev } from './entities/dev.entity';
import { CreateDevDto, UpdateDevDto } from './dto';
import { SendDto } from '../send.dto';

@Resolver(() => Dev)
export class DevResolver {
  constructor(private readonly devService: DevService) {}

  @Mutation(() => Dev)
  createDev(@Args('createDev') createDev: CreateDevDto) {
    return this.devService.create(createDev);
  }

  @Query(() => [Dev], { name: 'findAllDevs' })
  findAll() {
    return this.devService.findAll();
  }

  @Query(() => Dev, { name: 'findOneDev' })
  findOne(@Args('id') id: string) {
    return this.devService.findOne(id);
  }

  @Mutation(() => Dev, { name: 'updateDev' })
  updateDev(@Args('updateDev') updateDev: UpdateDevDto) {
    return this.devService.update(updateDev);
  }

  @Mutation(() => SendDto)
  removeDev(@Args('id') id: string) {
    return this.devService.remove(id);
  }
}
