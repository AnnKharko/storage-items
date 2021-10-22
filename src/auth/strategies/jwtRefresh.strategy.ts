import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../../user/entities/user.entity';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-strategy',
) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
    });
  }

  async validate(req, user: Partial<User>): Promise<any> {
    const token = req.headers.authorization.slice(7);

    const findUser: User = await this.userService.findOne(user.id);
    const tokenExists = await this.authService.tokensExist(
      token,
      'refresh_token',
    );
    if (tokenExists) {
      return findUser;
    } else {
      throw new UnauthorizedException();
    }
  }
}
