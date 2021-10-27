import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from './token/token.module';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from './guards/auth.guard';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    UserModule,
    TokenModule,
    JwtModule.register({}),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MailModule,
  ],
  providers: [AuthResolver, AuthService, AuthGuard, JwtAuthGuard],
  exports: [AuthService, AuthGuard, JwtAuthGuard],
})
export class AuthModule {}
