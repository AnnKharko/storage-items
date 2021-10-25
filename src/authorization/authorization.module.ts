import { Module } from '@nestjs/common';
import { AuthorizationResolver } from './authorization.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { DevModule } from '../dev/dev.module';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './tokens.service';
import { DevJwtGuard } from './guards/dev.jwt.guard';
import { JwtStrategy } from './strategy/dev.jwt.strategy';
// import { jwtConfig } from '../../configs/jwt.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
    JwtModule.register({
      secret: 'JWT_ACCESS_SECRET',
      signOptions: {
        expiresIn: '5m',
      },
    }),
    DevModule,
  ],
  providers: [AuthorizationResolver, TokensService, JwtStrategy, DevJwtGuard],
  exports: [TokensService],
})
export class AuthorizationModule {}
