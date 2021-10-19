import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    // console.log(ctx);
    ctx.user = await this.validateToken(ctx.headers.authorization);
    return true;
  }

  async validateToken(auth: string) {
    const bearer = auth.split(' ')[0];
    const token = auth.split(' ')[1];

    if (bearer !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    // try {
    const isValid = await jwt.verify(token, 'JWT_ACCESS_SECRET', (err) => {
      // ????
      if (err) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }
    });
    return isValid;

    // } catch (err) {
    //   throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    // }
  }
}
