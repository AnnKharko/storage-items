import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemWarehouse } from './entities/itemWarehouse.entity';
import { Repository } from 'typeorm';
import { CreateItemWarehouseDTO } from './dto/create-item-werehouse';

@Injectable()
export class ItemWarehouseService {
  constructor(
    @InjectRepository(ItemWarehouse)
    private itemWareHouseRepository: Repository<ItemWarehouse>, // private itemService: ItemService, // private warehouseService: WarehouseService,
  ) {}
  // todo metod getAll
  async getItemWarehouse(id: string): Promise<ItemWarehouse> {
    return this.itemWareHouseRepository.findOne({
      where: { id },
      relations: ['item', 'warehouse'],
    });
  }

  async createItemWarehouse(itemWarehouse: CreateItemWarehouseDTO) {
    const itemwh = this.itemWareHouseRepository.create(itemWarehouse);
    return this.itemWareHouseRepository.save(itemwh);
  }
}
