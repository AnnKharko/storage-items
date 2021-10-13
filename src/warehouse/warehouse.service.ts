import { Injectable } from '@nestjs/common';
import { CreateWarehouseInput } from './dto/create-warehouse.input';
import { UpdateWarehouseInput } from './dto/update-warehouse.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { Repository } from 'typeorm';
import { SendDto } from '../send.dto';
import { GraphQLError } from 'graphql';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private warehouseRepository: Repository<Warehouse>,
  ) {}

  async create(warehouse: CreateWarehouseInput): Promise<Warehouse> {
    const wh = this.warehouseRepository.create(warehouse);
    return this.warehouseRepository.save(wh);
  }

  async findAll(): Promise<Warehouse[]> {
    return this.warehouseRepository.find();
    // .createQueryBuilder()
    // .leftJoinAndSelect('warehouse.wh_item', 'warehouse_items')
    // .getMany();
  }

  async findOne(id: string): Promise<Warehouse> {
    return this.warehouseRepository.findOne(id);
    // return this.warehouseRepository.find({
    //   where: { id },
    //   relations: ['item_warehouses'],
    // });
  }

  async update(updateWarehouse: UpdateWarehouseInput) {
    const warehouse = await this.warehouseRepository.findOne({
      id: updateWarehouse.id,
    });

    if (!warehouse) {
      throw new GraphQLError('Warehouse with such id not exist');
    }
    return await this.warehouseRepository.save(updateWarehouse);
  }

  async remove(id: string): Promise<SendDto> {
    await this.warehouseRepository.delete(id);
    return {
      message: `warehouse ${id} was deleted`,
      status: 200,
    };
  }
}
