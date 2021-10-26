import { LoginDevDto } from './loginDev.dto';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthorizationInput extends PartialType(LoginDevDto) {
  @Field(() => Int)
  id: number;
}
