import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.input';
import { UseGuards } from '@nestjs/common';
// import { JwtRefreshStrategy } from './strategies/jwtRefresh.strategy';
import { RefreshGuard } from './guards/refresh.guard';
import { SendDto } from '../send.dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from '../user/entities/user.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth, { name: 'login' })
  login(@Args('loginDto') loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Mutation(() => SendDto, { name: 'registration' })
  registration(@Args('userDto') userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @Mutation(() => Auth, { name: 'refreshTokens' })
  @UseGuards(RefreshGuard)
  refreshTokens(@Context() ctx) {
    return this.authService.refreshTokens(ctx.tokenId, ctx.user);
  }

  @Mutation(() => SendDto, { name: 'logout' })
  @UseGuards(AuthGuard)
  logout(@Context() ctx): Promise<SendDto> {
    return this.authService.logout(ctx.tokenId);
  }
  @Mutation(() => User, { name: 'confirmUser' })
  confirmUser(@Args('token') token: string) {
    return this.authService.confirmUser(token);
  }
}
