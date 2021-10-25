import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.input';
// import { UpdateUserDto } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { passwordHasher } from '../../helper/passwordHasher';
import { UpdateUserDto } from './dto/update-user.input';
import { SendDto } from '../send.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }

  async create(createUser: CreateUserDto) {
    const hashPassword = await passwordHasher.hash(createUser.password);
    const user = await this.userRepository.create(createUser);
    user.password = hashPassword;
    return await this.userRepository.save(user);
  }

  async update(updateUser: UpdateUserDto) {
    return await this.userRepository.update(updateUser.id, { ...updateUser });
  }

  async remove(id: number): Promise<SendDto> {
    await this.userRepository.delete(id);
    return {
      message: `User with id ${id} was deleted`,
    };
  }
}
