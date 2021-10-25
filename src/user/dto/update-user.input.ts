import { CreateUserDto } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Field()
  id: string;

  @Field()
  name?: string;

  @Field()
  gender?: string;

  @Field()
  email?: string;

  @Field()
  password?: string;

  @Field()
  role?: string;
}
