import { Injectable } from '@nestjs/common';
import { CreateWarehouseInput } from './dto/create-warehouse.input';
import { UpdateWarehouseInput } from './dto/update-warehouse.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { Repository } from 'typeorm';

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
  }

  async findOne(id: string): Promise<Warehouse> {
    return this.warehouseRepository.findOne(id);
  }

  update(id: string, warehouse: UpdateWarehouseInput) {
    return `This action updates a #${id} warehouse`;
  }

  remove(id: string) {
    return `This action removes a #${id} warehouse`;
    // return this.warehouseRepository.remove(id);
  }
}
