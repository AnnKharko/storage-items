import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { UserService } from '../user/user.service';
import { passwordHasher } from '../../helper/passwordHasher';
import { ConfigService } from '@nestjs/config';
// import { ConfigService } from '@nestjs/config';
// import { tokenizer } from '../../helper/tokenizer';

// const tokenizer = () => {
//   const access_token = jwt.sign({}, 'JWT_SECRET_ACCESS', { expiresIn: '10m' });
//   const refresh_token = jwt.sign({}, 'JWT_REFRESH_SECRET', {
//     expiresIn: '30d',
//   });
//   return {
//     access_token,
//     refresh_token,
//   };
// };

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private configService: ConfigService,
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
  ) {}

  tokenizer() {
    // const jwtSecret = this.configService.get('JWT_ACCESS_SECRET');

    const access_token = jwt.sign(
      {},
      this.configService.get('JWT_ACCESS_SECRET'),
      {
        expiresIn: '10m',
      },
    );
    const refresh_token = jwt.sign(
      {},
      this.configService.get('JWT_ACCESS_SECRET'),
      {
        expiresIn: '30d',
      },
    );
    return {
      access_token,
      refresh_token,
    };
  }

  async createTokens(login: LoginDto) {
    const user = await this.usersService.findUserByEmail(login.email);
    if (!user) {
      throw new GraphQLError('Wrong email or password');
    }

    await passwordHasher.compare(login.password, user.password);

    const { access_token, refresh_token } = this.tokenizer();
    const auth = await this.authRepository.create({
      access_token,
      refresh_token,
      userId: user.id,
    });
    return await this.authRepository.save(auth);
  }

  async refreshTokens(refresh_token: string) {
    // const jwtSecret = this.configService.get('jwtSecret');

    if (!refresh_token) {
      throw new GraphQLError('Refresh token is required');
    }

    await jwt.verify(
      refresh_token,
      // this.configService.get('JWT_REFRESH_SECRET'),
      // jwtSecret.JWT_REFRESH_SECRET,
      this.configService.get('JWT_REFRESH_SECRET'),
      (err) => {
        if (err) {
          throw new GraphQLError('NOT VALID REFRESH TOKEN');
        }
      },
    );

    const oldTokens = await this.authRepository.findOne({
      where: { refresh_token },
    });
    if (!oldTokens) {
      throw new GraphQLError('Wrong token');
    }

    const tokens = this.tokenizer();
    return await this.authRepository.save({
      userId: oldTokens.userId,
      ...tokens,
    });
  }

  async getTokens(refresh_token: string) {
    return await this.authRepository.findOne({ refresh_token });
  }
}
