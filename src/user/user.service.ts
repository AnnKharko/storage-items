import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.input';
import { UpdateUserDto } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { passwordHasher } from '../../helper/passwordHasher';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async create(createUser: CreateUserDto) {
    const hashPassword = await passwordHasher.hash(createUser.password);
    const user = this.userRepository.create(createUser);
    user.password = hashPassword;
    return this.userRepository.save(user);
  }

  async update(id: number, updateUser: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return;
  }
}
