import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field(() => String)
  name: string;

  @Field(() => String)
  gender: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  role: string;
}
