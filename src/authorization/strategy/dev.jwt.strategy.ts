import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DevService } from '../../dev/dev.service';
import { ConfigService } from '@nestjs/config';
import { Dev } from '../../dev/entities/dev.entity';
// import { LockNotSupportedOnGivenDriverError } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(
    private devService: DevService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'JWT_ACCESS_SECRET',
    });
    this.devService = devService;
  }

  async validate(sub: string): Promise<Dev> {
    console.log(1);
    const dev = await this.devService.findOne(sub);
    if (!dev) {
      return null;
    }
    return dev;
  }
}
