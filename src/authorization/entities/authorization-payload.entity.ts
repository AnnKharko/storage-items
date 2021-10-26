import { Dev } from '../../dev/entities/dev.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthorizationPayload {
  @Field()
  dev: Dev;

  // @Field()
  // payload: {
  //   type: string;
  //   access_token: string;
  //   refresh_token?: string;
  // };
  @Field()
  type: string;
  @Field()
  access_token: string;
  @Field()
  refresh_token?: string;
}
