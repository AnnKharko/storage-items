import { Injectable } from '@nestjs/common';
import { CreateDevDto } from './dto/create-dev.input';
import { UpdateDevDto } from './dto/update-dev.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Dev } from './entities/dev.entity';
import { Repository } from 'typeorm';
import { passwordHasher } from '../../helper/passwordHasher';
// import { DevsRepository } from './repository';

@Injectable()
export class DevService {
  constructor(
    @InjectRepository(Dev) private devRepository: Repository<Dev>, // @InjectRepository(DevsRepository) private devsRepository: DevsRepository,
  ) {}
  async create(devDto: CreateDevDto) {
    const hashPassword = await passwordHasher.hash(devDto.password);
    const dev = await this.devRepository.create(devDto);
    dev.password = hashPassword;
    return await this.devRepository.save(dev);
  }

  async findAll(): Promise<Dev[]> {
    return await this.devRepository.find();
  }

  async findOne(id: string): Promise<Dev> {
    return await this.devRepository.findOne(id);
  }
  // async findOne(id: number): Promise<Dev> {
  //   return await this.devsRepository.findById(id);
  // }

  // async findByEmail(email: string): Promise<Dev> {
  //   return this.devsRepository.findByEmail(email);
  // }
  async findByEmail(email: string): Promise<Dev> {
    return this.devRepository.findOne({ where: { email } });
  }

  async update(updateDev: UpdateDevDto) {
    return await this.devRepository.update(updateDev.id, { ...updateDev });
  }

  async remove(id: string) {
    await this.devRepository.delete(id);
    return `Dev with id ${id} was deleted`;
  }
}
