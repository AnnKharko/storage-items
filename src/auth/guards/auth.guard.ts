import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.req.headers.authorization) {
      throw new HttpException('Token is required', HttpStatus.UNAUTHORIZED);
    }
    const { currentUser, tokenId } = await this.validateToken(
      ctx.req.headers.authorization,
    );
    ctx.user = currentUser;
    ctx.tokenId = tokenId;
    return true;
  }

  async validateToken(auth: string) {
    const bearer = auth.split(' ')[0];
    const token = auth.split(' ')[1];

    if (bearer !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    await jwt.verify(
      token,
      this.configService.get('JWT_ACCESS_SECRET'),
      (err) => {
        if (err) {
          throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
      },
    );
    const tokens = await this.authService.tokensExist(token, 'access_token');

    const currentUser = await this.userService.findOne(tokens.userId);
    return {
      currentUser,
      tokenId: tokens.id,
    };
  }
}
