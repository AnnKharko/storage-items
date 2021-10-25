import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Dev } from '../dev/entities/dev.entity';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';
import { RefreshToken } from './entities/refresh-token.entity';
import { DevService } from '../dev/dev.service';
import { Repository } from 'typeorm';

export interface RefreshTokenPayload {
  jti: string;
  sub: string;
}

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokensRepository: Repository<RefreshToken>,
    private readonly jwt: JwtService,
    private readonly devService: DevService,
  ) {}

  public async generateAccessToken(dev: Dev): Promise<string> {
    const opts: SignOptions = {
      subject: dev.id,
    };
    return await this.jwt.signAsync({}, opts);
  }

  public async generateRefreshToken(
    dev: Dev,
    expiresIn: number,
  ): Promise<string> {
    const expiration = new Date();
    expiration.setTime(expiration.getTime() + expiresIn);
    const token = await this.refreshTokensRepository.create({
      devId: dev.id,
      expires: expiration,
      is_revoked: false,
    });
    await this.refreshTokensRepository.save(token);

    const opts: SignOptions = {
      expiresIn,
      subject: dev.id,
      jwtid: String(token.id),
    };

    return await this.jwt.signAsync({}, opts);
  }

  private async decodeRefreshToken(
    token: string,
  ): Promise<RefreshTokenPayload> {
    try {
      return this.jwt.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Refresh token expired');
      } else {
        throw new UnprocessableEntityException('Refresh token malformed');
      }
    }
  }

  private async getDevFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<Dev> {
    const subId = payload.sub;

    if (!subId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return this.devService.findOne(subId);
  }

  private async getStoredTokenFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<RefreshToken | null> {
    const tokenId = payload.jti;

    if (!tokenId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return this.refreshTokensRepository.findOne(tokenId);
  }
  public async resolveRefreshToken(
    encoded: string,
  ): Promise<{ dev: Dev; token: RefreshToken }> {
    const payload = await this.decodeRefreshToken(encoded);
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload);

    if (!token) {
      throw new UnprocessableEntityException('Refresh token not found');
    }

    if (token.is_revoked) {
      throw new UnprocessableEntityException('Refresh token revoked');
    }

    const dev = await this.getDevFromRefreshTokenPayload(payload);

    if (!dev) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return { dev, token };
  }

  public async createAccessTokenFromRefreshToken(
    refresh_token: string,
  ): Promise<{ access_token: string; dev: Dev }> {
    const { dev } = await this.resolveRefreshToken(refresh_token);
    const access_token = await this.generateAccessToken(dev);
    // const refresh_token = await this.generateRefreshToken(dev, ttl )
    return { dev, access_token };
  }

  public async validateToken(
    token: string,
  ): Promise<{ isValid: boolean; dev?: Dev }> {
    try {
      const { devId } = this.jwt.verify(token);
      const dev = await this.devService.findOne(devId);
      return { dev, isValid: true };
    } catch (e) {
      return { isValid: false };
    }
  }
}
