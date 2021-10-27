import { CreateUserDto } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name?: string;

  @Field(() => String)
  gender?: string;

  @Field(() => String)
  email?: string;

  @Field(() => String)
  password?: string;

  @Field(() => String)
  role?: string;

  @Field(() => String)
  status?: string;
}
