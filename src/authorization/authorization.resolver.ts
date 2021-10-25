import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Dev } from '../dev/entities/dev.entity';
import { CreateDevDto } from '../dev/dto';
import { DevService } from '../dev/dev.service';
import { TokensService } from './tokens.service';
import { AuthorizationPayload } from './entities/authorization-payload.entity';
import { LoginDevDto } from './dto/loginDev.dto';
import { passwordHasher } from '../../helper/passwordHasher';
import { GraphQLError } from 'graphql';

// export interface AuthorizationPayload {
//   dev: Dev;
//   type: string;
//   access_token: string;
//   refresh_token?: string;

// }

@Resolver(() => AuthorizationPayload)
export class AuthorizationResolver {
  constructor(
    private readonly devService: DevService,
    private readonly tokensService: TokensService,
  ) {}

  private buildPayload(
    dev: Dev,
    access_token: string,
    refresh_token?: string,
  ): AuthorizationPayload {
    return {
      dev: dev,
      type: 'bearer',
      access_token,
      ...(refresh_token ? { refresh_token } : {}),
    };
  }

  @Mutation(() => AuthorizationPayload, { name: 'registrationDev' })
  async registration(@Args('createDev') createDev: CreateDevDto) {
    try {
      const dev = await this.devService.create(createDev);

      const access_token = await this.tokensService.generateAccessToken(dev);

      const refresh_token = await this.tokensService.generateRefreshToken(
        dev,
        60 * 60 * 24 * 30,
      );

      const payload = this.buildPayload(dev, access_token, refresh_token);

      return payload;
    } catch (err) {
      console.log(err.message);
    }
  }

  @Mutation(() => AuthorizationPayload, { name: 'loginDev' })
  async loginDev(@Args('loginDto') loginDto: LoginDevDto) {
    const dev = await this.devService.findByEmail(loginDto.email);
    if (!dev) {
      throw new GraphQLError('WRONG EMAIL OR PASSWORD');
    }
    await passwordHasher.compare(loginDto.password, dev.password);
    const access_token = await this.tokensService.generateAccessToken(dev);
    const refresh_token = await this.tokensService.generateRefreshToken(
      dev,
      60 * 60 * 24 * 30,
    );

    const payload = this.buildPayload(dev, access_token, refresh_token);

    return payload;
  }

  @Mutation(() => AuthorizationPayload, { name: 'refreshDevToken' })
  async refreshDev(@Args('refresh_token') refresh_token: string) {
    const { dev, access_token } =
      await this.tokensService.createAccessTokenFromRefreshToken(refresh_token);
    const payload = this.buildPayload(dev, access_token);
    return payload;
  }
}
