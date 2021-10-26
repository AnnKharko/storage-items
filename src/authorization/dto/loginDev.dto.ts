import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class LoginDevDto {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
