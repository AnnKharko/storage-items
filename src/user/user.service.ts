import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.input';
// import { UpdateUserDto } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { passwordHasher } from '../../helper/passwordHasher';
import { UpdateUserDto } from './dto/update-user.input';
import { SendDto } from '../send.dto';
import { getConnection } from 'typeorm';
import { UpdateConfirmDto } from './dto/updateConfirm.dto';

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

  async findUserForConfirm(confirm_token: string): Promise<User> {
    // return await this.userRepository.findOne({ confirm_token });
    return await this.userRepository.findOne({ confirm_token });
  }

  async create(createUser: CreateUserDto, token: string) {
    const hashPassword = await passwordHasher.hash(createUser.password);
    const user = await this.userRepository.create(createUser);
    user.password = hashPassword;
    user.confirm_token = token;
    return await this.userRepository.save(user);
  }

  async update(updateUser: UpdateUserDto): Promise<UpdateResult> {
    // return await this.userRepository.update(updateUser.id, { ...updateUser });
    return await getConnection()
      .createQueryBuilder()
      .update(User)
      .set(updateUser)
      .where('id = :id', { id: updateUser.id })
      .execute();
  }
  async updateConfirm(updateConfirmDto: UpdateConfirmDto) {
    return await getConnection()
      .createQueryBuilder()
      .update(User)
      .set(updateConfirmDto)
      .where('id = :id', { id: updateConfirmDto.id })
      .execute();
  }

  async remove(id: number): Promise<SendDto> {
    await this.userRepository.delete(id);
    return {
      message: `User with id ${id} was deleted`,
    };
  }
}
