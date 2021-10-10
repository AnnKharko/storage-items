import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateItemDTO {
  @Field()
  title: string;
}
