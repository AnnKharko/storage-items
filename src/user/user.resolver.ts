import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'findAllUsers' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'findUser' })
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }
  @Query(() => User, { name: 'findUserByEmail' })
  findOneByEmail(@Args('email') email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Mutation(() => User, { name: 'createUser' })
  create(@Args('user') user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
