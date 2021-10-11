import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { CreateItemDTO } from './dto/create-item.import';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return this.itemRepository
      .createQueryBuilder()
      .leftJoinAndSelect('item.item_wh', 'item_warehouses')
      .getMany();
  }

  async findOne(id: string): Promise<Item> {
    return this.itemRepository.findOne(id);
  }

  async create(item: CreateItemDTO): Promise<Item> {
    const it = this.itemRepository.create(item);
    return this.itemRepository.save(it);
  }
}
