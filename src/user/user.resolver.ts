import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

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

  @Query(() => User, { name: 'me' })
  @UseGuards(new AuthGuard())
  me(@Context('user') user: User) {
    return user;
  }
}
