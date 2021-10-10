import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateWarehouseInput {
  @Field()
  id: string;
  @Field()
  name: string;
}
