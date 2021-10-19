import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  // @Mutation(() => Auth, { name: 'userLogin' })
  // loginUser(@Args('login') login: LoginDto) {
  //   return this.authService.createTokens(login);
  // }
  //
  // @Mutation(() => Auth, { name: 'refreshTokens' })
  // refreshTokens(@Args('refresh_token') refresh_token: string) {
  //   return this.authService.refreshTokens(refresh_token);
  // }
}
