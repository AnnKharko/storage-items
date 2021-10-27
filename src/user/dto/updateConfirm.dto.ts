import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateConfirmDto {
  @Field(() => String)
  id: string;

  @Field(() => String)
  status: string;

  @Field(() => String)
  confirm_token: string;
}
