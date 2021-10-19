import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { LoginDto } from '../dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(login: LoginDto): Promise<any> {
    const user = await this.authService.validateUser(login);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
