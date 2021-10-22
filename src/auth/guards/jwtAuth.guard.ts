import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    // return ctx.getContext().req;
    // if (ctx.req.authorization) {
    //   return { ctx.req. }
    // }
    // console.log(ctx.req.headers);
    return ctx;
  }
}
