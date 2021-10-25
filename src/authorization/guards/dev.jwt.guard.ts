import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TokensService } from '../tokens.service';

@Injectable()
export class DevJwtGuard implements CanActivate {
  constructor(private readonly tokensService: TokensService) {}

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = this.getRequest(context);
    const authHeader = req.headers.authorization as string;

    if (!authHeader) {
      throw new BadRequestException('Authorization header not found.');
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer') {
      throw new BadRequestException(
        `Authentication type \'Bearer\' required. Found \'${type}\'`,
      );
    }
    const { isValid, dev } = await this.tokensService.validateToken(token);
    if (isValid) {
      req.dev = dev;
      return true;
    }
    throw new UnauthorizedException('Token not valid');
  }
}
