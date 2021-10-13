import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { CreateItemDTO } from './dto/create-item.import';
import { UpdateItemInputDTO } from './dto/update-item.input';
import { SendDto } from '../send.dto';
import { GraphQLError } from 'graphql';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find();
    // return this.itemRepository
    //   .createQueryBuilder('item')
    //   .leftJoinAndSelect('item.item_wh', 'item_warehouses')
    //   .getMany();
  }

  async findOne(id: string): Promise<Item> {
    return this.itemRepository.findOne(id);
  }

  async create(item: CreateItemDTO): Promise<Item> {
    const it = this.itemRepository.create(item);
    return this.itemRepository.save(it);
  }

  async update(updateItem: UpdateItemInputDTO): Promise<UpdateItemInputDTO> {
    const item = await this.itemRepository.findOne({ id: updateItem.id });
    if (!item) {
      throw new GraphQLError('Item not exist');
    }
    return await this.itemRepository.save(updateItem);
  }

  async delete(id: string): Promise<SendDto> {
    await this.itemRepository.delete(id);
    return {
      message: `item ${id} was deleted`,
      status: 200,
    };
  }
}
