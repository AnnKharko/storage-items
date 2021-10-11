import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateItemWarehouseDTO {
  @Field()
  warehouseId: string;

  @Field()
  itemId: string;

  @Field()
  count: number;
}
