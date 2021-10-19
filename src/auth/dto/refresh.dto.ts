import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RefreshDto {
  @Field()
  refresh_token: string;
}
