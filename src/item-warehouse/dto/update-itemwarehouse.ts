import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateItemWarehouseDTO {
  @Field()
  id: string;

  @Field({ nullable: true })
  warehouseId?: string;

  @Field({ nullable: true })
  itemId?: string;

  @Field({ nullable: true })
  count?: number;
}
