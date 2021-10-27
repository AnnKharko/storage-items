import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  createTokens() {
    const access_token = this.jwtService.sign(
      {},
      {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_LIFETIME'),
      },
    );

    const refresh_token = this.jwtService.sign(
      {},
      {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_LIFETIME'),
      },
    );
    return {
      access_token,
      refresh_token,
    };
  }
  createConfirmToken() {
    return this.jwtService.sign(
      {},
      {
        secret: this.configService.get('JWT_CONFIRM_SECRET'),
        expiresIn: this.configService.get('JWT_CONFIRM_LIFETIME'),
      },
    );
  }
}
