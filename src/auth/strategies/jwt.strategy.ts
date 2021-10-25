import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
  }
  async validate(req): Promise<any> {
    const bearer = req.headers.authorization.split(' ')[0];
    const token = req.headers.authorization.split(' ')[1];

    if (bearer !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    // await jwt.verify(
    //   token,
    //   this.configService.get('JWT_ACCESS_SECRET'),
    //   (err) => {
    //     if (err) {
    //       throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    //     }
    //   },
    // );

    const tokens = await this.authService.tokensExist(token, 'access_token');

    if (tokens) {
      return await this.userService.findOne(tokens.userId);
    } else {
      throw new UnauthorizedException();
    }
  }
}
