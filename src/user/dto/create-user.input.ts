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

  @Field(() => String, { defaultValue: 'pending' })
  status: string;

  // @Field(() => String, { defaultValue: null })
  // confirm_token?: string;
}
