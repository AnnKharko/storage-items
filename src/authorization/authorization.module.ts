import { Module } from '@nestjs/common';
import { AuthorizationResolver } from './authorization.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { DevModule } from '../dev/dev.module';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './tokens.service';
import { DevJwtGuard } from './guards/dev.jwt.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
    JwtModule.register({
      secret: 'JWT_ACCESS_SECRET',
      signOptions: {
        expiresIn: '5m',
      },
    }),
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     secret: configService.get('JWT_ACCESS_SECRET'),
    //     signOptions: {
    //       expiresIn: configService.get('JWT_ACCESS_LIFETIME'),
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
    DevModule,
  ],
  providers: [AuthorizationResolver, TokensService, DevJwtGuard],
  exports: [TokensService],
})
export class AuthorizationModule {}
