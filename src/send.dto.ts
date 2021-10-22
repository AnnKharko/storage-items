import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SendDto {
  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => Int, { nullable: true })
  status?: number;
}
