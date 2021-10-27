import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemWarehouse } from './entities/itemWarehouse.entity';
import { Repository } from 'typeorm';
import { CreateItemWarehouseDTO } from './dto/create-item-werehouse';
// import { GraphQLError } from 'graphql';
import { UpdateItemWarehouseDTO } from './dto/update-itemwarehouse';
import { SendDto } from '../send.dto';

@Injectable()
export class ItemWarehouseService {
  constructor(
    @InjectRepository(ItemWarehouse)
    private itemWareHouseRepository: Repository<ItemWarehouse>,
  ) {}

  async getAllItemWarehouses() {
    return await this.itemWareHouseRepository.find({
      relations: ['item', 'warehouse'],
    });
  }

  async getItemWarehouse(id: string): Promise<ItemWarehouse> {
    return this.itemWareHouseRepository.findOne({
      where: { id },
      relations: ['item', 'warehouse'],
    });
  }

  async getWarehouseWithAllItems(id: string) {
    return this.itemWareHouseRepository.find({
      where: { warehouseId: id },
      relations: ['item', 'warehouse'],
    });
  }

  async createItemWarehouse(itemWarehouse: CreateItemWarehouseDTO) {
    // const itemwh = this.itemWareHouseRepository.create(itemWarehouse);
    return this.itemWareHouseRepository.save(itemWarehouse);
  }

  async updateItemWarehouse(updateItemWarehouse: UpdateItemWarehouseDTO) {
    // const itemWarehouse = await this.itemWareHouseRepository.findOne({
    //   id: updateItemWarehouse.id,
    // });
    // if (!itemWarehouse) {
    //   throw new GraphQLError('itemWarehouse not exist');
    // }
    await this.itemWareHouseRepository.update(updateItemWarehouse.id, {
      ...updateItemWarehouse,
    });

    return await this.itemWareHouseRepository.findOne(updateItemWarehouse.id);
  }

  async deleteItemWarehouse(id: string): Promise<SendDto> {
    await this.itemWareHouseRepository.delete(id);
    return {
      message: `ItemWarehouse with id ${id} was deleted`,
      status: 200,
    };
  }
}
