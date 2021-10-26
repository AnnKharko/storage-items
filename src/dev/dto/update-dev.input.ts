import { CreateDevDto } from './create-dev.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDevDto extends PartialType(CreateDevDto) {
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
}
