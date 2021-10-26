import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateDevDto {
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
