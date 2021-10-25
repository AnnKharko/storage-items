import { EntityRepository, Repository } from 'typeorm';
import { Dev } from '../entities/dev.entity';
// import { CreateDevDto } from "../../dev/dto";

@EntityRepository(Dev)
export class DevsRepository extends Repository<Dev> {
  public async findById(id: number): Promise<Dev | null> {
    return this.findOne(id);
  }

  public async findByEmail(email: string): Promise<Dev | null> {
    return this.findOne({ where: { email } });
  }

  // public async create (devDto: CreateDevDto): Promise<Dev> {
  //
  // }
}
