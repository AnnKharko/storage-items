import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateItemInputDTO {
  @Field()
  id: string;
  @Field()
  title: string;
}
