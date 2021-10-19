import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './guards/local.strategy';
import { JwtModule } from '@nestjs/jwt';

// @Module({
//   imports: [TypeOrmModule.forFeature([Auth]), UserModule],
//   providers: [AuthService, AuthResolver],
// })

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule,
  ],
  providers: [AuthService, AuthResolver, LocalStrategy],
})
export class AuthModule {}
